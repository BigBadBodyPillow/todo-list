import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { api } from '../api';

//css
import '../Styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage('All fields are required');
      return;
    }

    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setErrorMessage(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <main className="form-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Gmail"
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
      <p className="register-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </main>
  );
}
