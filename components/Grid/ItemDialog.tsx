"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem } from "@/app/api/lib/api";

interface ItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ItemDialog({ open, onOpenChange }: ItemDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]); 

  const queryClient = useQueryClient();

  // Available tags based on your API interface
  const availableTags = ["ELECTRONICS", "CLOTHING", "FURNITURE", "BOOKS"];

  // const createItemMutation = useMutation({
  //   mutationFn: async () => {
  //     const formData = new FormData();
      
  //     // Required fields from your CreateItemRequest interface
  //     formData.append("title", title);
  //     formData.append("description", description || "");
      
  //     // Add user ID - using a placeholder value here, you should replace with actual user ID
  //     formData.append("ownerId", "current-user-id"); 
      
  //     // Add tags
  //     selectedTags.forEach(tag => {
  //       formData.append("tags[]", tag);
  //     });
      
  //     // Add image if available
  //     if (file) formData.append("image", file);

  //     return await createItem(formData);
  //   },
  //   onSuccess: () => {
  //     // Reset form fields
  //     setTitle("");
  //     setDescription("");
  //     setFile(null);
  //     setSelectedTags([]);
      
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: ["items"] });
  //     onOpenChange(false);
  //   },
  //   onError: (error) => {
  //     console.error("Error creating item:", error);
  //     alert("Failed to create item: " + (error instanceof Error ? error.message : "Unknown error"));
  //   }
  // });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    // createItemMutation.mutate();
    alert(title);
  };

  const handleCancel = () => {
    // Reset form fields when canceling
    setTitle("");
    setDescription("");
    setFile(null);
    setSelectedTags([]);
    onOpenChange(false);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title *
            </label>
            <Input 
              id="title"
              placeholder="Title" 
              required 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea 
              id="description"
              placeholder="Description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`tag-${tag}`}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => toggleTag(tag)}
                  />
                  <label 
                    htmlFor={`tag-${tag}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {tag.charAt(0) + tag.slice(1).toLowerCase()}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <Input 
              id="image"
              type="file" 
              accept="image/*" 
              onChange={(e) => setFile(e.target.files?.[0] || null)} 
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" onClick={handleCancel} type="button">
              Cancel
            </Button>
            <Button 
              type="submit" 
              // disabled={createItemMutation.isPending || !title.trim()}
            >
              {/* {createItemMutation.isPending ? "Adding..." : "Add Item"} */}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}