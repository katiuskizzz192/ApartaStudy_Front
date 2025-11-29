export const LETTERS = ['B', 'I', 'N', 'G', 'O'];
export const RANGES = {
  B: [1, 15],
  I: [16, 30],
  N: [31, 45],
  G: [46, 60],
  O: [61, 75],
};

export const normalizeBall = input => {
  if (!input) return null;
  const cleaned = input.toString().trim().toUpperCase().replace(/\s+/g, '');
  const match = cleaned.match(/^([BINGO])\-?(\d{1,2})$/);
  if (!match) return null;
  const letter = match[1];
  const num = parseInt(match[2], 10);
  const [min, max] = RANGES[letter];
  if (num < min || num > max) return null;
  return `${letter}${num}`;
};

export const emptyCard = (id, number = 1) => ({
  id,
  number,
  cells: Array.from({length: 25}, (_, idx) => ({
    value: null,
    marked: idx === 12 ? true : false,
    isFree: idx === 12,
  })),
});

export const calculateProgress = card => {
  const totalMarkable = card.cells.filter(c => c.isFree || c.value !== null).length;
  const marked = card.cells.filter(c => c.marked).length;
  return totalMarkable === 0 ? 0 : Math.round((marked / totalMarkable) * 100);
};

export const evaluateCard = card => {
  const lines = [];
  const indices = card.cells.map((cell, idx) => ({...cell, idx}));
  // Rows
  for (let r = 0; r < 5; r++) {
    const row = indices.slice(r * 5, r * 5 + 5);
    if (row.every(c => c.marked)) lines.push({type: 'row', index: r});
  }
  // Cols
  for (let c = 0; c < 5; c++) {
    const col = [0, 1, 2, 3, 4].map(r => indices[r * 5 + c]);
    if (col.every(cell => cell.marked)) lines.push({type: 'column', index: c});
  }
  // Diagonals
  const diag1 = [0, 6, 12, 18, 24].map(i => indices[i]);
  if (diag1.every(c => c.marked)) lines.push({type: 'diagonal', index: 1});
  const diag2 = [4, 8, 12, 16, 20].map(i => indices[i]);
  if (diag2.every(c => c.marked)) lines.push({type: 'diagonal', index: 2});
  const completed = lines.length > 0 && card.cells.every(c => c.marked);
  return {lines, completed};
};

export const markBallOnCard = (card, normalizedBall) => {
  const letter = normalizedBall[0];
  const number = parseInt(normalizedBall.slice(1), 10);
  const colIndex = LETTERS.indexOf(letter);
  let updated = false;
  const newCells = card.cells.map((cell, idx) => {
    const row = Math.floor(idx / 5);
    const col = idx % 5;
    if (col === colIndex && cell.value === number) {
      updated = true;
      return {...cell, marked: true};
    }
    return cell;
  });
  const newCard = {...card, cells: newCells};
  return {card: newCard, changed: updated};
};

export const sortCardsByProgress = cards => {
  return [...cards].sort((a, b) => calculateProgress(b) - calculateProgress(a));
};

export const generateBingoBoard = drawn => {
  const board = LETTERS.map(letter => ({
    letter,
    numbers: Array.from({length: RANGES[letter][1] - RANGES[letter][0] + 1}, (_, i) => {
      const num = RANGES[letter][0] + i;
      const key = `${letter}${num}`;
      return {label: key, drawn: drawn.includes(key)};
    }),
  }));
  return board;
};

export const duplicateCard = card => ({
  ...card,
  id: Date.now().toString(),
  number: card.number + 1,
  cells: card.cells.map(c => ({...c})),
});
