"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { Button } from "../atoms/button";

type SheetPosition = "left" | "right" | "top" | "bottom";
type SheetSize = "sm" | "md" | "lg" | "full";

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  position?: SheetPosition;
  children: React.ReactNode;
  className?: string;
  size?: SheetSize;
  disableClickOutside?: boolean;
  showCloseButton?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  title?: string;
  onConfirm?: () => void;
  confirmText?: string;
  disableEscapeKey?: boolean;
  overlayClassName?: string;
  preventScroll?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
}

const positionClasses = {
  left: "left-0 top-0 h-full",
  right: "right-0 top-0 h-full",
  top: "top-0 left-0 w-full",
  bottom: "bottom-0 left-0 w-full",
};

const sizeClasses = {
  sm: "w-full sm:w-[380px]",
  md: "w-full sm:w-[480px]",
  lg: "w-full sm:w-[580px]",
  full: "w-full",
};

const Sheet: React.FC<SheetProps> = ({
  isOpen,
  onClose,
  position = "right",
  size = "md",
  children,
  className = "",
  disableClickOutside = false,
  showCloseButton = true,
  showHeader = true,
  showFooter = false,
  title,
  disableEscapeKey = false,
  overlayClassName = "",
  preventScroll = true,
  initialFocusRef,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      let container = document.getElementById('sheet-portal-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'sheet-portal-container';
        document.body.appendChild(container);
      }
      setPortalContainer(container);
    }
    return () => {
      if (typeof window !== 'undefined') {
        const container = document.getElementById('sheet-portal-container');
        if (container && container.childNodes.length === 0) {
          container.remove();
        }
      }
    };
  }, []);

  useEffect(() => {
    if (preventScroll) {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
    return () => {
      if (preventScroll) {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen, preventScroll]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !disableEscapeKey) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, disableEscapeKey]);

  useEffect(() => {
    if (isOpen) {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else {
        const focusableElements = sheetRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements?.[0] as HTMLElement;
        firstElement?.focus();
      }
    }
  }, [isOpen, initialFocusRef]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!disableClickOutside && sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, disableClickOutside]);

  if (!isMounted || !portalContainer) {
    return null;
  }

  const getAnimationProps = () => {
    switch (position) {
      case "left":
        return { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" } };
      case "right":
        return { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };
      case "top":
        return { initial: { y: "-100%" }, animate: { y: 0 }, exit: { y: "-100%" } };
      case "bottom":
        return { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };
      default:
        return { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };
    }
  };

  const portal = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={twMerge(
              "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
              overlayClassName
            )}
            onClick={disableClickOutside ? undefined : onClose}
          />

          <motion.div
            {...getAnimationProps()}
            ref={sheetRef}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "sheet-title" : undefined}
            className={twMerge(
              "fixed z-[51] bg-background border-l border-border shadow-lg",
              position === "left" || position === "right" ? "h-svh" : "w-full",
              positionClasses[position],
              sizeClasses[size],
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full flex-col">
              {showHeader && (
                <SheetHeader
                  onClose={onClose}
                  showCloseButton={showCloseButton}
                  className={position === "bottom" ? "order-last" : ""}
                >
                  {title && (
                    <h2 id="sheet-title" className="text-lg font-semibold">
                      {title}
                    </h2>
                  )}
                </SheetHeader>
              )}

              <SheetContent>{children}</SheetContent>

              {showFooter && <SheetFooter>{children}</SheetFooter>}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(portal, portalContainer);
};

interface SheetHeaderProps {
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}

const SheetHeader = ({ children, className = "", showCloseButton = true, onClose }: SheetHeaderProps) => {
  return (
    <header
      className={twMerge(
        "sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/95 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="flex-1">{children}</div>
      {showCloseButton && onClose && (
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="h-8 w-8 rounded-full p-0"
        >
          <FiX className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      )}
    </header>
  );
};

interface SheetContentProps {
  children: React.ReactNode;
  className?: string;
}

const SheetContent = ({ children, className = "" }: SheetContentProps) => {
  return (
    <div className={twMerge("flex-1 overflow-y-auto overscroll-contain", className)}>
      {children}
    </div>
  );
};

interface SheetFooterProps {
  children: React.ReactNode;
  className?: string;
}

const SheetFooter = ({ children, className = "" }: SheetFooterProps) => {
  return (
    <footer
      className={twMerge(
        "sticky bottom-0 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      {children}
    </footer>
  );
};

export { Sheet, SheetContent, SheetFooter, SheetHeader };
