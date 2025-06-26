export class Cube {
  constructor() {
    this.faces = {
      U: Array(9).fill('W'), // Up: White
      D: Array(9).fill('Y'), // Down: Yellow
      F: Array(9).fill('G'), // Front: Green
      B: Array(9).fill('B'), // Back: Blue
      L: Array(9).fill('O'), // Left: Orange
      R: Array(9).fill('R')  // Right: Red
    };
  }

  rotate(face, clockwise = true) {
    const turns = clockwise ? 1 : 3;
    for (let i = 0; i < turns; i++) this._rotateFace(face);
  }

  _rotateFace(face) {
    const adjacent = {
      U: [['B', 0], ['R', 0], ['F', 0], ['L', 0]],
      D: [['F', 2], ['R', 2], ['B', 2], ['L', 2]],
      F: [['U', 2], ['R', 'col0'], ['D', 0], ['L', 'col2']],
      B: [['U', 0], ['L', 'col0'], ['D', 2], ['R', 'col2']],
      L: [['U', 'col0'], ['F', 'col0'], ['D', 'col0'], ['B', 'col2']],
      R: [['U', 'col2'], ['B', 'col0'], ['D', 'col2'], ['F', 'col2']],
    };

    const rows = (face, idx) => this.faces[face].slice(idx * 3, idx * 3 + 3);
    const cols = (face, idx) => [0, 1, 2].map(i => this.faces[face][i * 3 + idx]);

    const setRow = (face, idx, vals) => vals.forEach((v, i) => this.faces[face][idx * 3 + i] = v);
    const setCol = (face, idx, vals) => vals.forEach((v, i) => this.faces[face][i * 3 + idx] = v);

    // Rotate the face itself
    const f = this.faces[face];
    this.faces[face] = [
      f[6], f[3], f[0],
      f[7], f[4], f[1],
      f[8], f[5], f[2]
    ];

    // Rotate adjacent pieces
    const segments = adjacent[face].map(([f, pos]) => {
      if (typeof pos === 'number') return rows(f, pos);
      return cols(f, parseInt(pos.slice(-1)));
    });

    segments.unshift(segments.pop()); // Rotate edges
    adjacent[face].forEach(([f, pos], i) => {
      if (typeof pos === 'number') setRow(f, pos, segments[i]);
      else setCol(f, parseInt(pos.slice(-1)), segments[i]);
    });
  }

  scramble(moves = 20) {
    const faces = ['U', 'D', 'F', 'B', 'L', 'R'];
    const history = [];
    for (let i = 0; i < moves; i++) {
      const f = faces[Math.floor(Math.random() * 6)];
      const cw = Math.random() > 0.5;
      this.rotate(f, cw);
      history.push(`${f}${cw ? '' : "'"}`);
    }
    return history;
  }

  clone() {
    const c = new Cube();
    for (let face in this.faces) c.faces[face] = [...this.faces[face]];
    return c;
  }

  toString() {
    return JSON.stringify(this.faces, null, 2);
  }
}
