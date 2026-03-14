import { useState, useEffect } from 'react';
import { getRecommendations } from '../../api/recommendationApi';
import { Product } from '../../types/type';
import { useUser } from '../../context/UserContext';
import { useCart } from '../../context/CartContext';
import { trackCart } from '../../services/eventTracker';

export const useRecommendedPageInit = () => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, user_session } = useUser();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const data = await getRecommendations(user.user_id);
        setRecommendations(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch recommendations');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [user]);

  const handleAddCart = async (product: Product) => {
    addToCart(product);
    if (user && user_session) {
      await trackCart(user.user_id, product.product_id, user_session);
    }
  };

  return {
    recommendations,
    isLoading,
    error,
    user,
    handleAddCart,
  };
};
