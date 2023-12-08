export interface RawProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export type Product = RawProduct & {
    isFavourite: boolean;
};

export type DeletedProduct = RawProduct & {
    deletedOn: Date;
    isDeleted: boolean;
};

export interface PagedProductsResponse {
    limit: number;
    products: RawProduct[];
    skip: number;
    total: number;
}

