import { NextResponse } from "next/server";

const mockProducts = [
  {
    id: "1",
    name: "Premium T-Shirt",
    description: "High-quality cotton t-shirt with a modern fit",
    price: 29.99,
    category: "clothing",
    images: [
      {
        _id: "img1",
        image: {
          secure_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        },
      },
    ],
    variantsId: [
      {
        _id: "var1",
        name: "Standard",
        selling_price: 29.99,
        variants_stock: 10,
      },
    ],
    stock: 10,
    total_stock: 10,
  },
  {
    id: "2",
    name: "Classic Denim Jeans",
    description: "Timeless denim jeans with perfect comfort",
    price: 79.99,
    category: "clothing",
    images: [
      {
        _id: "img2",
        image: {
          secure_url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
        },
      },
    ],
    variantsId: [
      {
        _id: "var2",
        name: "Standard",
        selling_price: 79.99,
        variants_stock: 5,
      },
    ],
    stock: 5,
    total_stock: 5,
  },
  {
    id: "3",
    name: "Leather Backpack",
    description: "Stylish and durable leather backpack for everyday use",
    price: 129.99,
    category: "accessories",
    images: [
      {
        _id: "img3",
        image: {
          secure_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        },
      },
    ],
    variantsId: [
      {
        _id: "var3",
        name: "Standard",
        selling_price: 129.99,
        variants_stock: 8,
      },
    ],
    stock: 8,
    total_stock: 8,
  },
  {
    id: "4",
    name: "Smart Watch",
    description: "Feature-rich smartwatch with health tracking",
    price: 199.99,
    category: "electronics",
    images: [
      {
        _id: "img4",
        image: {
          secure_url: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
        },
      },
    ],
    variantsId: [
      {
        _id: "var4",
        name: "Standard",
        selling_price: 199.99,
        variants_stock: 15,
      },
    ],
    stock: 15,
    total_stock: 15,
  },
  {
    id: "5",
    name: "Wireless Earbuds",
    description: "Premium wireless earbuds with noise cancellation",
    price: 149.99,
    category: "electronics",
    images: [
      {
        _id: "img5",
        image: {
          secure_url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
        },
      },
    ],
    variantsId: [
      {
        _id: "var5",
        name: "Standard",
        selling_price: 149.99,
        variants_stock: 20,
      },
    ],
    stock: 20,
    total_stock: 20,
  },
  {
    id: "6",
    name: "Running Shoes",
    description: "Comfortable and lightweight running shoes",
    price: 89.99,
    category: "footwear",
    images: [
      {
        _id: "img6",
        image: {
          secure_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        },
      },
    ],
    variantsId: [
      {
        _id: "var6",
        name: "Standard",
        selling_price: 89.99,
        variants_stock: 12,
      },
    ],
    stock: 12,
    total_stock: 12,
  },
  {
    id: "7",
    name: "Sunglasses",
    description: "UV-protected stylish sunglasses",
    price: 59.99,
    category: "accessories",
    images: [
      {
        _id: "img7",
        image: {
          secure_url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
        },
      },
    ],
    variantsId: [
      {
        _id: "var7",
        name: "Standard",
        selling_price: 59.99,
        variants_stock: 25,
      },
    ],
    stock: 25,
    total_stock: 25,
  },
  {
    id: "8",
    name: "Water Bottle",
    description: "Insulated stainless steel water bottle",
    price: 24.99,
    category: "accessories",
    images: [
      {
        _id: "img8",
        image: {
          secure_url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
        },
      },
    ],
    variantsId: [
      {
        _id: "var8",
        name: "Standard",
        selling_price: 24.99,
        variants_stock: 30,
      },
    ],
    stock: 30,
    total_stock: 30,
  },
];

export async function GET(request: Request) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured") === "true";

  // If featured is true, return first 4 products, otherwise return all
  const products = featured ? mockProducts.slice(0, 4) : mockProducts;

  return NextResponse.json(products);
}
