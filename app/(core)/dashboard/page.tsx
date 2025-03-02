import { auth } from "@/auth";
import { Panel } from "@/components/Panel";
import Image from "next/image";
import { redirect } from "next/navigation";

interface Item {
  title: string,
  message: string,
  imageUrl: string
}

export function Button({ label }: { label: string }) {
  return (
    <button className="p-3 bg-foreground text-background text-sm font-medium rounded-lg hover:-translate-y-1 transition-all duration-200">
      {label}
    </button>
  )
}

export function ProductCard({ item }: { item: Item }) {
  return (
    <button className="hover:-translate-y-2 hover:rotate-1 transition-all duration-200">
      <Panel className="p-0 rounded-xl shadow flex flex-col gap-2 overflow-hidden">
        <Image src={item.imageUrl} width="200" height="200" alt="image" className="w-full" />
        <div className="flex flex-col items-start gap-2 p-3">
          <p className="text-foreground text-lg font-medium">{item.title}</p>
          <p className="text-foreground text-lg font-light">{item.message}</p>
        </div>
      </Panel>
    </button>
  )
}

const products: Item[] = [
  { imageUrl: "/chair.webp", title: "Chair", message: "Cherished chair" },
  { imageUrl: "/chair.webp", title: "Chair", message: "Cherished chair" },
  { imageUrl: "/chair.webp", title: "Chair", message: "Cherished chair" },
  { imageUrl: "/chair.webp", title: "Chair", message: "Cherished chair" },
]

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login");
  }

  return (
    <div className="h-full w-full py-12 px-24">
      <Button label="+ Upload New" />
      <div className="p-10">
        <div className="grid grid-cols-4 gap-12 px-20">
          {products.map((item, i) => (
            <ProductCard key={`prod-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

