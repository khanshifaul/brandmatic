import type { Meta, StoryObj } from "@storybook/react";
import { AddToCartBtn } from "../atoms/add-to-cart-btn";

const mockProduct = {
  _id: "1",
  name: "Sample Product",
  slug: "sample-product",
  description: "A sample product description",
  short_description: "A sample product description",
  long_description: "A longer sample product description",
  price: 99.99,
  stock: 10,
  total_stock: 10,
  total_sold: 0,
  hasVariants: true,
  images: [
    {
      _id: "1",
      image: {
        public_id: "sample",
        secure_url: "https://via.placeholder.com/400",
        optimizeUrl: "https://via.placeholder.com/400",
      },
    },
  ],
  video: [],
  brand: {
    _id: "1",
    name: "Sample Brand",
  },
  sub_category: [
    {
      _id: "1",
      name: "Sample Category",
    },
  ],
  variantsId: [
    {
      _id: "1",
      productId: "1",
      name: "Default Variant",
      image: {
        _id: "1",
        image: {
          public_id: "sample",
          secure_url: "https://via.placeholder.com/400",
          optimizeUrl: "https://via.placeholder.com/400",
        },
      },
      barcode: "123456789",
      sku: "SAMPLE-001",
      selling_price: "99.99",
      condition: "new",
      discount_type: null,
      discount_percent: "0",
      discount_amount: "0",
      discount_start_date: null,
      discount_end_date: null,
      offer_price: "99.99",
      variants_stock: 10,
      variants_values: null,
      total_sold: 0,
      isPublish: true,
      isPreOrder: false,
    },
  ],
  currency: "USD",
  isPublish: true,
  businessId: "1",
  category: "Sample Category",
  featured: true,
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
};

const meta = {
  title: "Components/Molecules/AddToCartBtn",
  component: AddToCartBtn,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AddToCartBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: mockProduct,
  },
};

export const OutlineVariant: Story = {
  args: {
    product: mockProduct,
    variant: "outline",
  },
};

export const SmallSize: Story = {
  args: {
    product: mockProduct,
    size: "sm",
  },
};

export const OutOfStock: Story = {
  args: {
    product: {
      ...mockProduct,
      total_stock: 0,
    },
  },
};
