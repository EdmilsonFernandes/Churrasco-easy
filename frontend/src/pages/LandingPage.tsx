import React from 'react';
import '../styles/global.css';

export const LandingPage: React.FC = () => (
  <div>
    <header className="header">
      <div>
        <strong>Churrasco SaaS</strong>
        <p>Crie o seu site de pedidos em minutos.</p>
      </div>
      <button>Criar minha loja</button>
    </header>
    <main style={{ padding: '16px' }}>
      <h1>Seu negócio, sua identidade</h1>
      <p>Cadastre-se, personalize cores e logo, publique seu cardápio e receba pedidos online.</p>
    </main>
  </div>
);

export default LandingPage;
