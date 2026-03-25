export interface User {
  user_id: number;
  username: string;
}

export interface Category {
  category_id: number;
  name: string;
}

export interface Product {
  product_id: number;
  product_name: string;
  brand: string;
  price: number;
  image_url: string;
  category_id: number;
  description: string;
  category_code?: string;
  confidence_score?: number;
  prediction_confidence?: number;
  isInteracted?: boolean;

}

export interface HistoryItem {
  category: string;
  view: number;
  click: number;
  addToCart: number;
}

export interface ModelComparisonResponse {
  historyData: HistoryItem[];
  modelA: Product[];
  modelB: Product[];
  modelC: Product[];
}

export interface Event {
  user_id: number;
  product_id: number;
  event_type: "view" | "cart" | "remove_from_cart" | "purchase";
  user_session: string;
  event_time?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Recommendation {
  product_id: number;
  score: number;
}

export interface PaginatedResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}
