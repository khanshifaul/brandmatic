"use client";
import { useAppDispatch, useAppSelector } from '@/lib/store';
import {
  selectCurrentView,
  selectIsSidebarOpen,
  selectIsSidebarPinned,
  selectSidebarWidth,
  closeSidebar,
  togglePin,
  setWidth,
  goBack,
} from '@/lib/features/sidebar/sidebarSlice';
import { selectThemeMode, selectThemeColor, setMode, setColor } from '@/lib/features/theme/themeSlice';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const currentView = useAppSelector(selectCurrentView);
  const isOpen = useAppSelector(selectIsSidebarOpen);
  const isPinned = useAppSelector(selectIsSidebarPinned);
  const width = useAppSelector(selectSidebarWidth);
  const themeMode = useAppSelector(selectThemeMode);
  const themeColor = useAppSelector(selectThemeColor);
  const pathname = usePathname();

  if (!isOpen) return null;

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/products', label: 'Products', icon: '🛍️' },
    { href: '/theme-settings', label: 'Theme', icon: '🎨' },
  ];

  const themeColors = [
    { value: 'default', label: 'Default', bg: 'bg-primary' },
    { value: 'red', label: 'Red', bg: 'bg-red-500' },
    { value: 'green', label: 'Green', bg: 'bg-green-500' },
    { value: 'blue', label: 'Blue', bg: 'bg-blue-500' },
    { value: 'purple', label: 'Purple', bg: 'bg-purple-500' },
    { value: 'orange', label: 'Orange', bg: 'bg-orange-500' },
    { value: 'pink', label: 'Pink', bg: 'bg-pink-500' },
    { value: 'gray', label: 'Gray', bg: 'bg-gray-500' },
  ];

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-background-subtle border-r border-border transition-all ${
        isPinned ? '' : 'shadow-lg'
      }`}
      style={{ width: `${width}px` }}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <button
            onClick={() => dispatch(togglePin())}
            className="p-2 rounded-md hover:bg-background-subtle"
            title={isPinned ? 'Unpin Sidebar' : 'Pin Sidebar'}
          >
            {isPinned ? '📌' : '📍'}
          </button>
          {!isPinned && (
            <button
              onClick={() => dispatch(closeSidebar())}
              className="p-2 rounded-md hover:bg-background-subtle"
            >
              ✕
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  pathname === item.href
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-background-subtle'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Theme Controls */}
          <div className="mt-8 space-y-4">
            <h3 className="font-semibold px-3">Theme</h3>
            
            <div className="space-y-2">
              <button
                onClick={() => dispatch(setMode('light'))}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  themeMode === 'light'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-background-subtle'
                }`}
              >
                ☀️ Light
              </button>
              <button
                onClick={() => dispatch(setMode('dark'))}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  themeMode === 'dark'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-background-subtle'
                }`}
              >
                🌙 Dark
              </button>
              <button
                onClick={() => dispatch(setMode('system'))}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  themeMode === 'system'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-background-subtle'
                }`}
              >
                💻 System
              </button>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold px-3 mb-2">Colors</h3>
              <div className="grid grid-cols-4 gap-2 px-3">
                {themeColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => dispatch(setColor(color.value as any))}
                    className={`w-8 h-8 rounded-full ${color.bg} ${
                      themeColor === color.value ? 'ring-2 ring-primary ring-offset-2' : ''
                    }`}
                    title={color.label}
                  />
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Resize Handle */}
        <div
          className="absolute top-0 right-0 w-1 h-full cursor-ew-resize hover:bg-primary/50"
          onMouseDown={(e) => {
            const startX = e.clientX;
            const startWidth = width;

            const onMouseMove = (e: MouseEvent) => {
              const delta = e.clientX - startX;
              dispatch(setWidth(Math.max(240, Math.min(480, startWidth + delta))));
            };

            const onMouseUp = () => {
              document.removeEventListener('mousemove', onMouseMove);
              document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
          }}
        />
      </div>
    </aside>
  );
}
