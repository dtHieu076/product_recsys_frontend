import { User, Product, Category, Recommendation } from '../types/type';

export const mockUsers: User[] = [
  { user_id: 520088904, username: 'nguyenvana' },
  { user_id: 530496790, username: 'tranthib' },
  { user_id: 100000001, username: 'demouser1' },
];

export const mockCategories: Category[] = [
  { category_id: 1, name: 'Electronics' },
  { category_id: 2, name: 'Accessories' },
  { category_id: 3, name: 'Home' },
];

export const mockProducts: Product[] = [
  {
    product_id: 101,
    name: 'Wireless Noise-Canceling Headphones',
    brand: 'AuraSound',
    price: 149.99,
    image_url: 'https://picsum.photos/seed/headphones/400/300',
    category_id: 1,
    description: 'Experience premium, room-filling sound with the AuraSound headphones. Features active noise cancellation and 30-hour battery life.',
  },
  {
    product_id: 102,
    name: 'Smart Fitness Watch Series 5',
    brand: 'FitTrack',
    price: 199.99,
    image_url: 'https://picsum.photos/seed/watch/400/300',
    category_id: 1,
    description: 'Track your health, workouts, and sleep with the latest FitTrack Series 5. Water-resistant up to 50m.',
  },
  {
    product_id: 103,
    name: 'Premium Leather Backpack',
    brand: 'UrbanGear',
    price: 129.99,
    image_url: 'https://picsum.photos/seed/backpack/400/300',
    category_id: 2,
    description: 'Stylish and durable leather backpack perfect for daily commutes or weekend getaways. Fits up to a 15-inch laptop.',
  },
  {
    product_id: 104,
    name: 'Ergonomic Wireless Mouse',
    brand: 'LogiTech',
    price: 49.99,
    image_url: 'https://picsum.photos/seed/mouse/400/300',
    category_id: 1,
    description: 'Reduce wrist strain with this ergonomic wireless mouse. Features customizable buttons and a precision sensor.',
  },
  {
    product_id: 105,
    name: 'Portable Bluetooth Speaker',
    brand: 'SoundWave',
    price: 79.99,
    image_url: 'https://picsum.photos/seed/speaker/400/300',
    category_id: 1,
    description: 'Take your music anywhere with this rugged, waterproof Bluetooth speaker. Delivers 360-degree sound.',
  },
  {
    product_id: 106,
    name: '4K Ultra HD Monitor 27"',
    brand: 'ViewClear',
    price: 349.99,
    image_url: 'https://picsum.photos/seed/monitor/400/300',
    category_id: 1,
    description: 'Stunning 4K resolution on a 27-inch display. Perfect for creative professionals and gamers alike.',
  },
  {
    product_id: 107,
    name: 'Minimalist Desk Lamp',
    brand: 'Lumi',
    price: 39.99,
    image_url: 'https://picsum.photos/seed/lamp/400/300',
    category_id: 3,
    description: 'Sleek and modern desk lamp with adjustable brightness and color temperature settings.',
  },
  {
    product_id: 108,
    name: 'Compact Mechanical Keyboard',
    brand: 'KeyTech',
    price: 89.99,
    image_url: 'https://picsum.photos/seed/keyboard/400/300',
    category_id: 1,
    description: 'Tenkeyless mechanical keyboard with tactile switches for a satisfying typing experience.',
  },
  {
    product_id: 109,
    name: 'Aura Smart Speaker',
    brand: 'Aura Home',
    price: 199.00,
    image_url: 'https://picsum.photos/seed/smartspeaker/400/400',
    category_id: 1,
    description: 'Experience premium, room-filling sound with the Aura Smart Speaker. Voice-controlled assistant and seamless smart home integration.',
  },
  {
    product_id: 110,
    name: 'Ceramic Coffee Mug',
    brand: 'HomeGoods',
    price: 24.00,
    image_url: 'https://picsum.photos/seed/mug/400/400',
    category_id: 3,
    description: 'Handcrafted ceramic coffee mug, perfect for your morning brew.',
  },
  {
    product_id: 111,
    name: 'Jute Storage Basket',
    brand: 'EcoHome',
    price: 35.00,
    image_url: 'https://picsum.photos/seed/basket/400/400',
    category_id: 3,
    description: 'Eco-friendly jute storage basket for organizing your living space.',
  },
  {
    product_id: 112,
    name: 'Smart Home Speaker',
    brand: 'TechLife',
    price: 89.00,
    image_url: 'https://picsum.photos/seed/speaker2/400/400',
    category_id: 1,
    description: 'Compact smart speaker with built-in voice assistant.',
  }
];

export const mockRecommendations: Record<number, Recommendation[]> = {
  520088904: [
    { product_id: 109, score: 0.95 },
    { product_id: 110, score: 0.88 },
    { product_id: 111, score: 0.82 },
    { product_id: 112, score: 0.75 },
    { product_id: 101, score: 0.70 },
  ],
  530496790: [
    { product_id: 102, score: 0.92 },
    { product_id: 104, score: 0.85 },
    { product_id: 106, score: 0.80 },
    { product_id: 108, score: 0.78 },
    { product_id: 105, score: 0.72 },
  ],
  100000001: [
    { product_id: 103, score: 0.90 },
    { product_id: 107, score: 0.86 },
    { product_id: 101, score: 0.81 },
    { product_id: 109, score: 0.76 },
    { product_id: 112, score: 0.71 },
  ]
};
