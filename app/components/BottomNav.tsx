"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home", key: "home" },
  { href: "/measure", label: "Measure", key: "measure" },
  { href: "/workouts", label: "Workouts", key: "workouts" },
  { href: "/progress", label: "Progress", key: "progress" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function BottomNav() {
  const pathname = usePathname() ?? "/";
  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 inset-x-0 z-40 border-t border-[var(--color-line)] bg-[var(--color-card)]/95 backdrop-blur md:static md:border-t-0 md:border-b md:bg-transparent md:backdrop-blur-none"
    >
      <ul className="mx-auto flex max-w-3xl items-stretch justify-around md:justify-end md:gap-6 px-4 md:py-3">
        {LINKS.map((l) => {
          const active = isActive(pathname, l.href);
          return (
            <li key={l.key} className="flex-1 md:flex-none">
              <Link
                href={l.href}
                className={`flex h-14 items-center justify-center text-sm tracking-wide uppercase md:h-auto ${
                  active ? "text-[var(--color-gold)]" : "text-stone-muted hover:text-[var(--color-stone)]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
