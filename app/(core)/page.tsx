"use server";

import { auth, signIn } from "@/auth";
import { Ripple } from "@/components/magicui/ripple";
import { Panel } from "@/components/Panel";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="grid h-full grid-cols-2 gap-6 p-32">
      <div className="flex flex-col items-start justify-center justify-items-center gap-8">
        <h1 className="gradient-p fade-up text-8xl font-bold text-foreground">
          Swapsss
        </h1>
        <p className="fade-up text-2xl font-light">
          Exchanging goods made simple
        </p>
        <p className="fade-up-2 mb-16 text-xl font-light text-slate-600">
          Exchanging goods made simple Exchanging goods made simple Exchanging
          goods made simple Exchanging goods made simple
        </p>
      </div>

      <div className="relative flex items-center justify-center">
        <Ripple />
        <Link href="/dashboard">
          <p className="rounded-full bg-foreground px-8 py-4 text-xl font-medium text-background shadow-2xl transition-all duration-200 hover:bg-[#303030]">
            Start Trading
          </p>
        </Link>
      </div>
    </main>
  );
}
