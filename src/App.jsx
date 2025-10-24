import { useState, useEffect, useMemo, useCallback } from 'react'
import './App.css'
import { mockContacts, defaultTags } from './data/mockContacts.js'
import SearchBar from './components/SearchBar.jsx'
import ContactList from './components/ContactList.jsx'
import FloatingActionButton from './components/FloatingActionButton.jsx'
import AddContactForm from './components/AddContactForm.jsx'
import EditContactForm from './components/EditContactForm.jsx'
import ConfirmDialog from './components/ConfirmDialog.jsx'
import TagFilter from './components/TagFilter.jsx'
import TagManager from './components/TagManager.jsx'
import ImportExport from './components/ImportExport.jsx'
import ToastContainer from './components/ToastContainer.jsx'
import LoadingSkeleton from './components/LoadingSkeleton.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import BackgroundSelector from './components/BackgroundSelector.jsx'
import SettingsDropdown from './components/SettingsDropdown.jsx'
import ViewToggle from './components/ViewToggle.jsx'

import AlphabetIndex from './components/AlphabetIndex.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { useToast } from './hooks/useToast.js'
import { needsMigration, migrateData, validateContacts } from './utils/dataMigration.js'
import { fuzzySearchContacts } from './utils/fuzzySearch.js'
import { useBackground } from './contexts/BackgroundContext.jsx'

