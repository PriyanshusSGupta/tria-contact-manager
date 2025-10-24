import { Users, Plus, Upload } from 'lucide-react';
import './EmptyState.css';

function EmptyState({ onAddContact, onImportContacts }) {
  return (
    <div className="empty-state">
      <div className="empty-state-illustration">
        <div className="illustration-container">
          {/* Custom SVG illustration */}
          <svg 
            className="empty-illustration" 
            viewBox="0 0 200 160" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background circles */}
            <circle cx="100" cy="80" r="60" fill="var(--primary)" opacity="0.1"/>
            <circle cx="100" cy="80" r="40" fill="var(--primary)" opacity="0.15"/>
            
            {/* Main contact book */}
            <rect x="70" y="50" width="60" height="80" rx="8" fill="var(--bg-secondary)" stroke="var(--border-primary)" strokeWidth="2"/>
            <rect x="75" y="55" width="50" height="4" rx="2" fill="var(--text-tertiary)"/>
            <rect x="75" y="65" width="35" height="3" rx="1.5" fill="var(--text-tertiary)"/>
            <rect x="75" y="72" width="40" height="3" rx="1.5" fill="var(--text-tertiary)"/>
            
            {/* Contact icons */}
            <circle cx="85" cy="90" r="8" fill="var(--primary)" opacity="0.3"/>
            <circle cx="85" cy="90" r="4" fill="var(--primary)"/>
            <rect x="95" y="87" width="20" height="2" rx="1" fill="var(--text-tertiary)"/>
            <rect x="95" y="91" width="15" height="2" rx="1" fill="var(--text-tertiary)"/>
            
            <circle cx="85" cy="110" r="8" fill="var(--success)" opacity="0.3"/>
            <circle cx="85" cy="110" r="4" fill="var(--success)"/>
            <rect x="95" y="107" width="18" height="2" rx="1" fill="var(--text-tertiary)"/>
            <rect x="95" y="111" width="12" height="2" rx="1" fill="var(--text-tertiary)"/>
            
            {/* Floating plus icon */}
            <circle cx="140" cy="40" r="12" fill="var(--primary)"/>
            <path d="M135 40h10M140 35v10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            
            {/* Decorative elements */}
            <circle cx="50" cy="30" r="3" fill="var(--primary)" opacity="0.4"/>
            <circle cx="160" cy="130" r="4" fill="var(--success)" opacity="0.4"/>
            <circle cx="40" cy="120" r="2" fill="var(--warning)" opacity="0.6"/>
          </svg>
        </div>
      </div>
      
      <div className="empty-state-content">
        <h2 className="empty-state-title">No contacts yet</h2>
        <p className="empty-state-description">
          Start building your contact list by adding your first contact or importing from a file.
        </p>
        
        <div className="empty-state-actions">
          <button 
            className="empty-action-primary"
            onClick={onAddContact}
          >
            <Plus size={20} />
            Add Your First Contact
          </button>
          
          <button 
            className="empty-action-secondary"
            onClick={onImportContacts}
          >
            <Upload size={18} />
            Import Contacts
          </button>
        </div>
        
        <div className="empty-state-features">
          <div className="feature-item">
            <Users size={16} />
            <span>Organize with tags</span>
          </div>
          <div className="feature-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span>Import & export data</span>
          </div>
          <div className="feature-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <span>Smart search & filter</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyState;