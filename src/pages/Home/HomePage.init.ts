import { useState, useEffect } from 'react';
import { getProducts } from '../../api/productApi';
import { Product } from '../../types/type';
import { useUser } from '../../context/UserContext';
import { useCart } from '../../context/CartContext';
import { trackCart } from '../../services/eventTracker';

export const useHomePageInit = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, user_session } = useUser();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddCart = async (product: Product) => {
    addToCart(product);
    if (user && user_session) {
      await trackCart(user.user_id, product.product_id, user_session);
    }
  };

  return {
    products,
    isLoading,
    error,
    handleAddCart,
  };
};
