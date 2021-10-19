import { useState, useCallback } from 'react';

export default function useWizard() {
  const [statesCount, setStatesCount] = useState(3);
  const [elements, setElements] = useState([
    { id: 0, moves: [0], initialState: 0 },
    { id: 1, moves: [1], initialState: 0 },
  ]);

  const setElementsCount = useCallback((elementsCount) => {
    setElements(
      Array.from({ length: elementsCount }, (_, i) => ({
        id: i,
        moves: [i],
        initialState: 0,
      }))
    );
  }, []);

  const setElementState = useCallback((elementId, initialState) => {
    setElements((prev) =>
      prev.map((el) => (el.id === elementId ? { ...el, initialState } : el))
    );
  }, []);

  const toggleElementMoves = useCallback(
    (elementId, elementToMove, hasToMove) => {
      setElements((prev) =>
        prev.map((el) => {
          if (el.id !== elementId) {
            return el;
          }

          const moves = el.moves.filter((m) => m !== elementToMove);
          if (hasToMove) {
            moves.push(elementToMove);
          }

          return { ...el, moves };
        })
      );
    },
    []
  );

  return {
    statesCount,
    elements,
    setStatesCount,
    setElementsCount,
    setElementState,
    toggleElementMoves,
  };
}
