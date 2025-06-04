"use client";

import Link from "next/link";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

const navigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
    { name: "Terms", href: "/terms" },
    { name: "Privacy", href: "/privacy" },
  ],
  social: [
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: FiTwitter,
    },
    {
      name: "GitHub",
      href: "https://github.com",
      icon: FiGithub,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: FiLinkedin,
    },
  ],
};

export function Footer() {
  return (
    <footer className='bg-background border-t border-border'>
      <div className='mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8'>
        <nav className='-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12' aria-label='Footer'>
          {navigation.main.map((item) => (
            <div key={item.name} className='pb-6'>
              <Link href={item.href} className='text-sm leading-6 text-foreground-muted hover:text-foreground'>
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className='mt-10 flex justify-center space-x-10'>
          {navigation.social.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className='text-foreground-muted hover:text-foreground'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='sr-only'>{item.name}</span>
              <item.icon className='h-6 w-6' aria-hidden='true' />
            </Link>
          ))}
        </div>
        <p className='mt-10 text-center text-xs leading-5 text-foreground-muted'>
          &copy; {new Date().getFullYear()} ChromaFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
