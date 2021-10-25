import React, { useMemo } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ElementImage from '../../shared/ElementImage';
import styles from './ConfigureElements.styles';

function ConfigureElements(props) {
  const { wizard, active } = props;
  const { statesCount, elements, setElementState, toggleElementMoves } = wizard;

  const buttons = useMemo(
    () => Array.from({ length: elements.length }, (_, i) => i),
    [elements.length]
  );

  return (
    <>
      {elements.map((element, i) => {
        const { id, moves } = element;
        return (
          <Card
            key={id}
            sx={active ? styles.card : styles.disabledCard}
            raised
            style={{
              transition: 'margin 0.2s ease, padding 0.2s ease',
            }}
          >
            <CardContent>
              <Typography gutterBottom>Posición inicial</Typography>
              <ElementImage
                style={{
                  ...styles.image,
                  visibility: active ? 'visible' : 'hidden',
                }}
                total={statesCount}
                selected={element.initialState}
                onClick={() =>
                  setElementState(id, (element.initialState + 1) % statesCount)
                }
              />
              <Typography gutterBottom>Piezas movidas</Typography>
              <ButtonGroup size="large" color="primary">
                {buttons.map((b) => {
                  const checked = moves.includes(b);
                  return (
                    <Button
                      key={b}
                      disabled={!active}
                      variant={checked ? 'contained' : 'outlined'}
                      onClick={() => toggleElementMoves(id, b, !checked)}
                    >
                      {b}
                    </Button>
                  );
                })}
              </ButtonGroup>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}

export const step = {
  label: 'Configurar piezas',
  Component: (props) => <ConfigureElements {...props} />,
};
