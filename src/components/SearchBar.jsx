import { memo, useState, useEffect, useRef } from 'react';
import './SearchBar.css';
import { Search, X } from 'lucide-react';
import { getSearchSuggestions } from '../utils/fuzzySearch.js';

function SearchBar({ searchTerm, onSearchChange, contacts = [] }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Generate suggestions when search term changes
  useEffect(() => {
    if (searchTerm && searchTerm.length >= 2) {
      const newSuggestions = getSearchSuggestions(contacts, searchTerm, 5);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedSuggestion(-1);
  }, [searchTerm, contacts]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestion >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestion]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
    setSelectedSuggestion(-1);
    inputRef.current?.focus();
  };

  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedSuggestion(-1);
    }, 150);
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <Search className="search-icon" size={20} />
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search contacts by name, email, or phone..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {searchTerm && (
          <button
            className="search-clear"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
        
        {showSuggestions && suggestions.length > 0 && (
          <div ref={suggestionsRef} className="search-suggestions">
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                className={`search-suggestion ${index === selectedSuggestion ? 'selected' : ''}`}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setSelectedSuggestion(index)}
              >
                <Search className="suggestion-icon" size={16} />
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(SearchBar);