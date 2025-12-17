import React, { useState } from 'react';
import { apiFetch } from '../services/api';
import '../styles/global.css';

export const Register: React.FC = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    storeName: '',
    logoUrl: '',
    primaryColor: '#c0392b',
    secondaryColor: '#f39c12',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    document.documentElement.style.setProperty('--primary-color', form.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', form.secondaryColor);
  };

  const submit = async () => {
    await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(form),
    });
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Cadastre sua loja</h2>
      <div className="grid">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            value={(form as any)[key]}
            onChange={handleChange}
          />
        ))}
      </div>
      <button onClick={submit}>Criar loja</button>
    </div>
  );
};

export default Register;
