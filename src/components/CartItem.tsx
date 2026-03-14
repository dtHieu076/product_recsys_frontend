import React from 'react';
import { CartItem as CartItemType } from '../types/type';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center py-6 border-b border-gray-100 last:border-0">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
        <img
          src={item.product.image_url}
          alt={item.product.name}
          className="h-full w-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="ml-6 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className="line-clamp-2 pr-4">{item.product.name}</h3>
            <p className="ml-4 whitespace-nowrap">${(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm mt-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => onUpdateQuantity(item.product.product_id, Math.max(1, item.quantity - 1))}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
            >
              -
            </button>
            <span className="px-4 py-1 font-medium text-gray-900 border-x border-gray-300">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.product.product_id, item.quantity + 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
            >
              +
            </button>
          </div>

          <div className="flex">
            <button
              type="button"
              onClick={() => onRemove(item.product.product_id)}
              className="font-medium text-red-600 hover:text-red-500 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
