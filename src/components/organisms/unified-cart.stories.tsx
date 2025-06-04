import { Providers } from "@/lib/providers";
import { TCartItem } from "@/types/cart";
import type { Meta, StoryObj } from "@storybook/react";
import { UnifiedCart } from "./unified-cart";

// Mock hooks (basic mocks without jest.mock calls here)
// Mock the useBusiness hook to return mock data
const mockUseBusiness = () => ({
  businessData: {
    currency: ["USD"],
    // Add other necessary business data properties if the component uses them
  },
  isLoading: false,
  error: null,
});

// Mock the useCart hook to return mock data and functions
const mockUseCart = (items: TCartItem[] = []) => ({
  items: items,
  itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  isOpen: true, // Start open for demonstration
  removeItem: (id: string) => console.log(`Remove item: ${id}`),
  closeCart: () => console.log("Close cart"),
  openCart: () => console.log("Open cart"),
});

const meta = {
  title: 'Components/Organisms/UnifiedCart',
  component: UnifiedCart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UnifiedCart>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCartItems: TCartItem[] = [
  {
    productId: '1',
    name: 'Sample Product 1',
    price: 99.99,
    image: {
      _id: '1',
      image: {
        public_id: 'sample1',
        secure_url: 'https://via.placeholder.com/400',
        optimizeUrl: 'https://via.placeholder.com/400',
      },
    },
    quantity: 1,
    maxStock: 10,
    variant: {
      _id: '1',
      name: 'Default Variant',
      selling_price: '99.99',
      variants_stock: 10,
    },
  },
  {
    productId: '2',
    name: 'Sample Product 2',
    price: 149.99,
    image: {
      _id: '2',
      image: {
        public_id: 'sample2',
        secure_url: 'https://via.placeholder.com/400',
        optimizeUrl: 'https://via.placeholder.com/400',
      },
    },
    quantity: 2,
    maxStock: 5,
    variant: {
      _id: '2',
      name: 'Premium Variant',
      selling_price: '149.99',
      variants_stock: 5,
    },
  },
];

export const SheetMode: Story = {
  args: {
    mode: 'sheet',
    isOpen: true,
    onClose: () => {},
  },
};

export const DrawerMode: Story = {
  args: {
    mode: 'drawer',
    isOpen: true,
    onClose: () => {},
  },
}; 