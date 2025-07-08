// src/Home.jsx
import React from 'react';
import './Home.css';

export default function Home({ onSelectMode }) {
  return (
    <div className="home-bg">
      <div className="home-overlay" />
      <div className="home-card">
        <h1 className="home-title">🏏 Cricketer Guessing</h1>
        <p className="home-sub">Choose your mode</p>
        <div className="home-buttons">
          <button onClick={() => onSelectMode('single')} className="btn btn-single">
            🎮 Single Player
          </button>
          <button onClick={() => onSelectMode('multi')} className="btn btn-multi">
            👥 Multiplayer
          </button>
        </div>
      </div>
    </div>
  );
}
