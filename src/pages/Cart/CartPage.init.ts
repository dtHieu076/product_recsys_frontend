import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import { trackPurchase, trackRemoveFromCart } from '../../services/eventTracker';

export const useCartPageInit = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const { user, user_session } = useUser();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const navigate = useNavigate();

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleRemove = async (productId: number) => {
    removeFromCart(productId);
    if (user && user_session) {
      await trackRemoveFromCart(user.user_id, productId, user_session);
    }
  };

  const handlePurchase = async () => {
    if (!user || !user_session || cartItems.length === 0) return;

    setIsPurchasing(true);
    try {
      // Track purchase for each item in the cart
      await Promise.all(
        cartItems.map((item) => trackPurchase(user.user_id, item.product.product_id, user_session))
      );
      
      clearCart();
      alert('Purchase successful! Events tracked.');
      navigate('/');
    } catch (error) {
      console.error('Failed to process purchase', error);
      alert('Failed to process purchase.');
    } finally {
      setIsPurchasing(false);
    }
  };

  return {
    cartItems,
    cartTotal,
    isPurchasing,
    handleUpdateQuantity,
    handleRemove,
    handlePurchase,
    user,
  };
};
