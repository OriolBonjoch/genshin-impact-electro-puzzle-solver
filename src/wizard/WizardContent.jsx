import SwipeableViews from 'react-swipeable-views';
import Box from '@mui/material/Box';

export default function WizardContent(props) {
  const { activeStep, setActiveStep, smallStyle, children } = props;
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
