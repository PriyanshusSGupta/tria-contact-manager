// Utilities for backing up and restoring contacts

// Export contacts to JSON file
export const exportContacts = (contacts) => {
  try {
    const dataStr = JSON.stringify(contacts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tria-contacts-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Error exporting contacts:', error);
    return false;
  }
};

// Import contacts from JSON file
export const importContacts = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }
    
    if (file.type !== 'application/json') {
      reject(new Error('Invalid file type. Please select a JSON file.'));
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const contacts = JSON.parse(e.target.result);
        
        if (!Array.isArray(contacts)) {
          reject(new Error('Invalid file format. Expected an array of contacts.'));
          return;
        }
        
        // Validate each contact
        const validContacts = contacts.filter(contact => 
          contact &&
          typeof contact.name === 'string' &&
          typeof contact.email === 'string' &&
          typeof contact.phone === 'string' &&
          contact.name.trim() &&
          contact.email.trim() &&
          contact.phone.trim()
        );
        
        if (validContacts.length === 0) {
          reject(new Error('No valid contacts found in the file.'));
          return;
        }
        
        // Ensure each contact has an ID
        const contactsWithIds = validContacts.map(contact => ({
          ...contact,
          id: contact.id || Date.now() + Math.random()
        }));
        
        resolve(contactsWithIds);
      } catch {
        reject(new Error('Failed to parse JSON file. Please check the file format.'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read the file.'));
    };
    
    reader.readAsText(file);
  });
};

// Get backup statistics
export const getBackupStats = (contacts) => {
  return {
    totalContacts: contacts.length,
    backupDate: new Date().toISOString(),
    version: '1.0'
  };
};