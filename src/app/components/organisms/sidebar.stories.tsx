import type { Meta, StoryObj } from "@storybook/nextjs";
import { Sidebar } from "./sidebar";

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

const meta: Meta<typeof Sidebar> = {
  title: "UI/Organisms/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen", // Sidebar typically takes full height
  },
  tags: ["autodocs"],
  render: (args: any, context) => {
    // Determine isDesktop and isSidebarOpen based on the story's parameters or args
    const isDesktop = args.isDesktop;
    const isSidebarOpen = args.isSidebarOpen;

    // Use the mock hook within the render function
    const sidebar = mockUseSidebar(isDesktop, isSidebarOpen);

    // Render the component with mocked dependencies
    return (
      <Sidebar
        {...args}
        // Pass mocked hook values and dependencies as props if the component accepts them,
        // or rely on the component using the mocked hooks and dependencies directly.
        // For this component, it uses hooks and imported values directly, so we just need to ensure they are mocked.
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isDesktop: true,
    isSidebarOpen: true, // Assume open for demonstration
  },
};

export const MobileView: Story = {
  args: {
    isDesktop: false,
    isSidebarOpen: true, // Assume open for demonstration
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1", // Simulate mobile viewport
    },
  },
};
