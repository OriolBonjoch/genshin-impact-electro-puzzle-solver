import React, { useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function NewPuzzle(props) {
  const { active, wizard } = props;
  const { statesCount, elements, setStatesCount, setElementsCount } = wizard;

  // const [statesCount, setStatesCount] = useState(4);
  const elementsCount = useMemo(() => elements.length, [elements.length]);
  return (
    <Box
      sx={{
        flex: '1 1 auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TextField
        sx={{ m: 2 }}
        type="number"
        value={statesCount}
        disabled={!active}
        label="Cantidad Estados"
        InputProps={{ inputProps: { min: 2, max: 5 } }}
        onChange={(event) => {
          const value = Number.parseInt(event.target.value);
          if (Number.isInteger(value) && parseInt(value) > 0) {
            setStatesCount(value);
          }
        }}
      />
      <TextField
        sx={{ m: 2 }}
        type="number"
        value={elementsCount}
        disabled={!active}
        label="Cantidad elementos"
        InputProps={{ inputProps: { min: 2, max: 10 } }}
        onChange={(event) => {
          const value = Number.parseInt(event.target.value);
          if (Number.isInteger(value)) {
            setElementsCount(value);
          }
        }}
      />
    </Box>
  );
}

export const step = {
  label: 'Crear nuevo puzzle',
  Component: (props) => <NewPuzzle {...props} />,
};
