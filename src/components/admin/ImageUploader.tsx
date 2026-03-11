"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  category?: string;
  className?: string;
}

export function ImageUploader({
  value,
  onChange,
  category = "blogs",
  className,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", category);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.url) {
          onChange(data.url);
        }
      } catch {
        // Upload failed
      } finally {
        setUploading(false);
      }
    },
    [category, onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        uploadFile(file);
      }
    },
    [uploadFile],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        uploadFile(file);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [uploadFile],
  );

  if (value) {
    return (
      <div className={cn("relative", className)}>
        <img
          src={value}
          alt="uploaded"
          className="h-48 w-full rounded-lg border border-neutral-200 object-cover"
        />
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white transition-colors hover:bg-black/70"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onClick={() => fileInputRef.current?.click()}
      className={cn(
        "flex h-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors",
        dragOver
          ? "border-amber-400 bg-amber-50"
          : "border-neutral-300 bg-neutral-50 hover:border-amber-400 hover:bg-amber-50/50",
        className,
      )}
    >
      {uploading ? (
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      ) : (
        <>
          <Upload className="mb-2 h-8 w-8 text-neutral-400" />
          <p className="text-sm text-neutral-500">拖拽图片到此处或点击上传</p>
          <p className="mt-1 text-xs text-neutral-400">支持 JPG、PNG、WebP、GIF（最大 5MB）</p>
        </>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
