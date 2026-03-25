export interface ProductHistory {
    product_id: number;
    product_name: string;
    view: number;
    cart: number;
    purchase: number;
}

export interface CategoryHistory {
    category: string;
    view: number;
    cart: number;
    purchase: number;
    products: ProductHistory[];
}

