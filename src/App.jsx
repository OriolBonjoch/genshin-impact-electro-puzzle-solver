import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { LargeWizard } from './wizard';
import { SmallWizard } from './wizard/SmallWizard';

function App() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  return <Container>{matches ? <LargeWizard /> : <SmallWizard />}</Container>;
}

export default App;
