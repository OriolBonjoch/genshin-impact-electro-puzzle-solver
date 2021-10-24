import { useState, useMemo } from 'react';
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@mui/material/MobileStepper';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import NavigateNextOutlined from '@mui/icons-material/NavigateNextOutlined';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import WizardStep from './WizardStep';
import useWizard from './wizard.hook';
import step1 from './step1';
import step2 from './step2';
import step3 from './step3';

const steps = [step1, step2, step3];

function WizardHeader(props) {
  const { smallStyle, activeStep } = props;
  return smallStyle ? (
    <Typography variant="h4" sx={{ m: 2 }}>
      {steps[activeStep].label}
    </Typography>
  ) : (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((step) => {
        return (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
}

function WizardContent(props) {
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

export function Wizard() {
  const [activeStep, setActiveStep] = useState(0);
  const wizard = useWizard();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const stepsWidth = useMemo(() => Math.floor(100 / steps.length), []);

  return (
    <Box sx={{ width: '100%' }}>
      <WizardHeader activeStep={activeStep} smallStyle={!matches} />
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
      {!matches && (
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
      )}
    </Box>
  );
}
