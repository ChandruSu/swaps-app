import { Button } from "@/components/ui/button";
import { Item } from "@/app/api/lib/api";

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img
        src={item.imageUrl || "/placeholder-image.png"}
        alt={item.title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h2 className="text-lg font-bold mt-2">{item.title}</h2>
      <p className="text-sm text-gray-600">{item.description || "No description available"}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {item.tags.map((tag) => (
          <span key={tag} className="text-xs bg-gray-200 px-2 py-1 rounded-md">
            {tag.replace("_", " ")}
          </span>
        ))}
      </div>
      <Button variant="outline" size="sm" className="mt-2">
        View Item
      </Button>
    </div>
  );
}
