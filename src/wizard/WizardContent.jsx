import { useContext } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Box from '@mui/material/Box';
import ThemeContext from '../shared/ThemeContext';

export default function WizardContent(props) {
  const { activeStep, setActiveStep, children } = props;
  const smallStyle = useContext(ThemeContext);

  return smallStyle ? (
    <SwipeableViews
      index={activeStep}
      enableMouseEvents
      onChangeIndex={(idx) => setActiveStep(idx)}
    >
      {children}
    </SwipeableViews>
  ) : (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>{children}</Box>
  );
}
