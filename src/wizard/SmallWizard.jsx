import { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import useWizard from './wizard.hook';
import step1 from './step1';
import step2 from './step2';
import step3 from './step3';

const steps = [step1, step2, step3];

function WizardButton(props) {
  const { onClick, disabled, content, variant } = props;
  return (
    <Button
      variant={variant || 'contained'}
      disabled={disabled}
      sx={{ width: '100%', m: 1 }}
      onClick={onClick}
    >
      {content}
    </Button>
  );
}

export function SmallWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const wizard = useWizard();

  return (
    <Stepper
      activeStep={activeStep}
      orientation="vertical"
      sx={{ width: '100%' }}
    >
      {steps.map((step, i) => {
        const { label, Component } = step;
        return (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  position: 'relative',
                }}
              >
                {Component({ wizard, active: true, smallStyle: true })}
              </Box>
              <Box
                sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}
              >
                <WizardButton
                  variant="outlined"
                  disabled={activeStep <= 0}
                  onClick={() => setActiveStep((prev) => prev - 1)}
                  content="Atrás"
                />
                <WizardButton
                  disabled={activeStep >= steps.length - 1}
                  onClick={() => setActiveStep(activeStep + 1)}
                  content="Siguiente"
                />
              </Box>
            </StepContent>
          </Step>
        );
      })}
    </Stepper>
  );
}
