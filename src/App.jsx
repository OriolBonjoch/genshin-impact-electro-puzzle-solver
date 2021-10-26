// import { createContext } from 'react';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { Wizard } from './wizard';
import ThemeContext from './shared/ThemeContext';

// const ThemeContext = createContext('light');

function App() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Container>
      <ThemeContext.Provider value={!matches}>
        <Wizard />
      </ThemeContext.Provider>
    </Container>
  );
}

export default App;
