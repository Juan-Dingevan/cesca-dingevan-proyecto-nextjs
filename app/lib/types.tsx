export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    vegan: boolean;
    gluten_free: boolean;
    date_added: Date;
    img_link: string;
};

export type ProductForm = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    vegan: boolean;
    gluten_free: boolean;
    img_link: string;
};

