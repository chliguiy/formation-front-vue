// Le "contrat" entre le front et l'API NestJS (product.entity.ts)
export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string | null;
  createdAt: string;
  updatedAt: string;
}

// Ce que le formulaire envoie (CreateProductDto côté Nest)
export interface ProductInput {
  name: string;
  description?: string;
  price: number;
  stock?: number;
  category?: string;
}

export interface ProductFilters {
  q: string;
  category: string;
  sortBy: "name" | "price" | "createdAt";
  order: "ASC" | "DESC";
  page: number;
  limit: number;
}

export interface ProductPage {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}
