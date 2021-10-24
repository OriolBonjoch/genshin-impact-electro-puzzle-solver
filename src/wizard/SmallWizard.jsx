import { useState } from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import NavigateNextOutlined from '@mui/icons-material/NavigateNextOutlined';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';

import WizardStep from './WizardStep';
import useWizard from './wizard.hook';
import step1 from './step1';
import step2 from './step2';
import step3 from './step3';

const steps = [step1, step2, step3];

export function SmallWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const wizard = useWizard();

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" sx={{ m: 2 }}>
        {steps[activeStep].label}
      </Typography>
      <SwipeableViews
        index={activeStep}
        enableMouseEvents
        onChangeIndex={(idx) => setActiveStep(idx)}
      >
        {steps.map((step, i) => (
          <WizardStep
            key={i}
            smallStyle
            step={i}
            totalSteps={1}
            activeStep={activeStep}
            stepComponent={step.Component}
            moveTo={(n) => setActiveStep(n)}
            wizard={wizard}
          />
        ))}
      </SwipeableViews>
      <MobileStepper
        variant="dots"
        position="bottom"
        steps={steps.length}
        activeStep={activeStep}
        backButton={
          <Button
            size="medium"
            onClick={() => setActiveStep((prev) => prev - 1)}
            disabled={activeStep <= 0}
          >
            <NavigateBeforeOutlinedIcon />
          </Button>
        }
        nextButton={
          <Button
            size="medium"
            onClick={() => setActiveStep((prev) => prev + 1)}
            disabled={activeStep >= steps.length - 1}
          >
            <NavigateNextOutlined />
          </Button>
        }
      />
    </Box>
  );
}
