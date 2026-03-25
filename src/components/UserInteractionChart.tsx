import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Rectangle,
} from 'recharts';



interface UserInteractionChartProps {
    data: any[];
}

const UserInteractionChart: React.FC<UserInteractionChartProps> = ({ data }) => {
    const [selectedCategory, setSelectedCategory] = useState<any | null>(null);

    const handleCategoryClick = (entry: any) => {
        console.log("Clicked Bar Data:", entry);
        const categoryName = entry?.name || entry?.activeLabel;
        if (categoryName) {
            // Find in chartData by leafName match
            const chartEntry = categoryChartData.find((cat: any) => cat.leafName === categoryName || cat.name === categoryName);
            const fullCategory = chartEntry ? data.find((cat: any) => cat.category === chartEntry.fullCategory) : null;
            console.log("Clicked categoryName:", categoryName, "chartEntry:", chartEntry, "fullCategory:", fullCategory);
            setSelectedCategory(fullCategory || null);
        }
    };

    const handleBackClick = () => {
        setSelectedCategory(null);
    };

    const shortenName = (name: string, maxLength: number = 25) => {
        return name.length > maxLength ? name.substring(0, maxLength) + '...' : name;
    };

    const getLeafCategoryName = (fullName: string) => {
        const leaf = fullName.split('.').pop() || fullName;
        return leaf.toUpperCase();
    };

    // Prepare data for category chart
    const categoryChartData = data.map((cat: any) => ({
        name: getLeafCategoryName(cat.category),
        leafName: getLeafCategoryName(cat.category),
        view: cat.view,
        cart: cat.cart,
        purchase: cat.purchase,
        fullCategory: cat.category, // Keep for lookup
    }));

    // Prepare data for product chart (horizontal)
    const productChartData = selectedCategory
        ? (selectedCategory.products || []).map((prod: any) => ({
            name: shortenName(prod.product_name, 35),
            view: prod.view,
            cart: prod.cart,
            purchase: prod.purchase,
        }))
        : [];

    const CustomBarShape = (props: any) => {
        const { fill } = props;
        return <Rectangle {...props} fill={fill} radius={[4, 4, 4, 4]} />;
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {selectedCategory ? `Products in ${shortenName(selectedCategory.category)}` : 'User Interactions by Category'}
            </h2>

            {selectedCategory && (
                <div className="mb-6">
                    <button
                        onClick={handleBackClick}
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-all duration-200 font-medium mb-4"
                    >
                        🔙 Quay lại
                    </button>
                </div>
            )}

            <div style={{ width: '100%', height: 450 }}>
                <ResponsiveContainer>
                    {selectedCategory ? (
                        // Drill-down Product Chart (Horizontal)
                        <BarChart
                            data={productChartData}
                            layout="vertical"
                            margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" width={250} tick={{ fontSize: 12, fontWeight: 500 }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="view" stackId="a" fill="#3b82f6" shape={CustomBarShape}>
                                <Rectangle radius={[4, 4, 4, 4]} />
                            </Bar>
                            <Bar dataKey="cart" stackId="a" fill="#f59e0b" shape={CustomBarShape} />
                            <Bar dataKey="purchase" stackId="a" fill="#10b981" shape={CustomBarShape} />
                        </BarChart>
                    ) : (
                        // Category Chart (Vertical)
                        <BarChart data={categoryChartData} onClick={handleCategoryClick}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} height={80} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="view" stackId="a" fill="#3b82f6" shape={CustomBarShape} onClick={handleCategoryClick} />
                            <Bar dataKey="cart" stackId="a" fill="#f59e0b" shape={CustomBarShape} onClick={handleCategoryClick} />
                            <Bar dataKey="purchase" stackId="a" fill="#10b981" shape={CustomBarShape} onClick={handleCategoryClick} />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default UserInteractionChart;

