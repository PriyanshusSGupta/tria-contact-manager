import './HistoryViewer.css';

function HistoryViewer({ history, onClose, onJumpToAction }) {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const getActionIcon = (type) => {
    switch (type) {
      case 'ADD_CONTACT':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <line x1="19" y1="8" x2="19" y2="14"></line>
            <line x1="22" y1="11" x2="16" y2="11"></line>
          </svg>
        );
      case 'EDIT_CONTACT':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        );
      case 'DELETE_CONTACT':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="3,6 5,6 21,6"></polyline>
            <path d="M19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
          </svg>
        );
      case 'IMPORT_CONTACTS':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7,10 12,15 17,10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        );
    }
  };

  const getActionColor = (type) => {
    switch (type) {
      case 'ADD_CONTACT':
      case 'IMPORT_CONTACTS':
        return 'success';
      case 'EDIT_CONTACT':
        return 'primary';
      case 'DELETE_CONTACT':
      case 'BULK_DELETE':
        return 'error';
      default:
        return 'secondary';
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="history-viewer-overlay" onClick={handleOverlayClick}>
      <div className="history-viewer-modal">
        <div className="modal-header">
          <h2>Action History</h2>
          <button 
            className="close-button"
            onClick={onClose}
            aria-label="Close history viewer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-content">
          {history.length === 0 ? (
            <div className="empty-history">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12,6 12,12 16,14"></polyline>
              </svg>
              <h3>No Actions Yet</h3>
              <p>Your action history will appear here as you make changes.</p>
            </div>
          ) : (
            <div className="history-timeline">
              {history.map((action, index) => (
                <div 
                  key={action.id}
                  className={`history-item ${action.isCurrent ? 'current' : ''} ${!action.canUndo ? 'future' : ''}`}
                  onClick={() => onJumpToAction && onJumpToAction(index)}
                >
                  <div className={`action-icon ${getActionColor(action.type)}`}>
                    {getActionIcon(action.type)}
                  </div>
                  
                  <div className="action-details">
                    <div className="action-description">{action.description}</div>
                    <div className="action-timestamp">{formatTimestamp(action.timestamp)}</div>
                  </div>
                  
                  {action.isCurrent && (
                    <div className="current-indicator">
                      <span>Current</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <div className="history-stats">
            {history.length} action{history.length !== 1 ? 's' : ''} in history
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryViewer;