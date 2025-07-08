// src/MultiplayerGame.jsx
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Lobby from './Lobby';
import './MultiplayerGame.css';

const socket = io(import.meta.env.VITE_API_URL);
 // Make sure your server is running
const MultiplayerGame = ({ onBack }) => {
  const [inRoom, setInRoom] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [players, setPlayers] = useState([]);
  const [currentLetter, setCurrentLetter] = useState('');
  const [yourTurn, setYourTurn] = useState(false);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [currentTurnId, setCurrentTurnId] = useState(null);

  const handleCreateRoom = (room, name) => {
    setRoomCode(room);
    setPlayerName(name);
    socket.emit('create_room', { roomCode: room, playerName: name });
  };

  const handleJoinRoom = (room, name) => {
    setRoomCode(room);
    setPlayerName(name);
    socket.emit('join_room', { roomCode: room, playerName: name });
  };

  const handleGuessSubmit = () => {
    if (!guess) return;
    socket.emit('submit_guess', { roomCode, playerId: socket.id, guess });
    setGuess('');
  };

  useEffect(() => {
    socket.on('room_created', (roomCode) => {
      setInRoom(true);
    });

    socket.on('update_players', (players) => {
      setPlayers(players);
    });

    socket.on('game_start', ({ letter, currentTurn }) => {
      setCurrentLetter(letter);
      setCurrentTurnId(currentTurn);
    });

    socket.on('next_turn', ({ letter, currentTurn }) => {
      setCurrentLetter(letter);
      setCurrentTurnId(currentTurn);
    });

    socket.on('guess_result', ({ guess, valid, player, score }) => {
      setMessage(
        valid
          ? `✅ ${player} guessed "${guess}" correctly!`
          : `❌ ${player} guessed "${guess}" but it was wrong.`
      );
    });

    socket.on('game_over', (players) => {
      setMessage('🏁 Game Over! Final Scores:');
      setPlayers(players);
    });

    return () => {
      socket.off();
    };
  }, []);

  useEffect(() => {
    setYourTurn(currentTurnId === socket.id);
  }, [currentTurnId]);

  if (!inRoom) {
    return <Lobby onCreateRoom={handleCreateRoom} onJoinRoom={handleJoinRoom} />;
  }

  return (
    <div className="multiplayer-container">
      <h1>👥 Multiplayer Mode</h1>
      <p><strong>Room:</strong> {roomCode}</p>
      <p><strong>Letter:</strong> {currentLetter}</p>
      <p><strong>Players:</strong> {players.map(p => `${p.name} (${p.score})`).join(', ')}</p>

      {yourTurn ? (
        <>
          <input
            value={guess}
            placeholder={`Guess starting with ${currentLetter}`}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button onClick={handleGuessSubmit}>Submit</button>
        </>
      ) : (
        <p>⏳ Waiting for your turn...</p>
      )}

      <p className="message">{message}</p>
      <button className="back-button" onClick={onBack}>⬅ Back</button>
    </div>
  );
};

export default MultiplayerGame;
