// Data migration utilities for handling localStorage data structure changes

const CURRENT_VERSION = 1;
const VERSION_KEY = 'tria-data-version';

// Check if data migration is needed
export const needsMigration = () => {
  try {
    const storedVersion = localStorage.getItem(VERSION_KEY);
    const version = storedVersion ? parseInt(storedVersion, 10) : 0;
    return version < CURRENT_VERSION;
  } catch (error) {
    console.error('Error checking data version:', error);
    return false;
  }
};

// Migrate data to current version
export const migrateData = () => {
  try {
    const storedVersion = localStorage.getItem(VERSION_KEY);
    const version = storedVersion ? parseInt(storedVersion, 10) : 0;
    
    if (version < 1) {
      // Migration from version 0 to 1
      // In this case, we don't need to do anything as this is the initial version
      // Data migration to version 1 completed
    }
    
    // Update version
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION.toString());
    // Data migrated to current version
    
    return true;
  } catch (error) {
    console.error('Error during data migration:', error);
    return false;
  }
};

// Validate contact data structure
export const validateContact = (contact) => {
  return (
    contact &&
    typeof contact === 'object' &&
    typeof contact.id !== 'undefined' &&
    typeof contact.name === 'string' &&
    typeof contact.email === 'string' &&
    typeof contact.phone === 'string' &&
    contact.name.trim().length > 0 &&
    contact.email.trim().length > 0 &&
    contact.phone.trim().length > 0
  );
};

// Clean and validate contacts array
export const validateContacts = (contacts) => {
  if (!Array.isArray(contacts)) {
    return [];
  }
  
  return contacts.filter(validateContact);
};