import { useState } from "react";
import { Upload, Heart, Sparkles, Camera, X } from "lucide-react";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export default function MemoryUploadPage() {
  const [currentMemory, setCurrentMemory] = useState({
    name: "",
    description: "",
    images: [],
    imagePreviews: null,
  });
  const [isDragging, setIsDragging] = useState(false);
  const { circleId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleImageUpload(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const clearAllImages = () => {
    setCurrentMemory((prev) => ({ ...prev, images: [], imagePreviews: [] }));
  };
  const removeImageAt = (idx) => {
    setCurrentMemory((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== idx),
      imagePreviews: (prev.imagePreviews || []).filter((_, i) => i !== idx),
    }));
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleImageUpload = (files) => {
    if (!files || files.length === 0) return;

    const validImages = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );

    if (validImages.length > 0) {
      validImages.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCurrentMemory((prev) => ({
            ...prev,
            images: [...(prev.images || []), file],
            imagePreviews: [...(prev.imagePreviews || []), e.target.result],
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };
  const CLOUD_NAME = "dwh8jhaot";
  const UPLOAD_PRESET = "images";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);

    try {
      // Basic validation
      const files = currentMemory?.images ?? [];
      if (!files.length) {
        toast.error("Please upload at least one image");
        return;
      }

      // Helper: upload a single file to Cloudinary
      const uploadOne = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        // Optional but handy for organization in Cloudinary
        formData.append("folder", `circles/${circleId}`);
        // You can attach custom context/tags too:
        // formData.append('context', `circleId=${circleId}|name=${currentMemory?.name ?? ''}`);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          },
        );

        if (!res.ok) {
          // Try to extract Cloudinary error message
          let msg = "Upload failed";
          try {
            const err = await res.json();
            msg = err?.error?.message || msg;
          } catch {
            /* ignore */
          }
          throw new Error(msg);
        }

        const data = await res.json();
        // prefer https url
        return data.secure_url || data.url;
      };

      // Upload all files in parallel
      const results = await Promise.allSettled(files.map(uploadOne));
      const uploadedUrls = results
        .filter((r) => r.status === "fulfilled" && !!r.value)
        .map((r) => r.value);

      // Optionally surface per-file failures
      const failed = results.filter((r) => r.status === "rejected");
      if (failed.length) {
        console.warn(
          "Some uploads failed:",
          failed.map((f) => f.reason),
        );
        toast.warning(
          `Uploaded ${uploadedUrls.length}/${files.length} image(s). Some failed.`,
        );
      }

      if (!uploadedUrls.length) {
        throw new Error("All uploads failed. Please try again.");
      }

      // Save URLs to Firestore
      const memoriesRef = collection(db, "circles", circleId, "memories");
      await addDoc(memoriesRef, {
        createdAt: serverTimestamp(),
        urls: uploadedUrls,
        name: (currentMemory?.name || "").trim(),
        description: (currentMemory?.description || "").trim(),
        date: new Date().toISOString().split("T")[0],
        ownerUid: auth.currentUser?.uid || null,
      });

      toast.success("Memories added successfully");
      navigate(`/circles/${circleId}/memories`);
    } catch (err) {
      console.error(err);
      toast.error(
        err?.message || "Something went wrong while saving your memories.",
      );
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="mt-[65px] bg-gradient-to-b from-bg-primary to-bg-secondary min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-bg-primary to-bg-secondary border-primary border-b shadow-lg backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="mb-2 flex items-center gap-3">
            <div className="from-primary to-secondary rounded-xl bg-gradient-to-r p-3 text-primary">
              <Heart className="h-6 w-6" />
            </div>
            <h1 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
              Memory Keeper
            </h1>
          </div>
          <p className="text-text text-lg">
            Preserve your precious moments forever
          </p>
        </div>
      </div>

      <div className="mx-auto bg-gradient-to-b from-bg-primary to-bg-secondary max-w-2xl px-6 py-8">
        {/* Upload Form */}
        <div className=" mb-8 rounded-2xl border border-text p-8 shadow-xl backdrop-blur-sm">
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="text-primary h-5 w-5" />
            <h2 className="text-text text-2xl font-semibold">Add New Memory</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-gradient-to-b from-bg-primary to-bg-secondary">
            {/* Image Upload */}
            <div>
              <label className="mb-3 block text-sm font-medium text-text">
                Upload Pictures
              </label>

              {!currentMemory.imagePreviews?.length ? (
                <div
                  className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-300 ${isDragging
                    ? "scale-105 border-purple-400 bg-purple-50"
                    : "border-text hover:border-purple-400 "
                    }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <Camera className="mx-auto mb-4 h-12 w-12 text-text" />
                  <p className="mb-2 text-lg font-medium text-text">
                    Drop your images here or click to browse
                  </p>
                  <p className="text-sm text-text">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Previews grid */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {currentMemory.imagePreviews.map((src, idx) => (
                      <div key={idx} className="group relative">
                        <img
                          src={src}
                          alt={`Preview ${idx + 1}`}
                          className="h-32 w-full rounded-xl object-cover shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImageAt(idx)}
                          className="absolute top-2 right-2 hidden rounded-full bg-red-500 p-2 text-text shadow-lg transition-colors group-hover:block hover:bg-red-600"
                          aria-label="Remove image"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="relative inline-block">
                      <span className="cursor-pointer rounded-xl border px-4 py-2 text-sm font-medium text-text transition hover:bg-text-50">
                        Add more
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleImageUpload(e.target.files)}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={clearAllImages}
                      className="rounded-xl border px-4 py-2 text-sm font-medium text-text transition hover:bg-text-50"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Memory Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-text">
                Memory Name
              </label>
              <input
                type="text"
                value={currentMemory.name || ""}
                onChange={(e) =>
                  setCurrentMemory((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="Give your memory a special name..."
                className="text-text w-full rounded-xl border border-text px-4 py-3 text-lg transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-text">
                Description
              </label>
              <textarea
                value={currentMemory.description || ""}
                onChange={(e) =>
                  setCurrentMemory((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Tell the story behind this memory..."
                rows={4}
                className="text-text w-full resize-none rounded-xl border border-text px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                !currentMemory.name ||
                !currentMemory.description ||
                !currentMemory.images?.length ||
                isLoading
              }
              className="from-primary to-secondary w-full transform rounded-xl bg-gradient-to-r px-6 py-4 text-lg font-semibold text-text shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="flex items-center justify-center gap-2">
                <Upload className="h-5 w-5" />
                {isLoading ? "saving memories..." : "Save Memory"}
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
