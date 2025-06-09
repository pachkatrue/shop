'use client';

import { useState } from 'react';
import { Product } from '@/types';
import Image from 'next/image';
import './product-card.css';

interface ProductCardProps {
  product: Product;
  cartQuantity: number;
  onAddToCart: (quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
                                                          product,
                                                          cartQuantity,
                                                          onAddToCart,
                                                        }) => {
  const [quantity, setQuantity] = useState(cartQuantity || 1);
  const [imageError, setImageError] = useState(false);

  const handleBuyClick = () => {
    onAddToCart(1);
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      onAddToCart(newQuantity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    handleQuantityChange(value);
  };

  return (
    <div className="product-card">
      <div className="image-wrapper">
        {!imageError ? (
          <Image
            src={product.image_url}
            alt={product.title}
            width={400}
            height={300}
            onError={() => setImageError(true)}
          />
        ) : (
          <div>
            <svg width="64" height="64" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="content">
        <h3 className="title">{product.title}</h3>
        <p className="description">{product.description}</p>
        <div className="price">цена: {product.price.toLocaleString()}₽</div>

        {cartQuantity === 0 ? (
          <button onClick={handleBuyClick} className="buy-button">
            купить
          </button>
        ) : (
          <div className="quantity-controls">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="quantity-button"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={handleInputChange}
              className="quantity-input"
              min="0"
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="quantity-button"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
