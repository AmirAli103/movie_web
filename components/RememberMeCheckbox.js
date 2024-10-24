import { Checkbox, FormControlLabel, Typography } from '@mui/material';

export default function RememberMeCheckbox({ checked, onChange, label }) {
  const styles = {
    checkbox: {
      color: '#224957',
      '&.Mui-checked': {
        color: '#224957',
      },
    },
    label: {
      color: 'white',
      fontSize: 16,
      fontWeight: 400,
      fontFamily: 'Montserrat',
    },
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          sx={styles.checkbox}
        />
      }
      label={<Typography sx={styles.label}>{label}</Typography>}
    />
  );
}
