import MobileStepper from '@mui/material/MobileStepper';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import NavigateNextOutlined from '@mui/icons-material/NavigateNextOutlined';
import Button from '@mui/material/Button';

export default function WizardFooter(props) {
  const { smallStyle, activeStep, setActiveStep, totalSteps } = props;
  if (!smallStyle) {
    return null;
  }
  return (
    <MobileStepper
      variant="dots"
      position="bottom"
      steps={totalSteps}
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
          disabled={activeStep >= totalSteps - 1}
        >
          <NavigateNextOutlined />
        </Button>
      }
    />
  );
}
