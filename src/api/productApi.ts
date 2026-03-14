import axiosClient from './axiosClient';
import { Product } from '../types/type';
import { mockProducts } from '../data/mockData';

const useMockData = true;

export const getProducts = async (): Promise<Product[]> => {
  if (useMockData) {
    return new Promise((resolve) => setTimeout(() => resolve(mockProducts), 300));
  }
  const response = await axiosClient.get('/products');
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
