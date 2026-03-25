import { useState, useEffect } from 'react';
import { Product, HistoryItem } from '../../types/type';
import { CategoryHistory } from '../../types/history';
import { getUserHistory } from '../../api/eventApi';

import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import { trackCart } from '../../services/eventTracker';
import { getRecommendations, getALSRecommendations, getSASRecRecommendations } from '../../api/recommendationApi';

export const useModelComparisonPage = () => {
    const [userId, setUserId] = useState('');
    const [historyData, setHistoryData] = useState<CategoryHistory[]>([]);
    const [modelA, setModelA] = useState<Product[]>([]);
    const [modelB, setModelB] = useState<Product[]>([]);
    const [modelC, setModelC] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user, user_session } = useUser();
    const { addToCart } = useCart();

    // Auto-set to current user ID if logged in

    useEffect(() => {
        if (user?.user_id && userId === '') {
            setUserId(user.user_id.toString());
        }
    }, [user, userId]);

    const fetchData = async () => {
        if (!userId || isNaN(Number(userId))) {
            setError('Please enter a valid User ID');
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const uid = Number(userId);

            // Always use real API for modelA (NCF)
            const realRecs = await getRecommendations(uid);
            const mappedModelA: Product[] = realRecs.map((p: any) => ({
                ...p,
                prediction_confidence: (p as any).confidence_score,
                isInteracted: false,
                confidence_score: undefined // cleanup
            }));
            setModelA(mappedModelA);

            // Real modelB (ALS) - similar to modelA
            try {
                const alsRecs = await getALSRecommendations(uid);
                const mappedModelB: Product[] = alsRecs.map((p: any) => ({
                    ...p,
                    prediction_confidence: p.confidence_score,
                    confidence_score: undefined,
                    isInteracted: false
                }));
                setModelB(mappedModelB);
            } catch (err: any) {
                console.error('ALS API error:', err);
                setModelB([]);
            }

            // Fetch real user history from new endpoint
            const realHistoryData = await getUserHistory(uid);
            setHistoryData(realHistoryData);

            // Real modelC (SASRec)
            try {
                const sasrecRecs = await getSASRecRecommendations(uid);
                const mappedModelC: Product[] = sasrecRecs.map((p: any) => ({
                    ...p,
                    prediction_confidence: p.confidence_score,
                    confidence_score: undefined,
                    isInteracted: false
                }));
                setModelC(mappedModelC);
            } catch (err: any) {
                console.error('SASRec API error:', err);
                setModelC([]);
            }
        } catch (err: any) {
            console.error('Fetch error:', err);
            setError(err.message || 'Failed to fetch data');
            // Reset on error
            setModelA([]);
            setModelB([]);
            setModelC([]);
            setHistoryData([]);
        } finally {
            setIsLoading(false);
        }
    };


    const handleAddCart = async (product: Product) => {
        addToCart(product);
        if (user && user_session) {
            await trackCart(user.user_id, product.product_id, user_session);
        }
    };

    return {
        userId,
        setUserId,
        historyData,
        modelA,
        modelB,
        modelC,
        fetchData,
        isLoading,
        error,
        user,
        handleAddCart,
    };
};

