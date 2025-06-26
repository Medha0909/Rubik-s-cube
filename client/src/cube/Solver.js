export function solveCube(scrambledCube, scrambleHistory = []) {
  const steps = [];
  const states = [scrambledCube.clone()];

  const reverseMoves = scrambleHistory.slice().reverse().map(move => {
    if (move.endsWith("'")) return move[0];
    else return move + "'";
  });

  const cube = scrambledCube.clone();
  reverseMoves.forEach(move => {
    const face = move[0];
    const clockwise = move.length === 1;
    cube.rotate(face, clockwise);
    steps.push({
      move,
      desc: `Rotate ${face} ${clockwise ? "Clockwise" : "Counter-clockwise"}`
    });
    states.push(cube.clone());
  });

  return { steps, states };
}
