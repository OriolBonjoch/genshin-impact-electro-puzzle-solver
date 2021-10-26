import { useEffect, useState, useCallback } from 'react';
import useSolutionSolver from './solution-solver.hook';

export default function useSolution(elements, statesCount) {
  const [elState, setElState] = useState(elements.map((el) => el.initialState));
  const [elChecked, setElChecked] = useState(elements.map((_) => false));
  const [hits, setHits] = useState(null);
  const [result, setResult] = useState([]);
  const { solve, calculateMove, calculateChecked } = useSolutionSolver(
    elements,
    statesCount
  );

  const play = useCallback(() => {
    setElState(elements.map((el) => el.initialState));
    setHits([...result]);
  }, [elements, result]);

  useEffect(() => {
    if (!elState || elState.length === 0) {
      return;
    }

    setElChecked(calculateChecked(elState));
  }, [calculateChecked, elState]);

  useEffect(() => {
    const solution = solve();
    setResult(solution ?? elements.map((_) => '-'));
  }, [elements, solve]);

  useEffect(() => {
    if (!hits) {
      return;
    }

    let cancelationTimeout = setTimeout(() => {
      const moveId = hits.findIndex((el) => el > 0);
      if (moveId === -1) {
        cancelationTimeout = setTimeout(() => {
          setHits(null);
          setElState(elements.map((el) => el.initialState));
        }, 5000);
        return;
      }

      setElState((prev) => calculateMove(prev, moveId));
      setHits((prev) => prev.map((hit, i) => (moveId === i ? hit - 1 : hit)));
    }, 500);

    return () => clearTimeout(cancelationTimeout);
  }, [elements, calculateMove, hits]);

  return {
    elState,
    elChecked,
    hits,
    result,
    play,
  };
}
