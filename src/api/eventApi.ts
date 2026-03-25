import axiosClient from './axiosClient';
import { Event } from '../types/type';
import { CategoryHistory } from '../types/history';

const useMockData = false;

export const logEvent = async (event: Event): Promise<void> => {
  // 1. Chuẩn hóa dữ liệu trước khi gửi
  const normalizedEvent = {
    ...event,
    // Ép chữ thường để tránh lỗi PostgreSQL Enum (CART -> cart)
    event_type: event.event_type.toLowerCase() as any,
    // Đảm bảo có timestamp chuẩn ISO
    event_time: event.event_time || new Date().toISOString(),
  };

  // 2. In log để kiểm tra dữ liệu thực tế sẽ gửi lên Server
  console.log('--- [API Debug: logEvent] ---');
  console.log('Payload gửi đi:', normalizedEvent);
  console.log('URL mục tiêu: /events/');

  if (useMockData) {
    console.log('[Mock Mode]: Không gửi về server.');
    return new Promise((resolve) => setTimeout(resolve, 100));
  }

  try {
    // 3. Thêm dấu "/" vào sau /events/ để tránh lỗi Redirect 307 & CORS
    const response = await axiosClient.post('/events/', normalizedEvent);
    console.log('Kết quả Server:', response.status, response.data);
  } catch (error: any) {
    console.error('Lỗi khi log event:');
    if (error.response) {
      // Server trả về lỗi (400, 500...)
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
    } else {
      // Lỗi kết nối hoặc CORS
      console.error('Message:', error.message);
    }
    throw error;
  }
};

export const getUserHistory = async (user_id: number): Promise<CategoryHistory[]> => {
  console.log(`Fetching history for user ${user_id}`);
  const response = await axiosClient.get(`/events/users/${user_id}/history`);
  return response.data;
};

