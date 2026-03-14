import axiosClient from './axiosClient';
import { Event } from '../types/type';

const useMockData = false;

export const logEvent = async (event: Event): Promise<void> => {
  if (useMockData) {
    console.log('[Mock Event Logged]:', event);
    return new Promise((resolve) => setTimeout(resolve, 100));
  }
  await axiosClient.post('/events', event);
};
