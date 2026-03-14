import axiosClient from './axiosClient';
import { Recommendation, Product } from '../types/type';
import { mockRecommendations, mockProducts } from '../data/mockData';

const useMockData = true;

export const getRecommendations = async (user_id: number): Promise<Product[]> => {
  if (useMockData) {
    return new Promise((resolve) => {
      const recs = mockRecommendations[user_id] || [];
      const recommendedProducts = recs
        .map((rec) => mockProducts.find((p) => p.product_id === rec.product_id))
        .filter((p): p is Product => p !== undefined);
      setTimeout(() => resolve(recommendedProducts), 500);
    });
  }
  const response = await axiosClient.get(`/recommendations/${user_id}`);
  return response.data;
};
