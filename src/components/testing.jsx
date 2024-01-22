import React, { useState, useEffect } from 'react';

const PotionsCatalog = () => {
  const apiUrl = 'https://api.potterdb.com/v1/potions';
  const [potions, setPotions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [characteristicFilter, setCharacteristicFilter] = useState('');
  const [selectedPotion, setSelectedPotion] = useState(null);

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setPotions(data.data));
  }, []);

  const filteredPotions = potions.filter(potion =>
    potion.attributes.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (difficultyFilter === '' || potion.attributes.difficulty === difficultyFilter) &&
    (characteristicFilter === '' || potion.attributes.characteristics === characteristicFilter)
  );

  const openModal = (potion) => {
    setSelectedPotion(potion);
  };

  const closeModal = () => {
    setSelectedPotion(null);
  };

  return (
    <div>
      <h1>Harry Potter Potions Catalog</h1>

      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={difficultyFilter}
        onChange={(e) => setDifficultyFilter(e.target.value)}
      >
        <option value="">Filter by Difficulty</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      <select
        value={characteristicFilter}
        onChange={(e) => setCharacteristicFilter(e.target.value)}
      >
        <option value="">Filter by Characteristic</option>
        <option value="Green">Green</option>
        <option value="Blue">Blue</option>
        {/* Add more characteristics as needed */}
      </select>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredPotions.map(potion => (
          <div key={potion.id} style={{ border: '1px solid #ddd', padding: '10px', maxWidth: '200px' }}>
            <h3>{potion.attributes.name}</h3>
            <p><strong>Difficulty:</strong> {potion.attributes.difficulty}</p>
            <p><strong>Characteristic:</strong> {potion.attributes.characteristics}</p>
            <img src={potion.attributes.image} alt={potion.attributes.name} style={{ maxWidth: '100%' }} />
            <button onClick={() => openModal(potion)}>Details</button>
          </div>
        ))}
      </div>

      {selectedPotion && (
        <div style={{ display: 'block', position: 'fixed', zIndex: 1, left: 0, top: 0, width: '100%', height: '100%', overflow: 'auto', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div style={{ backgroundColor: '#fefefe', margin: '15% auto', padding: '20px', border: '1px solid #888', maxWidth: '600px' }}>
            <span style={{ color: '#aaa', float: 'right', fontSize: '28px', fontWeight: 'bold', cursor: 'pointer' }} onClick={closeModal}>&times;</span>
            <h2>{selectedPotion.attributes.name}</h2>
            <p><strong>Difficulty:</strong> {selectedPotion.attributes.difficulty}</p>
            <p><strong>Effect:</strong> {selectedPotion.attributes.effect}</p>
            <p><strong>Characteristic:</strong> {selectedPotion.attributes.characteristics}</p>
            {/* Add more details as needed */}
            <a href={selectedPotion.attributes.wiki} target="_blank" rel="noopener noreferrer">Wiki Link</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PotionsCatalog;