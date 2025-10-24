import { useMemo } from 'react';
import './AlphabetIndex.css';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function AlphabetIndex({ contacts, onLetterClick, activeLetter, onHighlightContact }) {
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
        // Use different scroll behavior for mobile
        const isMobile = window.innerWidth <= 768;
        const scrollOptions = {
          behavior: 'smooth',
          block: isMobile ? 'start' : 'center',
          inline: 'nearest'
        };
        
        // Scroll to the contact
        contactElement.scrollIntoView(scrollOptions);
        
        // Set active letter for visual feedback (briefly)
        onLetterClick(letter);
        
        // Add haptic feedback on mobile devices
        if ('vibrate' in navigator && isMobile) {
          navigator.vibrate(50);
        }
        
        // Highlight the contact using React state (no direct DOM manipulation)
        setTimeout(() => {
          onHighlightContact(targetContact.id);
          
          // Remove highlight after animation
          setTimeout(() => {
            onHighlightContact(null);
          }, 1500);
        }, 300);
        
        // Clear active letter after a short delay
        setTimeout(() => {
          onLetterClick(null);
        }, 800);
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