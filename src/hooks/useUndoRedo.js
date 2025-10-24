import { useState, useCallback, useRef } from 'react';

// Action types for different operations
export const ACTION_TYPES = {
  ADD_CONTACT: 'ADD_CONTACT',
  EDIT_CONTACT: 'EDIT_CONTACT',
  DELETE_CONTACT: 'DELETE_CONTACT',
  BULK_DELETE: 'BULK_DELETE',
  IMPORT_CONTACTS: 'IMPORT_CONTACTS'
};

// Create an action object
export const createAction = (type, payload, description) => ({
  id: Date.now() + Math.random(),
  type,
  payload,
  description,
  timestamp: new Date().toISOString()
});

export function useUndoRedo(initialState, maxHistorySize = 50) {
  const [currentState, setCurrentState] = useState(initialState);
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const isPerformingUndoRedo = useRef(false);

  // Execute an action and add it to history
  const executeAction = useCallback((action, newState) => {
    if (isPerformingUndoRedo.current) {
      return; // Don't add to history if we're undoing/redoing
    }

    setCurrentState(newState);
    
    setHistory(prevHistory => {
      // Remove any future history if we're not at the end
      const newHistory = prevHistory.slice(0, currentIndex + 1);
      
      // Add the new action
      newHistory.push({
        ...action,
        previousState: currentState,
        newState: newState
      });
      
      // Limit history size
      if (newHistory.length > maxHistorySize) {
        return newHistory.slice(-maxHistorySize);
      }
      
      return newHistory;
    });
    
    setCurrentIndex(prevIndex => {
      const newIndex = Math.min(prevIndex + 1, maxHistorySize - 1);
      return newIndex;
    });
  }, [currentState, currentIndex, maxHistorySize]);

  // Undo the last action
  const undo = useCallback(() => {
    if (currentIndex >= 0) {
      isPerformingUndoRedo.current = true;
      
      const actionToUndo = history[currentIndex];
      setCurrentState(actionToUndo.previousState);
      setCurrentIndex(prevIndex => prevIndex - 1);
      
      // Reset the flag after state update
      setTimeout(() => {
        isPerformingUndoRedo.current = false;
      }, 0);
      
      return actionToUndo;
    }
    return null;
  }, [currentIndex, history]);

  // Redo the next action
  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      isPerformingUndoRedo.current = true;
      
      const actionToRedo = history[currentIndex + 1];
      setCurrentState(actionToRedo.newState);
      setCurrentIndex(prevIndex => prevIndex + 1);
      
      // Reset the flag after state update
      setTimeout(() => {
        isPerformingUndoRedo.current = false;
      }, 0);
      
      return actionToRedo;
    }
    return null;
  }, [currentIndex, history]);

  // Clear all history
  const clearHistory = useCallback(() => {
    setHistory([]);
    setCurrentIndex(-1);
  }, []);

  // Get history for display
  const getHistory = useCallback(() => {
    return history.map((action, index) => ({
      ...action,
      isCurrent: index === currentIndex,
      canUndo: index <= currentIndex,
      canRedo: index > currentIndex
    }));
  }, [history, currentIndex]);

  return {
    state: currentState,
    executeAction,
    undo,
    redo,
    clearHistory,
    getHistory,
    canUndo: currentIndex >= 0,
    canRedo: currentIndex < history.length - 1,
    historyLength: history.length,
    currentIndex
  };
}