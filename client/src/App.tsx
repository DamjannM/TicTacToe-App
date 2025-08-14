import Login from './components/Login.tsx';
import SignUp from './components/SignUp.tsx';
import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <div className="text-center text-xl font-semibold">
        Tic-Tac-Toe
        <Login token={token} />
        <SignUp token={token} />
      </div>
      <div>
        <h1>Frontend + Backend</h1>
        <p>{message}</p>
      </div>
    </>
  );
}
export default App;
