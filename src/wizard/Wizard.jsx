import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const stepsWidth = useMemo(() => Math.floor(100 / steps.length), []);

  return (
    <Box sx={{ width: '100%' }}>
      <WizardHeader
        activeStep={activeStep}
        smallStyle={!matches}
        steps={steps}
      />
      <WizardContent
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        smallStyle={!matches}
      >
        {steps.map((step, i) => (
          <WizardStep
            key={i}
            step={i}
            smallStyle={!matches}
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
        smallStyle={!matches}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        totalSteps={steps.length}
      />
    </Box>
  );
}
