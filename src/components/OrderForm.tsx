'use client';

import { useState, useEffect } from 'react';
import { CartItem, Product } from '@/types';
import { api } from '@/utils/api';
import { storage } from '@/utils/storage';
import { maskPhone, isPhoneValid, formatPhone } from '@/utils/phone';
import './order-form.css';

interface OrderFormProps {
  cart: CartItem[];
  products: Product[];
  onOrderSuccess: () => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({
                                                      cart,
                                                      products,
                                                      onOrderSuccess
                                                    }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setPhone(storage.getPhone());
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = maskPhone(e.target.value);
    setPhone(maskedValue);
    storage.setPhone(formatPhone(e.target.value));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPhoneValid(phone)) {
      setError('Введите корректный номер телефона');
      return;
    }

    if (cart.length === 0) {
      setError('Корзина пуста');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.createOrder({
        phone: formatPhone(phone),
        cart
      });

      if (response.success) {
        onOrderSuccess();
      } else {
        setError(response.error || 'Ошибка при оформлении заказа');
      }
    } catch {
      setError('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  const getProductPrice = (productId: number) => {
    const product = products.find(p => p.id === productId);
    return product ? product.price : 0;
  };

  const getProductName = (productId: number) => {
    const product = products.find(p => p.id === productId);
    return product ? product.title : `товар ${productId}`;
  };

  return (
    <div className="order-form">
      <div className="cart-items">
        <h3 className="block-title">Добавленные товары</h3>
        {cart.map((item) => {
          const price = getProductPrice(item.id);
          const name = getProductName(item.id);
          return (
            <div key={item.id} className="cart-item">
              <span className="name">{name}</span>
              <span>x{item.quantity} {(price * item.quantity).toLocaleString()}₽</span>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="+7 (___) ___-__-__"
            className={error ? 'error' : ''}
          />
          <button
            type="submit"
            disabled={loading || cart.length === 0}
            className="submit-btn"
          >
            {loading ? 'отправка...' : 'заказать'}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};
