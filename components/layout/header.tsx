"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

const logoSrc =
  "https://media.goodtimesco.in/t/w_260,q_90,f_webp/attendez-website/Attendez-logo.png";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center" aria-label="Attendez home">
          <Image
            src={logoSrc}
            alt="Attendez Marketing"
            width={260}
            height={67}
            priority
            unoptimized
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) =>
            item.href === "/services" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                onFocus={() => setServicesOpen(true)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setServicesOpen(false);
                  }
                }}
              >
                <Link
                  href={item.href}
                  onClick={() => setServicesOpen(false)}
                  className={cn(
                    "inline-flex h-16 items-center text-sm text-muted-foreground transition-colors hover:text-foreground",
                    isActive(item.href) && "font-medium text-foreground",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "ml-1 h-3.5 w-3.5 transition-transform",
                      servicesOpen && "rotate-180",
                    )}
                  />
                </Link>
                <div
                  className={cn(
                    "absolute left-1/2 top-full w-[380px] -translate-x-1/2 pt-3 transition duration-150",
                    servicesOpen ? "visible opacity-100" : "invisible opacity-0",
                  )}
                >
                  <div className="rounded-xl border border-border bg-background p-2 shadow-[var(--shadow-card)]">
                    <Link
                      href="/services"
                      onClick={() => setServicesOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
                    >
                      View all services
                    </Link>
                    <div className="my-1 border-t border-border" />
                    {services.map((service) => {
                      const Icon = service.icon;

                      return (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          onClick={() => setServicesOpen(false)}
                          className="grid grid-cols-[32px_1fr] gap-3 rounded-lg px-3 py-2.5 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md bg-accent text-accent-foreground">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span>
                            <span className="block text-sm font-medium text-foreground">
                              {service.title}
                            </span>
                            <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                              {service.short}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm text-muted-foreground transition-colors hover:text-foreground",
                  isActive(item.href) && "font-medium text-foreground",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <Link href="/contact">Book a discovery call</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {nav.map((item) =>
              item.href === "/services" ? (
                <div key={item.href}>
                  <button
                    type="button"
                    aria-expanded={mobileServicesOpen}
                    onClick={() => setMobileServicesOpen((value) => !value)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
                      isActive(item.href) && "bg-muted font-medium text-foreground",
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform",
                        mobileServicesOpen && "rotate-180",
                      )}
                    />
                  </button>
                  {mobileServicesOpen && (
                    <div className="mt-1 space-y-1 pl-3">
                      <Link
                        href="/services"
                        onClick={() => {
                          setOpen(false);
                          setMobileServicesOpen(false);
                        }}
                        className={cn(
                          "block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
                          pathname === "/services" && "bg-muted font-medium text-foreground",
                        )}
                      >
                        View all services
                      </Link>
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          onClick={() => {
                            setOpen(false);
                            setMobileServicesOpen(false);
                          }}
                          className={cn(
                            "block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
                            pathname === `/services/${service.slug}` && "bg-muted font-medium text-foreground",
                          )}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
                    isActive(item.href) && "bg-muted font-medium text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
            <Button asChild className="mt-2 w-full" onClick={() => setOpen(false)}>
              <Link href="/contact">Book a discovery call</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}