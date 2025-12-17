import React, { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';
import '../styles/global.css';

interface Store {
  id: string;
  name: string;
  slug: string;
  isOpen: boolean;
  settings: { logoUrl?: string; primaryColor: string; secondaryColor?: string };
}

interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;
  imageUrl?: string;
}

export const StorePage: React.FC<{ slug: string }> = ({ slug }) => {
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    apiFetch(`/stores/${slug}`).then((data) => {
      setStore(data);
      if (data?.settings?.primaryColor) document.documentElement.style.setProperty('--primary-color', data.settings.primaryColor);
      if (data?.settings?.secondaryColor) document.documentElement.style.setProperty('--secondary-color', data.settings.secondaryColor);
      apiFetch(`/stores/${data.id}/products`).then(setProducts);
    });
  }, [slug]);

  if (!store) return <p>Carregando...</p>;

  return (
    <div>
      <header className="header">
        <div>
          {store.settings.logoUrl && <img src={store.settings.logoUrl} alt={store.name} style={{ height: 48 }} />}
          <h1>{store.name}</h1>
          <span>{store.isOpen ? 'Aberto' : 'Fechado'}</span>
        </div>
      </header>
      <main style={{ padding: 16 }}>
        <ul>
          {products.map((product) => (
            <li key={product.id} style={{ marginBottom: 8 }}>
              <strong>{product.name}</strong> - R$ {product.price}
              <button style={{ marginLeft: 8 }}>+</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default StorePage;
