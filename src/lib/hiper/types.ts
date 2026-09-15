export interface HiperProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  promotionalPrice?: number;
  stock: number;
  sku: string;
  categoryId: string;
  categoryName: string;
  images: string[];
  weight: number;
  brand: string;
  isActive: boolean;
}

export interface HiperCategory {
  id: string;
  name: string;
  parentId?: string;
  slug: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
