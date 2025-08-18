import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

type UserData = {
  email: string;
  password: string;
};
interface ChildProps {
  token: string;
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<ChildProps> = ({ token, setIsRegistered }) => {
  const [user, setUser] = useState<UserData>({ email: '', password: '' });
  const handleRegister = () => {
    setIsRegistered(true);
  };

  const signUp = async () => {
    const response = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
    const data = await response.json();
    if (data.token) {
      token = data.token;
      localStorage.setItem('token', token);
    } else {
      throw Error('❌ Failed to authenticate...');
    }
    handleRegister();
  };
  return (
    <Box sx={{ pt: 20 }}>
      <TextField
        label="email"
        size="small"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        sx={{
          input: { color: 'white' },
          label: { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': { borderColor: '#3f50b5' },
            '&:hover fieldset': {
              borderColor: '#3f50b5',
            },
            '& fieldset': {
              borderColor: '#3f50b5',
            },
          },
        }}
      />

      <TextField
        label="password"
        type="password"
        size="small"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        sx={{
          input: { color: 'white' },
          label: { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': { borderColor: '#3f50b5' },
            '&:hover fieldset': {
              borderColor: '#3f50b5',
            },
            '& fieldset': {
              borderColor: '#3f50b5',
            },
          },
        }}
      />

      <Button variant="outlined" onClick={signUp} size="large">
        Sign Up
      </Button>
      <Typography variant="subtitle2">Already have an account? </Typography>
      <Button onClick={handleRegister} size="large">
        Login
      </Button>
    </Box>
  );
};

export default SignUp;
