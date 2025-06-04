import { MetaResponse } from "./metaResponse";

export interface ProductResponse {
  status: number;
  success: boolean;
  message: string;
  meta: MetaResponse;
  data: Product[];
}

export interface ProductImage {
  public_id: string;
  secure_url: string;
  optimizeUrl: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  long_description: string;
  price: number;
  stock: number;
  images: {
    _id: string;
    image: ProductImage;
  }[];
  video: {
    _id: string;
    video?: {
      public_id: string;
      secure_url: string;
    };
  }[];
  brand: {
    _id: string;
    name: string;
  };
  sizeGuard?: {
    _id: string;
    name: string;
  };
  sub_category: {
    _id: string;
    name: string;
  }[];
  total_stock: number;
  total_sold: number;
  hasVariants: boolean;
  variantsId: Variant[];
  currency: string;
  isPublish: boolean;
  businessId: string;
  category: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  _id: string;
  image: {
    public_id: string;
    secure_url: string;
    optimizeUrl: string;
  };
}

export interface Video {
  _id: string;
  video?: {
    public_id: string;
    secure_url: string;
  };
}

export interface Variant {
  _id: string;
  productId: string;
  name: string;
  image: {
    _id: string;
    image: ProductImage;
  };
  barcode: string;
  sku: string;
  selling_price: string;
  condition: string;
  discount_type: string | null;
  discount_percent: string;
  discount_amount: string;
  discount_start_date: string | null;
  discount_end_date: string | null;
  offer_price: string;
  variants_stock: number;
  variants_values: string[] | null;
  total_sold: number;
  isPublish: boolean;
  isPreOrder: boolean;
}
