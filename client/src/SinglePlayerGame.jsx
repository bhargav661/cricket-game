// src/SinglePlayerGame.jsx
import React, { useState, useEffect } from 'react';
import cricketers from './cricketers_full.json';
import './SinglePlayerGame.css';

const getRandomCricketer = (letter) => {
  const matches = cricketers.filter(name =>
    name.toLowerCase().startsWith(letter.toLowerCase())
  );
  return matches.length > 0
    ? matches[Math.floor(Math.random() * matches.length)]
    : null;
};

const getHint = (letter) => {
  const matches = cricketers.filter(name =>
    name.toLowerCase().startsWith(letter.toLowerCase())
  );
  if (matches.length === 0) return null;

  const randomName = matches[Math.floor(Math.random() * matches.length)];
  const parts = randomName.split(' ');
  if (parts.length >= 2) return `Hint: Surname - ${parts.slice(-1)[0]}`;
  return `Hint: Starts with - ${randomName.slice(0, 3)}`;
};

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const SinglePlayerGame = () => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [yourGuess, setYourGuess] = useState('');
  const [botGuess, setBotGuess] = useState('');
  const [yourScore, setYourScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(30);
  const [animateScore, setAnimateScore] = useState(false);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [hintMessage, setHintMessage] = useState('');

  const currentLetter = alphabet[currentLetterIndex];

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          handleGuess(); // auto-submit
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentLetterIndex]);

  const handleGuess = () => {
    const guess = yourGuess.trim();
    const isValid = cricketers.some(name =>
      name.toLowerCase() === guess.toLowerCase()
    );

    const bot = getRandomCricketer(currentLetter);

    if (
      isValid &&
      guess.toLowerCase().startsWith(currentLetter.toLowerCase())
    ) {
      setYourScore(prev => prev + 1);
      setAnimateScore(true);
      setMessage('✅ Great! Correct guess.');
    } else {
      setMessage('❌ Invalid or wrong letter.');
    }

    if (bot) {
      setBotGuess(bot);
      setBotScore(prev => prev + 1);
    } else {
      setBotGuess('Bot skipped');
    }

    setYourGuess('');
    setHintMessage('');
    setCurrentLetterIndex(prev => prev + 1);
    setTimer(30);

    // Remove animation after short delay
    setTimeout(() => setAnimateScore(false), 500);
  };

  const handleHint = () => {
    if (hintsLeft > 0) {
      const hint = getHint(currentLetter);
      if (hint) {
        setHintMessage(hint);
        setHintsLeft(prev => prev - 1);
      } else {
        setHintMessage('❌ No cricketer found for hint.');
      }
    } else {
      setHintMessage('❌ No hints left.');
    }
  };

  if (currentLetterIndex >= alphabet.length) {
    return (
      <div className="game-end">
        <h1>🏁 Game Over</h1>
        <p>Your Score: {yourScore}</p>
        <p>Bot Score: {botScore}</p>
        <h2>{yourScore > botScore ? '🎉 You Win!' : '🤖 Bot Wins!'}</h2>
        <button onClick={() => window.location.reload()}>Play Again</button>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h1>🎮 Single Player - Guess the Cricketer</h1>
      <h2>🔤 Letter: <span className="highlight-letter">{currentLetter}</span></h2>
      <p>⏱️ Time Left: {timer}s</p>
      <input
        placeholder={`Enter cricketer starting with ${currentLetter}`}
        value={yourGuess}
        onChange={e => setYourGuess(e.target.value)}
      />
      <div className="buttons">
        <button onClick={handleGuess}>Submit</button>
        <button onClick={handleHint}>Hint ({hintsLeft} left)</button>
      </div>
      <p className="result">{message}</p>
      <p className="hint">{hintMessage}</p>
      <p>🤖 Bot's Guess: {botGuess}</p>
      <div className="scoreboard">
        <p className={animateScore ? 'bounce' : ''}>🏏 Your Score: {yourScore}</p>
        <p>🤖 Bot Score: {botScore}</p>
      </div>
    </div>
  );
};

export default SinglePlayerGame;
