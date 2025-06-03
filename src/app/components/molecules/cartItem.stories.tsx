import type { Meta, StoryObj } from "@storybook/nextjs";
import { CartItem } from "./cartItem";

const meta: Meta<typeof CartItem> = {
  title: "UI/Molecules/CartItem",
  component: CartItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockCartItem = {
  _id: "1",
  name: "Sample Product",
  price: 100,
  image: "https://via.placeholder.com/150",
  quantity: 2,
  maxStock: 10,
} as any; // Cast to any to bypass type errors for story

export const Default: Story = {
  args: {
    item: mockCartItem,
    onRemove: () => alert("Remove item"),
  },
};

export const WithQuantityControls: Story = {
  args: {
    item: { ...mockCartItem, quantity: 5 },
    onRemove: () => alert("Remove item"),
    onQuantityChange: (quantity) => alert(`Quantity changed to ${quantity}`),
    showQuantityControls: true,
  },
};
