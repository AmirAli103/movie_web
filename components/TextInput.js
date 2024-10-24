import { TextField } from '@mui/material';

export default function TextInput({ id, label, name, value, onChange, error, helperText }) {
  const styles = {
    inputLabel: {
      color: 'white',
    },
    inputProps: {
      color: 'white',
      background: '#224957',
      borderRadius: '10px',
      fontFamily: 'Montserrat',
      fontSize: 14,
      fontWeight: 400,
      lineHeight: '24px',
    },
  };

  return (
    <TextField
      margin="normal"
      fullWidth
      id={id}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={helperText}
      InputLabelProps={{ style: styles.inputLabel }}
      InputProps={{
        sx: styles.inputProps,
      }}
    />
  );
}
