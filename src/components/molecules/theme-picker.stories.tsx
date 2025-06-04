import {useTheme} from "@/hooks/useTheme"; // Import the hook
import { ThemeColor, ThemeMode } from "@/lib/features/theme/themeSlice";
import type { Meta, StoryObj } from "@storybook/nextjs";
import ThemeColorPicker from "./theme-picker"; // Assuming the component is exported as default
import { Mock, vi } from "vitest"; // Added import from vitest

// Mock the useTheme hook for Storybook
vi.mock("@/hooks/useTheme", () => ({
  // Changed jest.mock to vi.mock
  __esModule: true, // This is important for default exports
  default: vi.fn(), // Changed jest.fn() to vi.fn()
}));

// Helper function to mock the useTheme hook return value
const mockUseTheme = (color: ThemeColor) => ({
  mode: "light" as ThemeMode, // Added mode property
  color,
  toggleMode: () => console.log("toggleMode called"), // Added toggleMode function
  changeColor: (newColor: ThemeColor) => console.log(`Theme color changed to: ${newColor}`),
});

const meta: Meta<typeof ThemeColorPicker> = {
  title: "UI/Molecules/ThemeColorPicker",
  component: ThemeColorPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // No specific argTypes needed as the component relies on a hook
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    (useTheme as Mock<typeof useTheme>).mockReturnValue(mockUseTheme("zinc"));
    return <ThemeColorPicker {...args} />;
  },
};

export const SlateTheme: Story = {
  render: (args) => {
    (useTheme as Mock<typeof useTheme>).mockReturnValue(mockUseTheme("slate"));
    return <ThemeColorPicker {...args} />;
  },
};

export const StoneTheme: Story = {
  render: (args) => {
    (useTheme as Mock<typeof useTheme>).mockReturnValue(mockUseTheme("stone"));
    return <ThemeColorPicker {...args} />;
  },
};

export const NeutralTheme: Story = {
  render: (args) => {
    (useTheme as Mock<typeof useTheme>).mockReturnValue(mockUseTheme("neutral"));
    return <ThemeColorPicker {...args} />;
  },
};
