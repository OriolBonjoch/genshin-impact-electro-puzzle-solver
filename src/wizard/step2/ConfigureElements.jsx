import React, { useMemo, useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

const cardStyle = {
  m: 2,
  height: '100%',
  width: 'calc(100% - 2rem)',
};

const disabledCardStyle = {
  ...cardStyle,
  paddingRight: '100%',
  backgroundColor: '#FFFFFF',
  backgroundImage: `
    linear-gradient(70deg, transparent 72%, #6666FF 72%),
    linear-gradient(110deg, transparent 72%, #6666FF 72%)`,
  transition: 'padding 0.2s ease',
};

function ConfigureElements(props) {
  const { wizard, active } = props;
  const { statesCount, elements, setElementState, toggleElementMoves } = wizard;
  const [defaults] = useState(wizard.elements.map((el) => el.initialState));

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
            sx={active ? cardStyle : disabledCardStyle}
            raised
            style={{
              transition: 'margin 0.2s ease, padding 0.2s ease',
            }}
          >
            <CardContent>
              <Typography gutterBottom>Posición inicial</Typography>
              <Slider
                defaultValue={defaults[i]}
                disabled={!active}
                step={1}
                marks
                min={0}
                max={statesCount}
                aria-label="Posición inicial"
                valueLabelDisplay="auto"
                onChangeCommitted={(_, value) => setElementState(id, value)}
              />
              <Typography sx={{ marginTop: 3 }} gutterBottom>
                Piezas movidas
              </Typography>
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
