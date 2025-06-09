import { CartItem } from '@/types';

export const storage = {
  getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    } catch {
      return [];
    }
  },

  setCart(cart: CartItem[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('cart', JSON.stringify(cart));
  },

  getPhone(): string {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('phone') || '';
  },

  setPhone(phone: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('phone', phone);
  }
};