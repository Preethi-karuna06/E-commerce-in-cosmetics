import { styled } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';

export const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#e6d4c3',
    },
    '&:hover fieldset': {
      borderColor: '#b37c42',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#b37c42',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#b37c42',
  },
});

export const SocialButton = styled(Button)({
  borderColor: '#e6d4c3',
  color: '#666',
  textTransform: 'none',
  padding: '10px 20px',
  width: '100%',
  marginBottom: '10px',
  '&:hover': {
    borderColor: '#b37c42',
    backgroundColor: 'rgba(179, 124, 66, 0.04)',
  },
});

export const SignInButton = styled(Button)({
  backgroundColor: '#b37c42',
  color: 'white',
  padding: '12px 0',
  '&:hover': {
    backgroundColor: '#91581a',
  },
});

export const formFieldStyles = {
  height: '80px',
  marginBottom: 2,
  width: '100%',
};
