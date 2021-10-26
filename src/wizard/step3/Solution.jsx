import React, { useContext, useMemo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PlayIcon from '@mui/icons-material/PlayArrowSharp';
import { red } from '@mui/material/colors';

import useSolution from './solution.hook';
import ActionBox from '../../shared/ActionBox';
import ElementImage from '../../shared/ElementImage';
import styles from './Solution.styles';
import ThemeContext from '../../shared/ThemeContext';

function Solution(props) {
  const { wizard } = props;
  const { elements, statesCount } = wizard;
  const smallStyle = useContext(ThemeContext);
  const { elState, elChecked, hits, result, play } = useSolution(
    elements,
    statesCount
  );

  const cardContentStyle = useMemo(
    () => ({ ...styles.cardContentBase, p: smallStyle ? 3 : 0 }),
    [smallStyle]
  );

  const cardStyle = useMemo(
    () => (smallStyle ? styles.cardShown : styles.cardHidden),
    [smallStyle]
  );

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
              <Box sx={styles.alignVertically}>
                <ElementImage
                  style={{ margin: '1rem' }}
                  total={statesCount}
                  highlighted={elChecked[id]}
                  selected={elState[id]}
                />
              </Box>
              <Box sx={styles.alignVertically}>
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
