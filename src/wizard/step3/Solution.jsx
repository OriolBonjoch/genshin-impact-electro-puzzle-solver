import React, { useEffect, useState, useCallback } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import UnCheckedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckedIcon from '@mui/icons-material/CheckBoxOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PlayIcon from '@mui/icons-material/PlayArrowOutlined';
import useSolutionSolver from './solution.hook';
import ActionBox from '../../shared/ActionBox';
import { red } from '@mui/material/colors';

const cardStyle = {
  m: 2,
  height: '100%',
  boxShadow: 0,
  backgroundColor: 'transparent',
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
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

function Solution(props) {
  const { wizard } = props;
  const { elements, statesCount } = wizard;
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
    }, 1000);
  }, [elements, calculateMove, hits]);

  return (
    <ActionBox
      onClick={() => play(step)}
      Icon={PlayIcon}
      enabled={!hits && result[0] !== '-'}
      iconColor={red[700]}
    >
      {result.map((elResult, id) => {
        const fontStyle = { fontWeight: 'bold' };
        const checkIcon = elChecked[id] ? <CheckedIcon /> : <UnCheckedIcon />;
        return (
          <Card key={id} sx={cardStyle}>
            <CardContent sx={cardContentStyle}>
              <Box sx={alignVertically}>
                <Typography variant="h2" sx={fontStyle}>
                  {elState[id]}
                </Typography>
                {checkIcon}
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
    </ActionBox>
  );
}

export const step = {
  label: 'Calcular solución',
  Component: (props) => <Solution {...props} />,
};