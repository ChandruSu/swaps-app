"use server";

import { auth, signIn } from "@/auth";
import { Panel } from "@/components/Panel";

export default async function Home() {
  const session = await auth();
  return (
    <main className="p-18 flex flex-col items-start gap-5">
      <h1 className="gradient-p text-6xl font-bold text-foreground">Swapss</h1>
      <p className="text-2xl font-light">Exchanging goods made simple</p>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <Panel>
          <button type="submit">Signin with Google</button>
          <p>{session?.user?.email}</p>
        </Panel>
      </form>
    </main>
  );
}
