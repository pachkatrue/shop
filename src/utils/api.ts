import { Review, ProductsResponse, OrderRequest, OrderResponse } from '@/types';

const API_BASE = 'http://o-complex.com:1337';

export const api = {
  async getReviews(): Promise<Review[]> {
    const response = await fetch(`${API_BASE}/reviews`);
    if (!response.ok) throw new Error('Failed to fetch reviews');
    return response.json();
  },

  async getProducts(page: number = 1, pageSize: number = 20): Promise<ProductsResponse> {
    const response = await fetch(`${API_BASE}/products?page=${page}&page_size=${pageSize}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async createOrder(orderData: OrderRequest): Promise<OrderResponse> {
    const response = await fetch(`${API_BASE}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  }
};