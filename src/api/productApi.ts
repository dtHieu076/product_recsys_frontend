import axiosClient from './axiosClient';
import { Product, PaginatedResponse } from '../types/type';
import { mockProducts } from '../data/mockData';

const useMockData = false;

export const getProducts = async (): Promise<Product[]> => {
  if (useMockData) {
    return new Promise((resolve) => setTimeout(() => resolve(mockProducts), 300));
  }
  const response = await axiosClient.get('/products');
  return response.data;
};

export const getProductsPaginated = async (page: number, limit: number = 12): Promise<PaginatedResponse> => {
  if (useMockData) {
    const total = mockProducts.length;
    const start = (page - 1) * limit;
    const products = mockProducts.slice(start, start + limit);
    return Promise.resolve({ products, total, page, limit });
  }
  const response = await axiosClient.get(`/products?page=${page}&limit=${limit}`);
  return response.data;
};

export const getProductById = async (id: number): Promise<Product | undefined> => {
  if (useMockData) {
    return new Promise((resolve) => {
      const product = mockProducts.find((p) => p.product_id === id);
      setTimeout(() => resolve(product), 300);
    });
  }
  const response = await axiosClient.get(`/products/${id}`);
  return response.data;
};
