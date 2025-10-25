// Fuzzy search utilities for intelligent contact searching

// Calculate Levenshtein distance between two strings
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  // Create matrix
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  // Fill matrix
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Calculate similarity score (0-1, where 1 is perfect match)
function calculateSimilarity(str1, str2) {
  const maxLength = Math.max(str1.length, str2.length);
  if (maxLength === 0) return 1;
  
  const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
  return 1 - (distance / maxLength);
}

// Check if query matches the beginning of any word in the text
function startsWithMatch(text, query) {
  const words = text.toLowerCase().split(/\s+/);
  const queryLower = query.toLowerCase();
  
  return words.some(word => word.startsWith(queryLower));
}

// Check for substring match
function substringMatch(text, query) {
  return text.toLowerCase().includes(query.toLowerCase());
}

// Extract searchable text from contact (currently unused but kept for future use)
// function getSearchableText(contact) {
//   const parts = [
//     contact.name || '',
//     contact.email || '',
//     contact.phone || ''
//   ];
//   
//   return parts.join(' ').toLowerCase();
// }

// Main fuzzy search function
export function fuzzySearchContacts(contacts, query, options = {}) {
  const {
    threshold = 0.3,           // Minimum similarity score
    maxResults = 50,           // Maximum number of results
    // prioritizeExactMatch = true, // Prioritize exact matches
    prioritizeStartsWith = true  // Prioritize starts-with matches
  } = options;
  
  if (!query || query.trim().length === 0) {
    return contacts;
  }
  
  const queryTrimmed = query.trim();
  const results = [];
  
  for (const contact of contacts) {
    // const searchText = getSearchableText(contact);
    const name = contact.name || '';
    const email = contact.email || '';
    const phone = contact.phone || '';
    
    let score = 0;
    let matchType = 'none';
    
    // Check for exact substring matches (highest priority)
    if (substringMatch(name, queryTrimmed)) {
      score = 1.0;
      matchType = 'exact';
    } else if (substringMatch(email, queryTrimmed)) {
      score = 0.9;
      matchType = 'exact';
    } else if (substringMatch(phone, queryTrimmed)) {
      score = 0.85;
      matchType = 'exact';
    }
    // Check for starts-with matches
    else if (prioritizeStartsWith && startsWithMatch(name, queryTrimmed)) {
      score = 0.8;
      matchType = 'startsWith';
    }
    // Fuzzy matching
    else {
      const nameSimilarity = calculateSimilarity(name, queryTrimmed);
      const emailSimilarity = calculateSimilarity(email, queryTrimmed);
      const phoneSimilarity = calculateSimilarity(phone, queryTrimmed);
      
      // Take the best similarity score
      score = Math.max(nameSimilarity, emailSimilarity * 0.8, phoneSimilarity * 0.7);
      matchType = 'fuzzy';
    }
    
    // Only include results above threshold
    if (score >= threshold) {
      results.push({
        contact,
        score,
        matchType
      });
    }
  }
  
  // Sort by score (descending) and match type priority
  results.sort((a, b) => {
    // First sort by match type priority
    const typeOrder = { exact: 3, startsWith: 2, fuzzy: 1 };
    const typeDiff = typeOrder[b.matchType] - typeOrder[a.matchType];
    
    if (typeDiff !== 0) return typeDiff;
    
    // Then by score
    return b.score - a.score;
  });
  
  // Return only the contacts, limited by maxResults
  return results.slice(0, maxResults).map(result => result.contact);
}

// Highlight matching text in search results
export function highlightMatches(text, query) {
  if (!query || !text) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// Search suggestions based on partial input
export function getSearchSuggestions(contacts, query, maxSuggestions = 5) {
  if (!query || query.length < 2) return [];
  
  const suggestions = new Set();
  const queryLower = query.toLowerCase();
  
  contacts.forEach(contact => {
    const name = contact.name || '';
    const email = contact.email || '';
    
    // Add name suggestions
    const nameWords = name.split(/\s+/);
    nameWords.forEach(word => {
      if (word.toLowerCase().startsWith(queryLower) && word.length > query.length) {
        suggestions.add(word);
      }
    });
    
    // Add email suggestions
    if (email.toLowerCase().startsWith(queryLower) && email.length > query.length) {
      suggestions.add(email);
    }
  });
  
  return Array.from(suggestions).slice(0, maxSuggestions);
}