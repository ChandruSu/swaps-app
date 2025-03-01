import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Client } from "./client";

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login");
  }

  return (
    <div className="grid grid-cols-[1fr_3fr] h-full gap-5 mx-32 overflow-hidden">
      <Client />
    </div>
  );
}
