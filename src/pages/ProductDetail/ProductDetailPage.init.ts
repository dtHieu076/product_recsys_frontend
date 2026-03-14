import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../api/productApi';
import { getRecommendations } from '../../api/recommendationApi';
import { Product } from '../../types/type';
import { useUser } from '../../context/UserContext';
import { useCart } from '../../context/CartContext';
import { trackView, trackCart, trackPurchase } from '../../services/eventTracker';

export const useProductDetailPageInit = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, user_session } = useUser();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductAndRecs = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const productId = parseInt(id, 10);
        const data = await getProductById(productId);
        if (data) {
          setProduct(data);
          if (user && user_session) {
            await trackView(user.user_id, productId, user_session);
            const recs = await getRecommendations(user.user_id);
            setRecommendations(recs);
          }
        } else {
          setError('Product not found');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch product');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductAndRecs();
  }, [id, user, user_session]);

  const handleAddCart = async (p: Product) => {
    addToCart(p);
    if (user && user_session) {
      await trackCart(user.user_id, p.product_id, user_session);
    }
  };

  const handleBuyNow = async (p: Product) => {
    addToCart(p);
    if (user && user_session) {
      await trackCart(user.user_id, p.product_id, user_session);
      await trackPurchase(user.user_id, p.product_id, user_session);
    }
    navigate('/cart');
  };

  return {
    product,
    recommendations,
    isLoading,
    error,
    handleAddCart,
    handleBuyNow,
  };
};
