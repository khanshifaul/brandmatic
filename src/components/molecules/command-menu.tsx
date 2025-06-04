"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  FiSearch,
  FiHome,
  FiShoppingBag,
  FiHeart,
  FiUser,
  FiSettings,
  FiHelpCircle,
  FiX,
} from "react-icons/fi";
import { Button } from "../atoms/button";
import { cn } from "@/utils/cn";

interface CommandItem {
  icon: React.ReactNode;
  label: string;
  onSelect: () => void;
}

interface CommandGroup {
  heading: string;
  items: CommandItem[];
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const groups: CommandGroup[] = [
    {
      heading: "Suggestions",
      items: [
        {
          icon: <FiHome className="mr-2 h-4 w-4" />,
          label: "Home",
          onSelect: () => router.push("/"),
        },
        {
          icon: <FiShoppingBag className="mr-2 h-4 w-4" />,
          label: "All Products",
          onSelect: () => router.push("/products"),
        },
        {
          icon: <FiHeart className="mr-2 h-4 w-4" />,
          label: "Wishlist",
          onSelect: () => router.push("/wishlist"),
        },
      ],
    },
    {
      heading: "Account",
      items: [
        {
          icon: <FiUser className="mr-2 h-4 w-4" />,
          label: "Profile",
          onSelect: () => router.push("/profile"),
        },
        {
          icon: <FiSettings className="mr-2 h-4 w-4" />,
          label: "Settings",
          onSelect: () => router.push("/settings"),
        },
      ],
    },
    {
      heading: "Support",
      items: [
        {
          icon: <FiHelpCircle className="mr-2 h-4 w-4" />,
          label: "Help Center",
          onSelect: () => router.push("/help"),
        },
      ],
    },
  ];

  // Filter items based on search
  const filteredGroups = groups.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.label.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(group => group.items.length > 0);

  const allItems = filteredGroups.flatMap(group => group.items);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
      if (!open) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex(i => (i + 1) % allItems.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(i => (i - 1 + allItems.length) % allItems.length);
      }
      if (e.key === "Enter") {
        e.preventDefault();
        allItems[activeIndex]?.onSelect();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, allItems, activeIndex]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  if (!open) {
    return (
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <FiSearch className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search...</span>
        <span className="inline-flex lg:hidden">Search</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => setOpen(false)}
      />
      <div
        ref={menuRef}
        className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 rounded-xl bg-white p-4 shadow-2xl dark:bg-gray-800"
      >
        <div className="flex items-center border-b pb-4">
          <FiSearch className="mr-2 h-4 w-4 text-gray-400" />
          <input
            ref={inputRef}
            className="flex-1 bg-transparent outline-none"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setActiveIndex(0);
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            className="ml-2 h-8 w-8 p-0"
            onClick={() => setOpen(false)}
          >
            <FiX className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 max-h-[60vh] overflow-y-auto">
          {filteredGroups.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-500">
              No results found.
            </p>
          ) : (
            filteredGroups.map((group, groupIndex) => (
              <div key={group.heading} className="mb-4">
                <div className="mb-2 px-2 text-xs font-medium text-gray-500">
                  {group.heading}
                </div>
                {group.items.map((item, itemIndex) => {
                  const index = filteredGroups
                    .slice(0, groupIndex)
                    .reduce((acc, g) => acc + g.items.length, 0) + itemIndex;
                  
                  return (
                    <button
                      key={item.label}
                      className={cn(
                        "flex w-full items-center rounded-md px-2 py-1.5 text-sm",
                        activeIndex === index ? "bg-gray-100 dark:bg-gray-700" : ""
                      )}
                      onClick={() => {
                        item.onSelect();
                        setOpen(false);
                      }}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
} 