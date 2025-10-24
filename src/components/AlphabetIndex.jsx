import { useMemo } from 'react';
import './AlphabetIndex.css';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function AlphabetIndex({ contacts, onLetterClick, activeLetter }) {
  // Calculate which letters have contacts
  const availableLetters = useMemo(() => {
    const letterSet = new Set();
    contacts.forEach(contact => {
      const firstLetter = contact.name.charAt(0).toUpperCase();
      if (ALPHABET.includes(firstLetter)) {
        letterSet.add(firstLetter);
      }
    });
    return letterSet;
  }, [contacts]);

  const handleLetterClick = (letter) => {
    // Find the first contact starting with this letter
    const targetContact = contacts.find(contact => 
      contact.name.charAt(0).toUpperCase() === letter
    );
    
    if (targetContact) {
      // Scroll to the contact element
      const contactElement = document.querySelector(`[data-contact-id="${targetContact.id}"]`);
      if (contactElement) {
        // Add highlight effect
        contactElement.classList.add('alphabet-highlight');
        
        // Scroll to the contact
        contactElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        
        // Set active letter for visual feedback
        onLetterClick(letter);
        
        // Remove highlight and clear active letter after animation
        setTimeout(() => {
          contactElement.classList.remove('alphabet-highlight');
          onLetterClick(null);
        }, 2000);
      }
    }
  };

  return (
    <div className="alphabet-index">
      <div className="alphabet-letters">
        {ALPHABET.map(letter => {
          const hasContacts = availableLetters.has(letter);
          const isActive = activeLetter === letter;
          
          return (
            <button
              key={letter}
              className={`alphabet-letter ${hasContacts ? 'has-contacts' : 'no-contacts'} ${isActive ? 'active' : ''}`}
              onClick={() => handleLetterClick(letter)}
              disabled={!hasContacts}
              title={hasContacts ? `Show contacts starting with ${letter}` : `No contacts starting with ${letter}`}
              aria-label={`Filter contacts by letter ${letter}`}
            >
              {letter}
            </button>
          );
        })}
      </div>
      
      {activeLetter && (
        <div className="active-letter-indicator">
          <span className="active-letter-display">{activeLetter}</span>
        </div>
      )}
    </div>
  );
}

export default AlphabetIndex;