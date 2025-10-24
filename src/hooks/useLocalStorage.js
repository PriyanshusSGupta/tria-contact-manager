import { useState } from 'react';

// Custom hook for localStorage management
export function useLocalStorage(key, initialValue) {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// Hook specifically for contacts with additional features
export function useContactsStorage() {
  const [contacts, setContacts] = useLocalStorage('tria-contacts', []);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check if localStorage is available
  const isStorageAvailable = () => {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  };

  // Add a contact
  const addContact = (newContact) => {
    setContacts(prev => [...prev, newContact]);
  };

  // Remove a contact
  const removeContact = (contactId) => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  // Update a contact
  const updateContact = (contactId, updatedContact) => {
    setContacts(prev => 
      prev.map(contact => 
        contact.id === contactId ? { ...contact, ...updatedContact } : contact
      )
    );
  };

  // Clear all contacts
  const clearContacts = () => {
    setContacts([]);
  };

  return {
    contacts,
    setContacts,
    addContact,
    removeContact,
    updateContact,
    clearContacts,
    isStorageAvailable: isStorageAvailable(),
    isLoaded,
    setIsLoaded
  };
}