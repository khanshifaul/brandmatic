import { Providers } from "@/lib/providers";
import type { Meta, StoryObj } from "@storybook/nextjs";
import Sidebar from "./Sidebar";


// Mock dependencies
const mockUseSidebar = (isDesktop: boolean, isSidebarOpen: boolean) => ({
  isSidebarOpen: isSidebarOpen,
  isDesktop: isDesktop,
  close: () => console.log("close sidebar"),
});

const mockMenuItems = [
  { title: "Dashboard", path: "/dashboard", icon: () => <div>Icon</div> },
  {
    title: "Products",
    submenu: [
      { title: "List", path: "/products" },
      { title: "Add New", path: "/products/new" },
    ],
  },
];

const mockLogout = () => console.log("logout");
const mockUseAppDispatch = () => () => console.log("dispatch");

const meta = {
  title: "UI/Organisms/Sidebar",
  component: Sidebar,
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
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default",
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
