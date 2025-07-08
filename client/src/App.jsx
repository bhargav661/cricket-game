import React, { useState } from 'react';
import SinglePlayerGame from './SinglePlayerGame';
import MultiplayerGame from './MultiplayerGame';
import './App.css';

function App() {
  const [mode, setMode] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <header>
        <h1>🏏 Cricketer Guessing Game</h1>
        <button className="toggle-btn" onClick={toggleMode}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      {!mode && (
        <div className="mode-buttons">
          <button onClick={() => setMode('single')}>Play with Bot</button>
          <button onClick={() => setMode('multi')}>Multiplayer</button>
        </div>
      )}

      {mode === 'single' && <SinglePlayerGame />}
      {mode === 'multi' && <MultiplayerGame onBack={() => setMode('')} />}
    </div>
  );
}

export default App;
