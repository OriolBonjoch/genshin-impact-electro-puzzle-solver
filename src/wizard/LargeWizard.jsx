import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import WizardStep from './WizardStep';
import useWizard from './wizard.hook';
import step1 from './step1';
import step2 from './step2';
import step3 from './step3';

const steps = [step1, step2, step3];

export function LargeWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const wizard = useWizard();
  const stepsWidth = useMemo(() => Math.floor(100 / steps.length), []);

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => {
          return (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {steps.map((step, i) => {
            const { Component } = step;
            return (
              <Box key={i} sx={{ flex: `1 1 ${stepsWidth}%` }}>
                <WizardStep
                  step={i}
                  totalSteps={steps.length}
                  activeStep={activeStep}
                  stepComponent={Component}
                  moveTo={(n) => setActiveStep(n)}
                  wizard={wizard}
                />
              </Box>
            );
          })}
        </Box>
      </>
    </Box>
  );
}
