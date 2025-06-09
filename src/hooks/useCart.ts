import { useState, useEffect } from 'react';
import { CartItem, Product } from '@/types';
import { storage } from '@/utils/storage';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(storage.getCart());
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    storage.setCart(newCart);
  };

  const addToCart = (productId: number, quantity: number = 1) => {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
      updateCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0));
    } else if (quantity > 0) {
      updateCart([...cart, { id: productId, quantity }]);
    }
  };

  const removeFromCart = (productId: number) => {
    updateCart(cart.filter(item => item.id !== productId));
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = (products: Product[]) => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const clearCart = () => {
    updateCart([]);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
    clearCart
  };
};