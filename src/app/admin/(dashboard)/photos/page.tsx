"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Upload, Trash2, Pencil, MapPin, X, Check, Loader2, ImageIcon } from "lucide-react";

interface Photo {
  id: string;
  url: string;
  caption: string | null;
  location: string | null;
  region: string;
  createdAt: string;
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    caption: "",
    location: "",
    region: "",
  });
  const [uploadRegion, setUploadRegion] = useState("");
  const [newRegion, setNewRegion] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const params = activeRegion ? `?region=${activeRegion}` : "";
      const res = await fetch(`/api/photos${params}`);
      const data = await res.json();
      setPhotos(data.photos);
      setRegions(data.regions);
    } catch {
      // failed
    } finally {
      setLoading(false);
    }
  }, [activeRegion]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const handleUpload = async (files: FileList) => {
    const region = uploadRegion || newRegion;
    if (!region) {
      alert("请选择或输入地区");
      return;
    }
    setUploading(true);

    for (const file of Array.from(files)) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", "photos");

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();

        if (uploadData.url) {
          await fetch("/api/photos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              url: uploadData.url,
              region,
              caption: "",
              location: "",
            }),
          });
        }
      } catch {
        // failed
      }
    }

    setUploading(false);
    setNewRegion("");
    fetchPhotos();
  };

  const handleUpdate = async (id: string) => {
    await fetch(`/api/photos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setEditingId(null);
    fetchPhotos();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("确定删除？")) return;
    await fetch(`/api/photos/${id}`, { method: "DELETE" });
    fetchPhotos();
  };

  const startEdit = (photo: Photo) => {
    setEditingId(photo.id);
    setEditForm({
      caption: photo.caption || "",
      location: photo.location || "",
      region: photo.region,
    });
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">照片管理</h1>
        <p className="mt-1 text-sm text-neutral-500">按地区分类管理照片</p>
      </div>

      {/* Upload Section */}
      <div className="mb-6 rounded-xl border border-neutral-200 bg-white p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <select
              value={uploadRegion}
              onChange={(e) => {
                setUploadRegion(e.target.value);
                if (e.target.value) setNewRegion("");
              }}
              className="rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
            >
              <option value="">选择地区...</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <span className="text-sm text-neutral-400">或</span>
            <input
              type="text"
              value={newRegion}
              onChange={(e) => {
                setNewRegion(e.target.value);
                if (e.target.value) setUploadRegion("");
              }}
              className="rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
              placeholder="新地区名称"
            />
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || (!uploadRegion && !newRegion)}
            className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {uploading ? "上传中..." : "上传照片"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files?.length) handleUpload(e.target.files);
              e.target.value = "";
            }}
            className="hidden"
          />
        </div>
      </div>

      {/* Region Tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveRegion(null)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
            !activeRegion
              ? "bg-amber-500 text-white"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          }`}
        >
          全部
        </button>
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setActiveRegion(region)}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              activeRegion === region
                ? "bg-amber-500 text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            <MapPin className="h-3 w-3" />
            {region}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <p className="col-span-full py-12 text-center text-neutral-400">加载中...</p>
        ) : photos.length === 0 ? (
          <div className="col-span-full flex flex-col items-center py-12 text-neutral-400">
            <ImageIcon className="mb-2 h-12 w-12" />
            <p>暂无照片</p>
          </div>
        ) : (
          photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white"
            >
              <img
                src={photo.url}
                alt={photo.caption || ""}
                className="aspect-square w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-sm font-medium">{photo.caption || "无标题"}</p>
                <p className="text-xs opacity-75">
                  {photo.region}
                  {photo.location ? ` · ${photo.location}` : ""}
                </p>
              </div>
              <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => startEdit(photo)}
                  className="rounded-full bg-white/90 p-1.5 text-neutral-700 shadow-sm hover:bg-white"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="rounded-full bg-white/90 p-1.5 text-red-500 shadow-sm hover:bg-white"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">编辑照片信息</h3>
              <button
                onClick={() => setEditingId(null)}
                className="text-neutral-400 hover:text-neutral-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">标题</label>
                <input
                  type="text"
                  value={editForm.caption}
                  onChange={(e) => setEditForm((f) => ({ ...f, caption: e.target.value }))}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">地点</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm((f) => ({ ...f, location: e.target.value }))}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">地区</label>
                <input
                  type="text"
                  value={editForm.region}
                  onChange={(e) => setEditForm((f) => ({ ...f, region: e.target.value }))}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setEditingId(null)}
                className="rounded-lg border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50"
              >
                取消
              </button>
              <button
                onClick={() => handleUpdate(editingId)}
                className="flex items-center gap-1 rounded-lg bg-amber-500 px-4 py-2 text-sm text-white hover:bg-amber-600"
              >
                <Check className="h-4 w-4" />
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
