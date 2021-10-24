import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import NavigateNextOutlined from '@mui/icons-material/NavigateNextOutlined';
import ActionBox from '../shared/ActionBox';

const containerBox = {
  // marginBottom: '2rem',
  // minHeight: 'calc(100vh - 7rem)',
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  position: 'relative',
  pt: 3,
};

function WizardStepContent(props) {
  const { step, activeStep, stepComponent, moveTo, wizard, smallStyle } = props;
  const future = useMemo(() => activeStep < step, [activeStep, step]);
  const active = useMemo(() => activeStep === step, [activeStep, step]);
  const next = useMemo(() => activeStep + 1 === step, [activeStep, step]);

  if (smallStyle && !active) {
    return null;
  }

  if (next) {
    return (
      <Box sx={containerBox}>
        <Button sx={{ height: '100%' }} onClick={() => moveTo(activeStep + 1)}>
          <NavigateNextOutlined sx={{ height: '100%', width: '100%' }} />
        </Button>
      </Box>
    );
  }

  if (future) {
    return <Box sx={containerBox}></Box>;
  }

  return (
    <ActionBox
      onClick={() => moveTo(step)}
      Icon={NavigateBeforeOutlinedIcon}
      buttonEnabled={!active}
    >
      {stepComponent({ wizard, active, smallStyle })}
    </ActionBox>
  );
}

export default function WizardStep(props) {
  const { key, smallStyle, stepsWidth } = props;
  return smallStyle ? (
    <WizardStepContent key={key} {...props} />
  ) : (
    <Box key={key} sx={{ flex: `1 1 ${stepsWidth}%` }}>
      <WizardStepContent {...props} />
    </Box>
  );
}
