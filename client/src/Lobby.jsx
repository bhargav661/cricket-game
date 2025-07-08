// src/Lobby.jsx
import React, { useState } from 'react';
import './Lobby.css';

const Lobby = ({ onCreateRoom, onJoinRoom }) => {
  const [roomCode, setRoomCode] = useState('');
  const [playerName, setPlayerName] = useState('');

  return (
    <div className="lobby-container">
      <h1>🏏 Multiplayer Lobby</h1>
      <input
        type="text"
        placeholder="Enter Your Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Room Code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
      />
      <div className="lobby-buttons">
        <button
          onClick={() => {
            if (roomCode && playerName) {
              onCreateRoom(roomCode, playerName);
            } else {
              alert('Please enter room code and your name.');
            }
          }}
        >
          ➕ Create Room
        </button>
        <button
          onClick={() => {
            if (roomCode && playerName) {
              onJoinRoom(roomCode, playerName);
            } else {
              alert('Please enter room code and your name.');
            }
          }}
        >
          🔗 Join Room
        </button>
      </div>
    </div>
  );
};

export default Lobby;
