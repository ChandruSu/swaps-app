import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ItemGrid from "@/components/Grid/ItemGrid";

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login");
  }

  return <div>

    <ItemGrid />
  </div>;
}
