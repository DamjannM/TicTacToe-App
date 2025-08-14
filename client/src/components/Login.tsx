import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

function Login({ token }: { token: string }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      if (data.token) {
        token = data.token;
        localStorage.setItem('token', token);
      } else {
        throw Error('❌ Failed to authenticate...');
      }
    } catch (err) {
      console.log('Login failed', err);
    }
  };
  return (
    <Box>
      <TextField
        label="email"
        size="small"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <TextField
        label="password"
        type="password"
        size="small"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Button variant="outlined" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
}

export default Login;
