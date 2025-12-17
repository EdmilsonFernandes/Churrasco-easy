import React, { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';
import '../styles/global.css';

interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;
  imageUrl?: string;
}

export const AdminDashboard: React.FC<{ storeId: string }> = ({ storeId }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    apiFetch(`/stores/${storeId}/products`).then(setProducts);
  }, [storeId]);

  return (
    <div style={{ padding: 16 }}>
      <header className="header">
        <div>
          <h2>Configurações da loja</h2>
          <p>Gerencie identidade visual e cardápio.</p>
        </div>
        <button>Fechar loja</button>
      </header>
      <section>
        <h3>Produtos</h3>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - R$ {product.price}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
