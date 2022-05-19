import React from 'react';
import { useState, useEffect } from 'react';
import style from './Form.css';
import { useCharacter } from '../../context/CharacterContext';
import { useForm } from '../../hooks/useForm';

export default function CharacterForm() {
  const { formState, handleChange } = useForm({
    characterName: '',
    characterClass: 'Fighter',
  });
  const [stats, setStats] = useState(statObj);

  function handleSubmit(e) {}

  const statObj = {
    str: '',
    dex: '',
    con: '',
    int: '',
    wis: '',
    cha: '',
  };

  function roll3d6() {
    const d1 = Math.ceil(Math.random() * 6);
    const d2 = Math.ceil(Math.random() * 6);
    const d3 = Math.ceil(Math.random() * 6);
    const stat = d1 + d2 + d3;
    console.log(`|| stat >`, stat);
    return stat;
  }

  function rollStats() {
    statObj.str = roll3d6();
    statObj.dex = roll3d6();
    statObj.con = roll3d6();
    statObj.int = roll3d6();
    statObj.wis = roll3d6();
    statObj.cha = roll3d6();
    setStats(statObj);
  }

  useEffect(() => {
    rollStats();
  }, []);

  function submitCharacter(e) {
    e.preventDefault();
    console.log(`|| formState.characterName >`, formState.characterName);
    console.log(`|| formState.characterClass >`, formState.characterClass);
  }

  return (
    <section className={style.sectionForm}>
      <h2>New Character Form</h2>
      <form onSubmit={submitCharacter} className={style.characterForm}>
        <div>
          <label htmlFor="characterName">Character Name</label>
          <input
            name="characterName"
            value={formState.characterName || ''}
            type="text"
            id="characterName"
            onChange={handleChange}
          />
        </div>
        <div className={style.flexColumn}>
          <label htmlFor="characterClass">Character Class</label>
          <select
            name="characterClass"
            id="characterClass"
            onChange={handleChange}
          >
            <option value="Monk">Monk</option>
            <option value="Knight">Knight</option>
          </select>
        </div>
        {/* <div className={style.flexColumn}>
          <label htmlFor="characterRace">Character Race</label>
          <select name="" id="characterRace">
            <option value="Human">Human</option>
            <option value="Elf">Elf</option>
            <option value="Half-Elf">Half Elf</option>
          </select>
        </div>
        <div className={style.flexColumn}>
          <label htmlFor="characterAlignment">Character Alignment</label>
          <select name="" id="characterAlignment">
            <option value="Lawful-Good">Lawful Good</option>
            <option value="Neutral-Good">Neutral Good</option>
            <option value="Chaotic-Good">Chaotic Good</option>
          </select>
        </div>
        <section className={style.statSection}>
          <p>Str: {stats?.str}</p>
          <p>Dex: {stats?.dex}</p>
          <p>Con: {stats?.con}</p>
          <p>Int: {stats?.int}</p>
          <p>Wis: {stats?.wis}</p>
          <p>Cha: {stats?.cha}</p>
        </section> */}
        <button onClick={rollStats}>Reroll Stats</button>
        <button>Create Character</button>
      </form>
    </section>
  );
}
