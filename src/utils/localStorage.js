// localStorage utility functions for contact management

const CONTACTS_KEY = 'tria-contacts';

export const loadContactsFromStorage = () => {
  try {
    const storedContacts = localStorage.getItem(CONTACTS_KEY);
    if (storedContacts) {
      return JSON.parse(storedContacts);
    }
    return null;
  } catch (error) {
    console.error('Error loading contacts from localStorage:', error);
    return null;
  }
};

export const saveContactsToStorage = (contacts) => {
  try {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    return true;
  } catch (error) {
    console.error('Error saving contacts to localStorage:', error);
    return false;
  }
};

export const clearContactsFromStorage = () => {
  try {
    localStorage.removeItem(CONTACTS_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing contacts from localStorage:', error);
    return false;
  }
};

// Check if localStorage is available
export const isLocalStorageAvailable = () => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};