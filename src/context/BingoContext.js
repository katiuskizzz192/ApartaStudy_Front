import React, {createContext, useEffect, useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  emptyCard,
  normalizeBall,
  markBallOnCard,
  sortCardsByProgress,
  duplicateCard,
} from '../utils/bingo';

export const BingoContext = createContext();

const STORAGE_KEY = '@bingo_offline_store';

const initialState = {
  cards: [],
  drawnBalls: [],
};

export const BingoProvider = ({children}) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) {
          setState(JSON.parse(data));
        }
      } catch (e) {
        console.warn('Error loading storage', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(e =>
        console.warn('Save error', e),
      );
    }
  }, [state, loading]);

  const addCard = useCallback((number, cells) => {
    const id = Date.now().toString();
    const base = emptyCard(id, number);
    const newCells = base.cells.map((cell, idx) => ({
      ...cell,
      value: cells[idx]?.value ?? null,
      isFree: cells[idx]?.isFree ?? cell.isFree,
      marked: cells[idx]?.marked ?? cell.isFree,
    }));
    const newCard = {...base, cells: newCells};
    setState(prev => ({...prev, cards: sortCardsByProgress([...prev.cards, newCard])}));
    return newCard;
  }, []);

  const updateCard = useCallback(updated => {
    setState(prev => ({
      ...prev,
      cards: sortCardsByProgress(prev.cards.map(c => (c.id === updated.id ? updated : c))),
    }));
  }, []);

  const removeCard = useCallback(cardId => {
    setState(prev => ({...prev, cards: prev.cards.filter(c => c.id !== cardId)}));
  }, []);

  const duplicateExistingCard = useCallback(cardId => {
    setState(prev => {
      const found = prev.cards.find(c => c.id === cardId);
      if (!found) return prev;
      const duplicated = duplicateCard(found);
      return {...prev, cards: sortCardsByProgress([...prev.cards, duplicated])};
    });
  }, []);

  const clearAll = useCallback(() => setState(initialState), []);

  const resetCard = useCallback(cardId => {
    setState(prev => ({
      ...prev,
      cards: prev.cards.map(c =>
        c.id === cardId
          ? {...c, cells: c.cells.map(cell => ({...cell, marked: cell.isFree}))}
          : c,
      ),
    }));
  }, []);

  const setDrawnBalls = useCallback(list => {
    setState(prev => ({...prev, drawnBalls: list}));
  }, []);

  const markBall = useCallback(input => {
    const normalized = normalizeBall(input);
    if (!normalized) return null;
    setState(prev => {
      const updatedCards = prev.cards.map(card => {
        const {card: newCard} = markBallOnCard(card, normalized);
        return newCard;
      });
      const drawn = prev.drawnBalls.includes(normalized)
        ? prev.drawnBalls
        : [...prev.drawnBalls, normalized];
      return {
        ...prev,
        cards: sortCardsByProgress(updatedCards),
        drawnBalls: drawn,
      };
    });
    return normalized;
  }, []);

  const value = {
    ...state,
    loading,
    addCard,
    updateCard,
    removeCard,
    resetCard,
    markBall,
    clearAll,
    setDrawnBalls,
    duplicateExistingCard,
  };

  return <BingoContext.Provider value={value}>{children}</BingoContext.Provider>;
};
