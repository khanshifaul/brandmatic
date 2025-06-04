import { Providers } from "@/lib/providers";
import type { Meta, StoryObj } from "@storybook/nextjs";
import Navbar from "./Navbar";

const meta = {
  title: "UI/Organisms/Navbar",
  component: Navbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Providers>
        <Story />
      </Providers>
    ),
  ],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default",
};

export const MobileView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: "mobile1", // Simulate mobile viewport
    },
  },
};
