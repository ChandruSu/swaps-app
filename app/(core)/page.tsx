"use server";

import { auth, signIn } from "@/auth";
import { Panel } from "@/components/Panel";

export default async function Home() {
  return (
    <main className="p-18 flex h-full flex-col items-start justify-center justify-items-center gap-8">
      <h1 className="gradient-p fade-up text-8xl font-bold text-foreground">
        Swapsss
      </h1>
      <p className="fade-up text-2xl font-light">
        Exchanging goods made simple
      </p>
      <p className="fade-up-2 mb-16 w-1/2 text-xl font-light text-slate-600">
        Exchanging goods made simple Exchanging goods made simple Exchanging
        goods made simple Exchanging goods made simple
      </p>
    </main>
  );
}
