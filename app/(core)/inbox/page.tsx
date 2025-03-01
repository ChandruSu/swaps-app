import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Client } from "./client";

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login");
  }

  return (
    <div className="mx-32 grid h-full grid-cols-[1fr_3fr] gap-5 overflow-hidden">
      <Client />
    </div>
  );
}