function App() {
  const [contacts, setContacts] = useLocalStorage('tria-contacts', [])
  const [availableTags, setAvailableTags] = useLocalStorage('tria-tags', defaultTags)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTagFilters, setSelectedTagFilters] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const [deletingContact, setDeletingContact] = useState(null)
  const [showTagManager, setShowTagManager] = useState(false)
  const [showImportExport, setShowImportExport] = useState(false)
  const [showBackgroundSelector, setShowBackgroundSelector] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useLocalStorage('tria-view-mode', 'grid')
  const [sortOrder, setSortOrder] = useLocalStorage('tria-sort-order', 'asc')
  const [selectedLetter, setSelectedLetter] = useState(null)
  const [highlightedContactId, setHighlightedContactId] = useState(null)

  // Toast notifications
  const { toasts, success: showSuccess, error: showError, removeToast } = useToast()

  // Background context
  const { background, changeBackground } = useBackground()

  // Initialize contacts and handle data migration
  useEffect(() => {
    const initializeApp = async () => {
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800))
      
      try {
        // Check if data migration is needed
        if (needsMigration()) {
          migrateData()
        }
        
        // Validate existing contacts
        const validatedContacts = validateContacts(contacts)
        
        if (validatedContacts.length === 0) {
          // First time user or no valid contacts - load mock data
          setContacts(mockContacts)
          showNotification('Welcome! Sample contacts have been loaded.', 'success')
        } else if (validatedContacts.length !== contacts.length) {
          // Some contacts were invalid - update with valid ones
          setContacts(validatedContacts)
          showNotification('Some invalid contacts were removed.', 'error')
        }
      } catch (error) {
        console.error('Error initializing app:', error)
        setContacts(mockContacts)
        showNotification('Error loading saved contacts. Using sample data.', 'error')
      }
      
      setIsLoading(false)
    }
    
    initializeApp()
  }, [contacts, setContacts]) // Include dependencies

  const showNotification = useCallback((message, type = 'success') => {
    if (type === 'success') {
      showSuccess(message)
    } else if (type === 'error') {
      showError(message)
    }
  }, [showSuccess, showError])

  const handleAddContact = useCallback((newContact) => {
    try {
      // Add unique ID if not present
      const contactWithId = {
        ...newContact,
        id: newContact.id || Date.now() + Math.random()
      }
      
      setContacts(prev => [...prev, contactWithId])
      setShowAddForm(false)
      showNotification(`${newContact.name} has been added to your contacts!`)
    } catch (error) {
      console.error('Error adding contact:', error)
      showNotification('Failed to add contact. Please try again.', 'error')
    }
  }, [setContacts, showNotification])

  const handleCancelAdd = useCallback(() => {
    setShowAddForm(false)
  }, [])

  const handleEditContact = useCallback((contact) => {
    setEditingContact(contact)
  }, [])

  const handleSaveEdit = useCallback((updatedContact) => {
    try {
      setContacts(prev => 
        prev.map(contact => 
          contact.id === updatedContact.id ? updatedContact : contact
        )
      )
      setEditingContact(null)
      showNotification(`${updatedContact.name} has been updated!`)
    } catch (error) {
      console.error('Error updating contact:', error)
      showNotification('Failed to update contact. Please try again.', 'error')
    }
  }, [setContacts, showNotification])

  const handleCancelEdit = useCallback(() => {
    setEditingContact(null)
  }, [])

  const handleDeleteContact = useCallback((contact) => {
    setDeletingContact(contact)
  }, [])

  const handleConfirmDelete = () => {
    try {
      setContacts(prev => prev.filter(contact => contact.id !== deletingContact.id))
      showNotification(`${deletingContact.name} has been deleted.`)
      setDeletingContact(null)
    } catch (error) {
      console.error('Error deleting contact:', error)
      showNotification('Failed to delete contact. Please try again.', 'error')
    }
  }

  const handleCancelDelete = () => {
    setDeletingContact(null)
  }

  const handleTagsChange = (newTags) => {
    setAvailableTags(newTags)
  }

  const handleManageTags = () => {
    setShowTagManager(true)
  }

  const handleCloseTagManager = () => {
    setShowTagManager(false)
  }

  const handleImportContacts = async (importedContacts) => {
    try {
      // Merge with existing contacts, avoiding duplicates by email
      const existingEmails = new Set(contacts.map(c => c.email.toLowerCase()));
      const newContacts = importedContacts.filter(c => 
        !existingEmails.has(c.email.toLowerCase())
      );
      
      if (newContacts.length === 0) {
        showNotification('No new contacts to import (all contacts already exist)', 'error');
        return;
      }

      setContacts(prev => [...prev, ...newContacts]);
      showNotification(`Successfully imported ${newContacts.length} new contacts!`);
    } catch (error) {
      console.error('Import contacts error:', error);
      showNotification('Failed to import contacts', 'error');
    }
  };

  const handleImportTags = async (importedTags) => {
    try {
      // Merge with existing tags, avoiding duplicates by name
      const existingTagNames = new Set(availableTags.map(t => t.name.toLowerCase()));
      const newTags = importedTags.filter(t => 
        !existingTagNames.has(t.name.toLowerCase())
      );
      
      if (newTags.length > 0) {
        setAvailableTags(prev => [...prev, ...newTags]);
        showNotification(`Imported ${newTags.length} new tags`);
      }
    } catch (error) {
      console.error('Import tags error:', error);
    }
  };

  // Filter and sort contacts based on search term, selected tags, sort order, and alphabet filter
  const filteredContacts = useMemo(() => {
    let filtered = contacts;

    // Filter by selected tags first
    if (selectedTagFilters.length > 0) {
      filtered = filtered.filter(contact => {
        const contactTags = contact.tags || [];
        return selectedTagFilters.some(tagId => contactTags.includes(tagId));
      });
    }

    // Note: We don't filter by letter anymore - we scroll to it instead

    // Apply fuzzy search if there's a search term
    if (searchTerm && searchTerm.trim()) {
      filtered = fuzzySearchContacts(filtered, searchTerm.trim(), {
        threshold: 0.2,
        maxResults: 50
      });
    }

    // Sort contacts alphabetically by name
    filtered.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      
      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    return filtered;
  }, [contacts, searchTerm, selectedTagFilters, sortOrder, selectedLetter]);

  // Calculate tag counts for filtering
  const tagCounts = useMemo(() => {
    const counts = {};
    availableTags.forEach(tag => {
      counts[tag.id] = contacts.filter(contact => 
        (contact.tags || []).includes(tag.id)
      ).length;
    });
    return counts;
  }, [contacts, availableTags]);

  return (
    <ErrorBoundary>
      <div className="app">
        <header className="app-header">
          <h1>Tria Contacts</h1>
          <div className="header-actions">
            <SettingsDropdown 
              onImportExport={() => setShowImportExport(true)}
              onBackgroundSelector={() => setShowBackgroundSelector(true)}
            />
            <ThemeToggle />
          </div>
        </header>
        <main className="app-main">
          {isLoading ? (
            <LoadingSkeleton viewMode={viewMode} />
          ) : (
            <ErrorBoundary>
              <SearchBar 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm}
                contacts={contacts}
              />
              <div className="filters-and-view">
                <TagFilter
                  availableTags={availableTags}
                  selectedTags={selectedTagFilters}
                  onTagsChange={setSelectedTagFilters}
                  contactCounts={tagCounts}
                />
                <div className="view-controls">
                  <ViewToggle 
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                  />
                </div>
              </div>
              <ContactList 
                contacts={filteredContacts} 
                searchTerm={searchTerm}
                availableTags={availableTags}
                onEditContact={handleEditContact}
                onDeleteContact={handleDeleteContact}
                viewMode={viewMode}
                highlightedContactId={highlightedContactId}
                onAddContact={() => setShowAddForm(true)}
                onImportContacts={() => setShowImportExport(true)}
              />
            </ErrorBoundary>
          )}
        </main>
        
        <FloatingActionButton 
          onClick={() => setShowAddForm(!showAddForm)}
          isActive={showAddForm}
        />
        
        {showAddForm && (
          <ErrorBoundary>
            <AddContactForm 
              onAddContact={handleAddContact}
              onCancel={handleCancelAdd}
              availableTags={availableTags}
              onTagsChange={handleTagsChange}
              onManageTags={handleManageTags}
            />
          </ErrorBoundary>
        )}

        {editingContact && (
          <ErrorBoundary>
            <EditContactForm 
              contact={editingContact}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
              availableTags={availableTags}
              onManageTags={handleManageTags}
            />
          </ErrorBoundary>
        )}

        {showTagManager && (
          <ErrorBoundary>
            <TagManager
              availableTags={availableTags}
              onTagsChange={handleTagsChange}
              onClose={handleCloseTagManager}
            />
          </ErrorBoundary>
        )}

        {showImportExport && (
          <ErrorBoundary>
            <ImportExport
              contacts={contacts}
              availableTags={availableTags}
              onImportContacts={handleImportContacts}
              onImportTags={handleImportTags}
              onClose={() => setShowImportExport(false)}
            />
          </ErrorBoundary>
        )}

        {showBackgroundSelector && (
          <ErrorBoundary>
            <BackgroundSelector
              currentBackground={background}
              onBackgroundChange={changeBackground}
              onClose={() => setShowBackgroundSelector(false)}
            />
          </ErrorBoundary>
        )}

        <ConfirmDialog
          isOpen={!!deletingContact}
          title="Delete Contact"
          message={`Are you sure you want to delete ${deletingContact?.name}? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          type="danger"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
        
        <ToastContainer 
          toasts={toasts}
          onRemoveToast={removeToast}
        />

        <AlphabetIndex
          contacts={contacts}
          onLetterClick={setSelectedLetter}
          activeLetter={selectedLetter}
          onHighlightContact={setHighlightedContactId}
        />
      </div>
    </ErrorBoundary>
  )
}

export default App
