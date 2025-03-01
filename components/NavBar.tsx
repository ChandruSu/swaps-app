"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type NavOption = { label: string; path: string };

interface NavBarProps {
  options: NavOption[];
}

export function NavBar({ options }: NavBarProps) {
  const path = usePathname();
  const session = useSession();
  const page = useMemo(
    () => options.find((o) => path.endsWith(o.path))?.label,
    [path],
  );

  return (
    <div className="grid grid-cols-[1fr_5fr_1fr] mx-12">
      <div className="flex items-center">
        {path === "/" || <p className="font-semibold text-3xl text-foreground">Swaps<span className="font-light">s</span></p>}
      </div>
      <div className="flex items-center justify-center gap-6">
        {options.map((option, i) => (
          <Link key={option.label} href={option.path}>
            <div
              className={`rounded-full bg-foreground px-6 py-2 transition-all duration-200 ${option.label === page ? "bg-opacity-100 text-background hover:brightness-125" : "bg-transparent text-foreground hover:bg-[#0f0f0f40]"}`}
            >
              <p className="text-lg font-light capitalize">{option.label}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-end gap-4">
        {session.status === "authenticated" ? (
          <button
            onClick={() => signOut()}
            className="min-w-28 rounded-full bg-white px-6 py-2 text-center shadow-sm transition-all duration-200 hover:brightness-90"
          >
            <p>Logout</p>
          </button>
        ) : (
          <Link
            href={"/login"}
            className="min-w-28 rounded-full bg-white px-6 py-2 text-center shadow-sm transition-all duration-200 hover:brightness-90"
          >
            <p>Login</p>
          </Link>
        )}
      </div>
    </div>
  );
}
