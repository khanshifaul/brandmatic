import type { Meta, StoryObj } from "@storybook/nextjs";
import AddToCartBtn from "./addToCartBtn";

const meta: Meta<typeof AddToCartBtn> = {
  title: "UI/Molecules/AddToCartBtn",
  component: AddToCartBtn,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockProduct = {
  _id: "1",
  name: "Sample Product",
  isPublish: true,
  total_stock: 10,
  images: [
    {
      _id: "img1",
      image: {
        public_id: "placeholder",
        secure_url: "https://via.placeholder.com/150",
        optimizeUrl: "https://via.placeholder.com/150",
      },
    },
  ],
  variantsId: [
    {
      _id: "v1",
      name: "Default",
      selling_price: "100",
      variants_stock: 5,
      productId: "1",
      image: {
        _id: "img1",
        image: {
          public_id: "placeholder",
          secure_url: "https://via.placeholder.com/150",
          optimizeUrl: "https://via.placeholder.com/150",
        },
      },
      barcode: "",
      sku: "",
      condition: "new",
      discount_type: "fixed",
      discount_percent: "0",
      discount_amount: "0",
      discount_start_date: null,
      discount_end_date: null,
      offer_price: "0",
      variants_values: [],
      total_sold: 0,
      isPublish: true,
      isPreOrder: false,
    },
  ],
  short_description: "A short description of the product.",
  long_description: "A longer description of the product.",
  tags: ["sample", "product"],
  video: [],
  category: { _id: "cat1", name: "Sample Category" },
  brand: { _id: "brand1", name: "Sample Brand" },
  status: "active",
  rating: 4.5,
  reviews: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  sub_category: [{ _id: "subcat1", name: "Sample Subcategory" }],
  total_sold: 0,
  hasVariants: true,
  currency: "USD",
};

export const Default: Story = {
  args: {
    item: mockProduct,
  },
};

export const OutOfStock: Story = {
  args: {
    item: {
      ...mockProduct,
      total_stock: 0,
      variantsId: [
        {
          _id: "v1",
          name: "Default",
          selling_price: "100",
          variants_stock: 0,
          productId: mockProduct._id,
          image: mockProduct.images[0],
          barcode: "",
          sku: "",
          condition: "new",
          discount_type: "fixed",
          discount_percent: "0",
          discount_amount: "0",
          discount_start_date: null,
          discount_end_date: null,
          offer_price: "0",
          variants_values: [],
          total_sold: 0,
          isPublish: true,
          isPreOrder: false,
        },
      ],
    },
  },
};
