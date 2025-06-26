import React from 'react';

const colorMap = {
  W: 'white', Y: 'yellow', G: 'green',
  B: 'blue', O: 'orange', R: 'red'
};

export default function CubeVisualizer({ cube }) {
  const faceToGrid = (face) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 20px)', gap: '2px' }}>
      {cube.faces[face].map((color, i) => (
        <div key={i} style={{
          width: '20px', height: '20px',
          backgroundColor: colorMap[color],
          border: '1px solid black'
        }} />
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {['U', 'D', 'F', 'B', 'L', 'R'].map(face => (
        <div key={face}>
          <div>{face}</div>
          {faceToGrid(face)}
        </div>
      ))}
    </div>
  );
}
