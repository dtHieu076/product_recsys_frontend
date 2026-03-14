import axiosClient from './axiosClient';
import { User } from '../types/type';
import { mockUsers } from '../data/mockData';

const useMockData = true;

export const login = async (username: string, password?: string): Promise<User> => {
  if (useMockData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find((u) => u.username === username);
        if (user) {
          resolve(user);
        } else {
          reject(new Error('Invalid username or password'));
        }
      }, 500);
    });
  }
  const response = await axiosClient.post('/auth/login', { username, password });
  return response.data;
};
