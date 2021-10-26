import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';

import WizardHeader from './WizardHeader';
import WizardContent from './WizardContent';
import WizardFooter from './WizardFooter';
import WizardStep from './WizardStep';
import useWizard from './wizard.hook';
import step1 from './step1';
import step2 from './step2';
import step3 from './step3';

const steps = [step1, step2, step3];

export function Wizard() {
  const [activeStep, setActiveStep] = useState(0);
  const wizard = useWizard();
  const stepsWidth = useMemo(() => Math.floor(100 / steps.length), []);

  return (
    <Box sx={{ width: '100%' }}>
      <WizardHeader activeStep={activeStep} steps={steps} />
      <WizardContent activeStep={activeStep} setActiveStep={setActiveStep}>
        {steps.map((step, i) => (
          <WizardStep
            key={i}
            step={i}
            stepsWidth={stepsWidth}
            totalSteps={steps.length}
            activeStep={activeStep}
            stepComponent={step.Component}
            moveTo={(n) => setActiveStep(n)}
            wizard={wizard}
          />
        ))}
      </WizardContent>
      <WizardFooter
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        totalSteps={steps.length}
      />
    </Box>
  );
}
