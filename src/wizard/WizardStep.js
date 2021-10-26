import React, { useContext, useMemo } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import NavigateNextOutlined from '@mui/icons-material/NavigateNextOutlined';
import ActionBox from '../shared/ActionBox';
import ThemeContext from '../shared/ThemeContext';
import styles from './WizardStep.styles';

function WizardStepContent(props) {
  const { step, activeStep, stepComponent, moveTo, wizard } = props;
  const future = useMemo(() => activeStep < step, [activeStep, step]);
  const active = useMemo(() => activeStep === step, [activeStep, step]);
  const next = useMemo(() => activeStep + 1 === step, [activeStep, step]);
  const smallStyle = useContext(ThemeContext);

  if (smallStyle && !active) {
    return null;
  }

  if (next) {
    return (
      <Box sx={styles.containerBox}>
        <Button sx={{ height: '100%' }} onClick={() => moveTo(activeStep + 1)}>
          <NavigateNextOutlined sx={{ height: '100%', width: '100%' }} />
        </Button>
      </Box>
    );
  }

  if (future) {
    return <Box sx={styles.containerBox}></Box>;
  }

  return (
    <ActionBox
      onClick={() => moveTo(step)}
      Icon={NavigateBeforeOutlinedIcon}
      buttonEnabled={!active}
    >
      {stepComponent({ wizard, active })}
    </ActionBox>
  );
}

export default function WizardStep(props) {
  const { stepsWidth } = props;
  const smallStyle = useContext(ThemeContext);

  return smallStyle ? (
    <WizardStepContent {...props} />
  ) : (
    <Box sx={{ flex: `1 1 ${stepsWidth}%` }}>
      <WizardStepContent {...props} />
    </Box>
  );
}
