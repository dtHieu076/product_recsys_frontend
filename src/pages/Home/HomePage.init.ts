import { useState, useEffect } from 'react';
import { getProductsPaginated } from '../../api/productApi';
import { Product, PaginatedResponse } from '../../types/type';
import { useUser } from '../../context/UserContext';
import { useCart } from '../../context/CartContext';
import { trackCart } from '../../services/eventTracker';

export const useHomePageInit = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const productsPerPage = 12;
  const { user, user_session } = useUser();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data: PaginatedResponse = await getProductsPaginated(currentPage, productsPerPage);
        setProducts(data.products);
        setTotalProducts(data.total);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handleAddCart = async (product: Product) => {
    addToCart(product);
    if (user && user_session) {
      await trackCart(user.user_id, product.product_id, user_session);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    products,
    isLoading,
    error,
    handleAddCart,
    currentPage,
    totalProducts,
    productsPerPage,
    handlePageChange,
  };
};
