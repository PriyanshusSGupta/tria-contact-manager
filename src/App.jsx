import { useState, useEffect, useMemo, useCallback } from 'react'
import './App.css'
import { mockContacts, defaultTags } from './data/mockContacts.js'
import MainLayout from './components/Layout/MainLayout.jsx'
import AddContactForm from './components/AddContactForm.jsx'
import EditContactForm from './components/EditContactForm.jsx'
import ConfirmDialog from './components/ConfirmDialog.jsx'
import TagManager from './components/TagManager.jsx'
import ImportExport from './components/ImportExport.jsx'
import ToastContainer from './components/ToastContainer.jsx'
import LoadingSkeleton from './components/LoadingSkeleton.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import BackgroundSelector from './components/BackgroundSelector.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { useToast } from './hooks/useToast.js'
import { needsMigration, migrateData, validateContacts } from './utils/dataMigration.js'
import { useBackground } from './hooks/useBackground.js'

function App() {
  const [contacts, setContacts] = useLocalStorage('tria-contacts', [])
  const [availableTags, setAvailableTags] = useLocalStorage('tria-tags', defaultTags)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const [deletingContact, setDeletingContact] = useState(null)
  const [showTagManager, setShowTagManager] = useState(false)
  const [showImportExport, setShowImportExport] = useState(false)
  const [showBackgroundSelector, setShowBackgroundSelector] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

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
          showSuccess('Welcome! Sample contacts have been loaded.')
        } else if (validatedContacts.length !== contacts.length) {
          // Some contacts were invalid - update with valid ones
          setContacts(validatedContacts)
          showError('Some invalid contacts were removed.')
        }
      } catch (error) {
        console.error('Error initializing app:', error)
        setContacts(mockContacts)
        showError('Error loading saved contacts. Using sample data.')
      }
      
      setIsLoading(false)
    }
    
    initializeApp()
  }, [contacts, setContacts, showSuccess, showError]) // Include dependencies

  const handleAddContact = useCallback((newContact) => {
    try {
      // Add unique ID if not present
      const contactWithId = {
        ...newContact,
        id: newContact.id || Date.now() + Math.random()
      }
      
      setContacts(prev => [...prev, contactWithId])
      setShowAddForm(false)
      showSuccess(`${newContact.name} has been added to your contacts!`)
    } catch (error) {
      console.error('Error adding contact:', error)
      showError('Failed to add contact. Please try again.')
    }
  }, [setContacts, showSuccess, showError])

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
      showSuccess(`${updatedContact.name} has been updated!`)
    } catch (error) {
      console.error('Error updating contact:', error)
      showError('Failed to update contact. Please try again.')
    }
  }, [setContacts, showSuccess, showError])

  const handleCancelEdit = useCallback(() => {
    setEditingContact(null)
  }, [])

  const handleDeleteContact = useCallback((contact) => {
    setDeletingContact(contact)
  }, [])

  const handleConfirmDelete = () => {
    try {
      setContacts(prev => prev.filter(contact => contact.id !== deletingContact.id))
      showSuccess(`${deletingContact.name} has been deleted.`)
      setDeletingContact(null)
    } catch (error) {
      console.error('Error deleting contact:', error)
      showError('Failed to delete contact. Please try again.')
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
        showError('No new contacts to import (all contacts already exist)');
        return;
      }

      setContacts(prev => [...prev, ...newContacts]);
      showSuccess(`Successfully imported ${newContacts.length} new contacts!`);
    } catch (error) {
      console.error('Import contacts error:', error);
      showError('Failed to import contacts');
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
        showSuccess(`Imported ${newTags.length} new tags`);
      }
    } catch (error) {
      console.error('Import tags error:', error);
    }
  };

  // Enhanced contacts with additional properties for the new layout
  const enhancedContacts = useMemo(() => {
    return contacts.map(contact => ({
      ...contact,
      isFavorite: contact.isFavorite || false,
      isBusinessContact: contact.isBusinessContact || false,
      company: contact.company || null,
      jobTitle: contact.jobTitle || null,
      address: contact.address || null,
      birthday: contact.birthday || null,
      createdAt: contact.createdAt || new Date().toISOString(),
      interactionCount: contact.interactionCount || 0
    }));
  }, [contacts]);



  return (
    <ErrorBoundary>
      <div className="app">
        {isLoading ? (
          <div className="app-loading">
            <LoadingSkeleton viewMode="grid" />
          </div>
        ) : (
          <ErrorBoundary>
            <MainLayout
              contacts={enhancedContacts}
              onAddContact={() => setShowAddForm(true)}
              onEditContact={handleEditContact}
              onDeleteContact={handleDeleteContact}
              availableTags={availableTags}
              onManageTags={handleManageTags}
              onImportExport={() => setShowImportExport(true)}
              onBackgroundSelector={() => setShowBackgroundSelector(true)}
            />
          </ErrorBoundary>
        )}
        
        {/* Global Modals */}
        {showAddForm && (
          <ErrorBoundary>
            <AddContactForm 
              onAddContact={handleAddContact}
              onCancel={handleCancelAdd}
              availableTags={availableTags}
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
      </div>
    </ErrorBoundary>
  )
}

export default App
