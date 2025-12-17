import React, { useState } from 'react';
import { apiFetch } from '../services/api';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Entrar</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={submit}>Login</button>
    </div>
  );
};

export default Login;
