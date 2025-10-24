import { useState, useRef } from 'react';
import './ImportExport.css';
import { csvUtils, jsonUtils, downloadUtils, fileUtils } from '../utils/importExport.js';

function ImportExport({ 
  contacts, 
  availableTags, 
  onImportContacts, 
  onImportTags,
  onClose 
}) {
  const [dragActive, setDragActive] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(null);
  const fileInputRef = useRef(null);

  const handleExportCSV = () => {
    try {
      const csvContent = csvUtils.contactsToCSV(contacts);
      const filename = downloadUtils.generateFilename('contacts', 'csv');
      downloadUtils.downloadFile(csvContent, filename, 'text/csv');
    } catch (error) {
      console.error('Export CSV error:', error);
      alert('Failed to export CSV file');
    }
  };

  const handleExportJSON = () => {
    try {
      const jsonContent = jsonUtils.contactsToJSON(contacts, availableTags);
      const filename = downloadUtils.generateFilename('contacts-backup', 'json');
      downloadUtils.downloadFile(jsonContent, filename, 'application/json');
    } catch (error) {
      console.error('Export JSON error:', error);
      alert('Failed to export JSON file');
    }
  };

  const processImportFile = async (file) => {
    setImporting(true);
    setImportProgress({ message: 'Reading file...', progress: 25 });

    try {
      const content = await fileUtils.readFileAsText(file);
      setImportProgress({ message: 'Processing data...', progress: 50 });

      let importedContacts = [];
      let importedTags = [];

      if (file.name.toLowerCase().endsWith('.csv')) {
        importedContacts = csvUtils.csvToContacts(content);
      } else if (file.name.toLowerCase().endsWith('.json')) {
        const result = jsonUtils.jsonToContacts(content);
        importedContacts = result.contacts;
        importedTags = result.tags;
      } else {
        throw new Error('Unsupported file format');
      }

      setImportProgress({ message: 'Importing contacts...', progress: 75 });

      if (importedContacts.length === 0) {
        throw new Error('No valid contacts found in file');
      }

      // Import contacts and tags
      await onImportContacts(importedContacts);
      if (importedTags.length > 0) {
        await onImportTags(importedTags);
      }

      setImportProgress({ message: 'Import complete!', progress: 100 });
      
      setTimeout(() => {
        setImporting(false);
        setImportProgress(null);
        onClose();
      }, 1000);

    } catch (error) {
      console.error('Import error:', error);
      setImporting(false);
      setImportProgress(null);
      alert(`Import failed: ${error.message}`);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processImportFile(file);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (fileUtils.validateFileType(file, ['.csv', '.json'])) {
        processImportFile(file);
      } else {
        alert('Please select a CSV or JSON file');
      }
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="import-export-overlay" onClick={handleOverlayClick}>
      <div className="import-export-modal">
        <div className="modal-header">
          <h2>Import & Export Contacts</h2>
          <button 
            className="close-button"
            onClick={onClose}
            aria-label="Close import/export"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-content">
          {importing ? (
            <div className="import-progress">
              <div className="progress-icon">
                <svg className="spinner" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416">
                    <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                    <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                  </circle>
                </svg>
              </div>
              <h3>Importing Contacts</h3>
              <p>{importProgress?.message}</p>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${importProgress?.progress || 0}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <>
              <div className="export-section">
                <h3>Export Contacts</h3>
                <p>Download your contacts in different formats</p>
                
                <div className="export-options">
                  <button 
                    className="export-btn csv-btn"
                    onClick={handleExportCSV}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14,2 14,8 20,8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10,9 9,9 8,9"></polyline>
                    </svg>
                    <div>
                      <span className="btn-title">Export as CSV</span>
                      <span className="btn-subtitle">Spreadsheet format</span>
                    </div>
                  </button>

                  <button 
                    className="export-btn json-btn"
                    onClick={handleExportJSON}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14,2 14,8 20,8"></polyline>
                      <path d="M12 18v-6l-3-3 3-3v-2"></path>
                    </svg>
                    <div>
                      <span className="btn-title">Export as JSON</span>
                      <span className="btn-subtitle">Full backup with tags</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="import-section">
                <h3>Import Contacts</h3>
                <p>Upload CSV or JSON files to import contacts</p>
                
                <div 
                  className={`drop-zone ${dragActive ? 'drag-active' : ''}`}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="drop-zone-content">
                    <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7,10 12,15 17,10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <h4>Drop files here or click to browse</h4>
                    <p>Supports CSV and JSON files</p>
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.json"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />

                <div className="import-info">
                  <h4>Supported Formats:</h4>
                  <ul>
                    <li><strong>CSV:</strong> Name, Email, Phone, Tags (semicolon-separated)</li>
                    <li><strong>JSON:</strong> Full backup format with all data</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="modal-footer">
          <div className="contact-count">
            {contacts.length} contact{contacts.length !== 1 ? 's' : ''} ready to export
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImportExport;