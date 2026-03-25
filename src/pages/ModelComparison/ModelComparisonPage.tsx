import React from 'react';
import { Navbar } from '../../components/Navbar';
import UserInteractionChart from '../../components/UserInteractionChart';

import { ProductGrid } from '../../components/ProductGrid';
import { useModelComparisonPage } from './ModelComparisonPage.init';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Product } from '../../types/type';
import { CategoryHistory } from '../../types/history';

interface VerticalProductItemProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const VerticalProductItem: React.FC<VerticalProductItemProps> = ({ product, onAddToCart }) => (
    <div className="group flex items-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-100 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200 hover:border-gray-200 cursor-pointer">
        <div className="relative flex-shrink-0">
            {product.prediction_confidence !== undefined && (
                <div className="absolute -top-1 -left-1 z-20 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full shadow-lg font-medium">
                    {(product.prediction_confidence * 100).toFixed(0)}%
                </div>
            )}
            <img
                src={product.image_url}
                alt={product.product_name}
                className="w-20 h-20 rounded-xl object-cover group-hover:scale-105 transition-transform duration-200"
            />
            {product.isInteracted && (
                <div className="absolute -top-1 -right-1 z-20 bg-emerald-400 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-3 h-3" />
                </div>
            )}
        </div>
        <div className="ml-4 flex-1 min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                {product.category_code || `#${product.category_id}`}
            </p>
            <p className="font-semibold text-gray-900 text-sm leading-5 line-clamp-2 group-hover:text-black">
                {product.product_name}
            </p>
        </div>
        <button
            onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
            }}
            className="ml-3 p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-colors"
            title="Add to cart"
        >
            +
        </button>
    </div>
);

interface VerticalProductListProps {
    products: Product[];
    title: string;
    color: string;
    iconLabel: string;
    onAddToCart: (product: Product) => void;
}

const VerticalProductList: React.FC<VerticalProductListProps> = ({
    products,
    title,
    color,
    iconLabel,
    onAddToCart,
}) => (
    <div className="group">
        <div className={`bg-gradient-to-br from-${color}-50 to-${color}-100 rounded-3xl p-8 border-4 border-${color}-200 hover:border-${color}-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}>
            <div className="flex items-center mb-6">
                <div className={`w-12 h-12 bg-${color}-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg`}>
                    <span className="text-white font-bold text-lg">{iconLabel}</span>
                </div>
                <div>
                    <h3 className="text-2xl font-black text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-600 font-medium">
                        {title === 'NCF' ? 'Neural Collaborative Filtering' :
                            title === 'ALS' ? 'Alternating Least Squares' :
                                title === 'SASRec' ? 'Self-Attentive Sequential Recommendation' :
                                    'Model recommendations'}
                    </p>
                </div>
            </div>
            <div className="space-y-4">
                {products.map((product) => (
                    <VerticalProductItem key={product.product_id} product={product} onAddToCart={onAddToCart} />
                ))}
            </div>
            {products.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No recommendations
                </div>
            )}
        </div>
    </div>
);

export const ModelComparisonPage: React.FC = () => {
    const {
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
    } = useModelComparisonPage();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent tracking-tight">
                        Model Recommendations Comparison
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                        Enter User ID to see interaction history and recommendations from 3 ML models
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mb-12">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
                        <input
                            type="number"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="Enter User ID (e.g. 520088904)"
                            className="w-full sm:w-80 px-4 py-3 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm text-lg placeholder-gray-500"
                        />
                        <button
                            onClick={fetchData}
                            disabled={isLoading}
                            className="px-8 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-lg"
                        >
                            {isLoading ? 'Loading...' : 'Fetch Data'}
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-2xl mb-8 text-center">
                            {error}
                        </div>
                    )}

                    {(!modelA.length && !modelB.length && !modelC.length && !historyData.length && !error) && (
                        <div className="text-center py-16 text-gray-500">
                            <div className="w-24 h-24 bg-gray-200 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to analyze</h3>
                            <p>Enter a User ID and click Fetch Data to see history chart and model recommendations</p>
                        </div>
                    )}
                </div>

                {/* User History Chart - show if data available */}
                {historyData.length > 0 && (
                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                            📈 User {userId} Interaction History
                        </h2>
                        <UserInteractionChart data={historyData} />
                    </div>
                )}

                {/* Models Comparison - show if any model has data */}
                {(modelA.length > 0 || modelB.length > 0 || modelC.length > 0) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <VerticalProductList
                            products={modelA}
                            title="NCF"
                            color="green"
                            iconLabel="A"
                            onAddToCart={handleAddCart}
                        />
                        <VerticalProductList
                            products={modelB}
                            title="ALS"
                            color="green"
                            iconLabel="B"
                            onAddToCart={handleAddCart}
                        />
                        <VerticalProductList
                            products={modelC}
                            title="SASRec"
                            color="green"
                            iconLabel="C"
                            onAddToCart={handleAddCart}
                        />
                    </div>
                )}
            </main>
        </div>
    );
};

