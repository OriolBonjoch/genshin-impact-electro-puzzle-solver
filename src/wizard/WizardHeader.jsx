import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export default function WizardHeader(props) {
  const { smallStyle, activeStep, steps } = props;
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
