import './AddContactButton.css';

function AddContactButton({ onClick }) {
  return (
    <button 
      className="add-contact-button"
      onClick={onClick}
      aria-label="Add new contact"
      title="Add new contact"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  );
}

export default AddContactButton;