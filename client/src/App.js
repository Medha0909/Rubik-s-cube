// src/App.js (Centered UI Enhancements)
import React, { useState } from 'react';
import { Cube } from './cube/Cube';
import { solveCube } from './cube/Solver';
import CubeVisualizer from './components/CubeVisualizer';

export default function App() {
  const [cube, setCube] = useState(new Cube());
  const [scrambleHistory, setScrambleHistory] = useState([]);
  const [solution, setSolution] = useState([]);
  const [states, setStates] = useState([]);

  const handleScramble = () => {
    const newCube = new Cube();
    const history = newCube.scramble();
    setCube(newCube);
    setScrambleHistory(history);
    setSolution([]);
    setStates([]);
  };

  const handleSolve = () => {
    const cubeClone = cube.clone();
    const { steps, states } = solveCube(cubeClone, scrambleHistory);
    setSolution(steps);
    setStates(states);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px',
      fontFamily: 'Poppins, sans-serif',
      background: 'linear-gradient(135deg, #eef2f3, #8e9eab)',
      minHeight: '100vh',
      color: '#333',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#2c3e50', fontSize: '2.5rem', marginBottom: '20px' }}>Rubik's Cube Solver</h1>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '30px'
      }}>
        <button onClick={handleScramble} style={{
          padding: '12px 24px',
          backgroundColor: '#ff6f61',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>Scramble</button>

        <button onClick={handleSolve} style={{
          padding: '12px 24px',
          backgroundColor: '#20bf6b',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>Solve</button>
      </div>

      <h2 style={{ marginBottom: '20px', color: '#34495e' }}>Current Cube</h2>
      <CubeVisualizer cube={cube} />

      {solution.length > 0 && (
        <div style={{ marginTop: '50px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Solution Steps</h2>
          {solution.map((step, index) => (
            <div key={index} style={{
              margin: '20px 0',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              maxWidth: '490px',
              width: '100%',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <strong style={{ display: 'block', marginBottom: '10px' }}>Step {index + 1}:</strong>
              <div style={{ marginBottom: '10px', fontStyle: 'italic', color: '#555' }}>{step.desc}</div>
              <CubeVisualizer cube={states[index + 1]} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
