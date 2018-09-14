export const SlidingGameConfig = {
  blocks: 9 
};

export const getCorrectPuzzle = () => {
  return Array.from({length: 9})
    .fill(0)
    .map((piece, index) => index);
};
