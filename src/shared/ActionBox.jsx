import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const containerStyle = {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  position: 'relative',
};

const iconBaseStyle = {
  height: '100%',
  width: '100%',
  position: 'absolute',
  bottom: '0',
};

const buttonStyle = {
  height: '100%',
  width: '100%',
  position: 'absolute',
  color: 'transparent',
};

export default function ActionBox(props) {
  const { buttonEnabled, onClick, Icon, children, iconColor } = props;
  const iconStyle = useMemo(
    () => ({
      ...iconBaseStyle,
      ':hover': { color: iconColor ? `${iconColor}66` : '#1976d266' },
    }),
    [iconColor]
  );

  return (
    <Box sx={containerStyle}>
      {children}
      {buttonEnabled && (
        <Button variant="text" sx={buttonStyle} onClick={onClick}>
          <Icon sx={iconStyle} />
        </Button>
      )}
    </Box>
  );
}
