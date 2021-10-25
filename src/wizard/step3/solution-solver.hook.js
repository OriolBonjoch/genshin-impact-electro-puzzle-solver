import { useCallback } from 'react';

function* getMoves(elCount, stateCount, total, moves = null, j = 0) {
  if (!moves) moves = Array.from({ length: elCount }, () => 0);
  if (total === 0) {
    yield moves;
    return;
  }

  for (let i = j; i < elCount; i++) {
    if (moves[i] === stateCount) continue;
    yield* getMoves(
      elCount,
      stateCount,
      total - 1,
      moves.map((v, vi) => (i === vi ? v + 1 : v)),
      i
    );
  }
}

export default function useSolutionSolver(elements, puzzleStatesCount) {
  const validate = useCallback(
    (initialState, moves) => {
      let state = [...initialState];
      for (let i = 0; i < moves.length; i++) {
        state = elements[i].moves.reduce(
          (acc, cur) =>
            acc.map((c, j) =>
              j === cur ? (c + moves[i]) % puzzleStatesCount : c
            ),
          state
        );
      }

      return !state.some((el) => el !== state[0]);
    },
    [elements, puzzleStatesCount]
  );

  const solve = useCallback(
    (level = 0) => {
      if (level >= elements.length * puzzleStatesCount) return null;
      const initialState = elements.map((el) => el.initialState);
      for (const moves of getMoves(elements.length, puzzleStatesCount, level)) {
        if (validate(initialState, moves)) return moves;
      }

      return solve(level + 1);
    },
    [elements, puzzleStatesCount, validate]
  );

  const calculateMove = useCallback(
    (prevState, moveIdx) =>
      elements[moveIdx].moves.reduce(
        (acc, cur) =>
          acc.map((c, j) => (j === cur ? (c + 1) % puzzleStatesCount : c)),
        prevState
      ),
    [elements, puzzleStatesCount]
  );
  const calculateChecked = useCallback((elState) => {
    const repeats = {};
    let maxRepeats = 0;
    let maxValue = -1;
    for (const i in elState) {
      const cur = elState[i];
      repeats[cur] = repeats[cur] ? repeats[cur] + 1 : 1;
      if (maxRepeats < repeats[cur]) {
        maxRepeats = repeats[cur];
        maxValue = cur;
      }
    }

    return elState.map((el) => maxRepeats > 1 && el === maxValue);
  }, []);

  return { solve, calculateMove, calculateChecked };
}
