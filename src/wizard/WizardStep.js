import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import NavigateNextOutlined from '@mui/icons-material/NavigateNextOutlined';
import ActionBox from '../shared/ActionBox';

const containerBox = {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  position: 'relative',
  pt: 3,
};

export default function WizardStep(props) {
  const { step, activeStep, stepComponent, moveTo, wizard } = props;
  const future = useMemo(() => activeStep < step, [activeStep, step]);
  const active = useMemo(() => activeStep === step, [activeStep, step]);
  const next = useMemo(() => activeStep + 1 === step, [activeStep, step]);

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
      {stepComponent({ wizard, active })}
    </ActionBox>
  );
}
