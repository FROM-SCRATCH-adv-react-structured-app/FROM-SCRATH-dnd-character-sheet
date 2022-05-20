import { useContext, useState, useEffect } from 'react';
import { CharacterContext } from '../context/CharContext';
import { useUserContext } from '../context/UserContext';
import {
  getCharacters,
  createCharacter,
  updateCharacterById,
  deleteCharacterById,
} from '../services/characters';

export function useCharacters() {
  const context = useContext(CharacterContext);

  if (context === undefined) {
    throw new Error('useCharacters must be used withing a CharacterContext');
  }

  const { characters, dispatch } = context;

  useEffect(() => {
    if (characters) return;

    const load = async () => {
      try {
        const payload = await getCharacters();
        dispatch({ type: 'reset', payload });
      } catch (error) {
        throw error;
      }
    };
    load();
  }, []);

  const addNewCharacter = async (character) => {
    try {
      const payload = await createCharacter(character);
      dispatch({ type: 'create', payload });
      return payload;
    } catch (error) {
      throw error;
    }
  };
  return { characters, addNewCharacter };
}
