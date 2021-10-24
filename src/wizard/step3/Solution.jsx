import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PlayIcon from '@mui/icons-material/PlayArrowSharp';
import useSolutionSolver from './solution.hook';
import ActionBox from '../../shared/ActionBox';
import { red } from '@mui/material/colors';
import ElementImage from '../../shared/ElementImage';

const cardHiddenStyle = {
  m: 2,
  height: '100%',
  boxShadow: 0,
  backgroundColor: 'transparent',
};

const cardShownStyle = {
  m: 2,
  height: '100%',
  backgroundColor: '#FFFFFF',
  backgroundImage: `
    linear-gradient(60deg, transparent 50%, #6666FF 50%),
    linear-gradient(120deg, transparent 50%, #6666FF 50%)`,
  transition: 'padding 0.2s ease',
};

const cardContentStyle = {
  p: 0,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  height: '100%',
};

const alignVertically = {
  p: 0,
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

function Solution(props) {
  const { wizard, smallStyle } = props;
  const { elements, statesCount } = wizard;
  const [elState, setElState] = useState(elements.map((el) => el.initialState));
  const [elChecked, setElChecked] = useState(elements.map((_) => false));
  const [hits, setHits] = useState(null);
  const [result, setResult] = useState([]);
  const { solve, calculateMove, calculateChecked } = useSolutionSolver(
    elements,
    statesCount
  );

  // const cardContentStyle = useMemo(
  //   () =>
  //     smallStyle
  //       ? { ...cardContentStyleBase, marginTop: '1.5rem' }
  //       : cardContentStyleBase,
  //   [smallStyle]
  // );

  const cardStyle = useMemo(
    () => (smallStyle ? cardShownStyle : cardHiddenStyle),
    [smallStyle]
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

    setTimeout(() => {
      const moveId = hits.findIndex((el) => el > 0);
      if (moveId === -1) {
        setTimeout(() => {
          setHits(null);
          setElState(elements.map((el) => el.initialState));
        }, 5000);
        return;
      }

      setElState((prev) => calculateMove(prev, moveId));
      setHits((prev) => prev.map((hit, i) => (moveId === i ? hit - 1 : hit)));
    }, 500);
  }, [elements, calculateMove, hits]);

  return (
    <ActionBox
      onClick={() => play()}
      Icon={PlayIcon}
      buttonEnabled={!smallStyle && !hits && result[0] !== '-'}
      iconColor={red[700]}
    >
      {result.map((elResult, id) => {
        const fontStyle = { fontWeight: 'bold' };
        return (
          <Card key={id} sx={cardStyle} raised={smallStyle}>
            <CardContent sx={cardContentStyle}>
              <Box sx={alignVertically}>
                <ElementImage
                  style={{ margin: '1rem' }}
                  total={statesCount}
                  highlighted={elChecked[id]}
                  selected={elState[id]}
                />
              </Box>
              <Box sx={alignVertically}>
                <Typography variant="h2" sx={fontStyle}>
                  {hits ? `${hits[id] ? hits[id] : '-'}` : elResult}
                </Typography>
                <Typography variant="h5">hits ({elResult})</Typography>
              </Box>
            </CardContent>
          </Card>
        );
      })}
      {smallStyle && (
        <Button
          color="secondary"
          variant="contained"
          sx={{ m: 2 }}
          onClick={() => play()}
          disabled={!!hits || !result || result[0] === '-'}
        >
          <PlayIcon sx={{ fontSize: 32 }} />
        </Button>
      )}
    </ActionBox>
  );
}

export const step = {
  label: 'Calcular solución',
  Component: (props) => <Solution {...props} />,
};
