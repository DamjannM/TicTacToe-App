import { Box, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

interface ChildProps {
  token: string;
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<ChildProps> = ({
  token,
  setIsRegistered,
  setIsLogedIn,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverMessage, setServerMessage] = useState('');
  const handleRegister = () => {
    setIsRegistered(false);
  };

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
      const data = await response.json();
      setEmail('');
      setPassword('');
      if (!response.ok) {
        setServerMessage(`❌ ${data.message}`);
        throw new Error(`Server error: ${response.status}`);
      }

      if (data.token) {
        token = data.token;
        localStorage.setItem('token', token);
      } else {
        throw Error('❌ Failed to authenticate...');
      }
      setIsLogedIn(true);
    } catch (err) {
      console.log('Login failed', err);
      // setServerMessage(String(err));
    }
  };
  return (
    <Box sx={{ pt: 20 }}>
      <Typography variant="subtitle2">{serverMessage}</Typography>
      <TextField
        label="email"
        size="small"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
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
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
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

      <Button variant="outlined" onClick={handleLogin} size="large">
        Login
      </Button>
      <Typography variant="subtitle2">Dont have an account yet? </Typography>
      <Button onClick={handleRegister} size="large">
        Register
      </Button>
    </Box>
  );
};

export default Login;
