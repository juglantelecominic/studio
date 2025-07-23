"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Shop', href: '/shop' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-headline text-xl font-bold text-primary">
            Juglan TelecomInc
          </span>
        </Link>

        <nav className="hidden md:flex md:items-center md:space-x-6">
          {navItems.map((item) => (
            item.href.startsWith('#') ? (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          <Button asChild variant="default" className="bg-accent hover:bg-accent/90">
            <a href="#contact">Get a Quote</a>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px]">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                   <Link href="/" className="mr-6 flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                    <span className="font-headline text-lg font-bold text-primary">
                      Juglan TelecomInc
                    </span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-6 w-6" />
                     <span className="sr-only">Close menu</span>
                  </Button>
                </div>
              
                {navItems.map((item) => (
                  item.href.startsWith('#') ? (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-secondary"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-secondary"
                    >
                      {item.label}
                    </Link>
                  )
                ))}
                <Button asChild variant="default" className="w-full bg-accent hover:bg-accent/90" onClick={() => setIsOpen(false)}>
                  <a href="#contact">Get a Quote</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
