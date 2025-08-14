import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

type UserData = {
  email: string;
  password: string;
};
function SignUp({ token }: { token: string }) {
  const [user, setUser] = useState<UserData>({ email: '', password: '' });

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
  };
  return (
    <Box>
      <TextField
        label="email"
        size="small"
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
      />

      <TextField
        label="password"
        type="password"
        size="small"
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />

      <Button variant="outlined" onClick={signUp}>
        Sign Up
      </Button>
    </Box>
  );
}

export default SignUp;
