'use client';

import { useState, useEffect } from 'react';

/**
 * A hook that returns whether the current viewport matches the specified media query
 * @param {string} query - CSS media query string (e.g. '(max-width: 768px)')
 * @returns {boolean} - Whether the viewport matches the query
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    // Create a media query list
    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);
    
    // Define listener function
    const handleChange = (event) => {
      setMatches(event.matches);
    };
    
    // Add listener
    mediaQuery.addEventListener('change', handleChange);
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);
  
  return matches;
}
