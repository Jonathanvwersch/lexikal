"use client";

import React, { useState, useRef, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TagInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

function TagInput({ tags, setTags, ...props }: TagInputProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && input === "" && tags.length > 0) {
      e.preventDefault();
      removeTag(tags[tags.length - 1]);
    }
  };

  const addTag = () => {
    const trimmedInput = input.trim();
    if (trimmedInput && !tags.includes(trimmedInput)) {
      setTags([...tags, trimmedInput]);
      setInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="text-sm">
          {tag}
          <Button
            variant="ghost"
            size="sm"
            className="ml-1 h-4 w-4 p-0"
            onClick={() => removeTag(tag)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      <Input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="flex-grow border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Type and press Enter to add tags"
        {...props}
      />
    </div>
  );
}

export { TagInput };
