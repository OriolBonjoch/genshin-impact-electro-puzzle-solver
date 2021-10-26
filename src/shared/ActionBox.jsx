import React, { useMemo, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ThemeContext from './ThemeContext';
import styles from './ActionBox.styles';

export default function ActionBox(props) {
  const { buttonEnabled, onClick, Icon, children, iconColor } = props;
  const smallStyle = useContext(ThemeContext);
  const iconStyle = useMemo(
    () => ({
      ...styles.iconBase,
      ':hover': { color: iconColor ? `${iconColor}66` : '#1976d266' },
    }),
    [iconColor]
  );

  const containerStyle = useMemo(
    () =>
      smallStyle
        ? {
            ...styles.containerBase,
            marginBottom: '3rem',
            minHeight: 'calc(100vh - 7rem)',
          }
        : { ...styles.containerBase, height: '100%' },
    [smallStyle]
  );

  return (
    <Box sx={containerStyle}>
      {children}
      {buttonEnabled && (
        <Button variant="text" sx={styles.button} onClick={onClick}>
          <Icon sx={iconStyle} />
        </Button>
      )}
    </Box>
  );
}
