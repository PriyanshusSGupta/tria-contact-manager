// Import/Export utilities for contacts

// CSV parsing and generation utilities
export const csvUtils = {
  // Convert contacts array to CSV string
  contactsToCSV: (contacts) => {
    if (!contacts || contacts.length === 0) {
      return 'Name,Email,Phone,Tags\n';
    }

    const headers = ['Name', 'Email', 'Phone', 'Tags'];
    const csvRows = [headers.join(',')];

    contacts.forEach(contact => {
      const tags = (contact.tags || []).join(';');
      const row = [
        `"${(contact.name || '').replace(/"/g, '""')}"`,
        `"${(contact.email || '').replace(/"/g, '""')}"`,
        `"${(contact.phone || '').replace(/"/g, '""')}"`,
        `"${tags.replace(/"/g, '""')}"`
      ];
      csvRows.push(row.join(','));
    });

    return csvRows.join('\n');
  },

  // Parse CSV string to contacts array
  csvToContacts: (csvString) => {
    const lines = csvString.trim().split('\n');
    if (lines.length < 2) {
      throw new Error('CSV file must have at least a header row and one data row');
    }

    // const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const contacts = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = csvUtils.parseCSVLine(line);
      if (values.length < 3) continue;

      const contact = {
        id: Date.now() + Math.random() + i,
        name: values[0] || '',
        email: values[1] || '',
        phone: values[2] || '',
        tags: values[3] ? values[3].split(';').filter(tag => tag.trim()) : []
      };

      // Validate required fields
      if (contact.name.trim() && contact.email.trim()) {
        contacts.push(contact);
      }
    }

    return contacts;
  },

  // Parse a single CSV line handling quoted values
  parseCSVLine: (line) => {
    const values = [];
    let current = '';
    let inQuotes = false;
    let i = 0;

    while (i < line.length) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i += 2;
        } else {
          inQuotes = !inQuotes;
          i++;
        }
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
        i++;
      } else {
        current += char;
        i++;
      }
    }
    
    values.push(current.trim());
    return values;
  }
};

// JSON utilities
export const jsonUtils = {
  // Export contacts as JSON with metadata
  contactsToJSON: (contacts, availableTags = []) => {
    const exportData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      contactCount: contacts.length,
      availableTags,
      contacts
    };
    
    return JSON.stringify(exportData, null, 2);
  },

  // Import contacts from JSON
  jsonToContacts: (jsonString) => {
    const data = JSON.parse(jsonString);
    
    // Handle different JSON formats
    let contacts = [];
    let tags = [];
    
    if (Array.isArray(data)) {
      // Simple array format
      contacts = data;
    } else if (data.contacts && Array.isArray(data.contacts)) {
      // Structured format with metadata
      contacts = data.contacts;
      tags = data.availableTags || [];
    } else {
      throw new Error('Invalid JSON format');
    }

    // Validate and clean contacts
    const validContacts = contacts
      .filter(contact => contact && typeof contact === 'object')
      .map((contact, index) => ({
        id: contact.id || Date.now() + Math.random() + index,
        name: String(contact.name || '').trim(),
        email: String(contact.email || '').trim(),
        phone: String(contact.phone || '').trim(),
        tags: Array.isArray(contact.tags) ? contact.tags : []
      }))
      .filter(contact => contact.name && contact.email);

    return { contacts: validContacts, tags };
  }
};

// File download utilities
export const downloadUtils = {
  // Download data as file
  downloadFile: (content, filename, mimeType = 'text/plain') => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  },

  // Generate filename with timestamp
  generateFilename: (prefix, extension) => {
    const timestamp = new Date().toISOString().split('T')[0];
    return `${prefix}-${timestamp}.${extension}`;
  }
};

// File reading utilities
export const fileUtils = {
  // Read file as text
  readFileAsText: (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('No file provided'));
        return;
      }

      const reader = new FileReader();
      
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsText(file);
    });
  },

  // Validate file type
  validateFileType: (file, allowedTypes) => {
    if (!file) return false;
    
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const mimeType = file.type.toLowerCase();
    
    return allowedTypes.some(type => {
      if (type.startsWith('.')) {
        return fileExtension === type.slice(1);
      }
      return mimeType.includes(type);
    });
  },

  // Get file size in human readable format
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
};