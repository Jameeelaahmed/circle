import { useState } from "react";
import { Upload, Heart, Sparkles, Camera, X } from "lucide-react";
import {
  addDoc,
  collection,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export default function MemoryUploadPage() {
  const [memories, setMemories] = useState([]);
  const [currentMemory, setCurrentMemory] = useState({
    name: "",
    description: "",
    image: null,
    imagePreview: null,
  });
  const [isDragging, setIsDragging] = useState(false);
  const { circleId } = useParams();
  const navigate = useNavigate();

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrentMemory((prev) => ({
          ...prev,
          image: file,
          imagePreview: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", currentMemory.image);
    formData.append("upload_at", new Date().toISOString().split("T")[0]);
    formData.append("cloud_name", "dwh8jhaot");
    formData.append("upload_preset", "images");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dwh8jhaot/image/upload",
      {
        method: "POST",
        body: formData,
      },
    );
    const uploadedImageUrl = await res.json();
    const url = uploadedImageUrl.url;

    const memoriesRef = collection(db, "circles", circleId, "memories");
    // const snapshot = await getDocs(memoriesRef);
  
      await addDoc(memoriesRef, {
        createdAt: Timestamp.now(),
        url,
        name: currentMemory.name,
        description: currentMemory.description,
        date: new Date().toISOString().split("T")[0]
      });
  

    toast.success("Memory added Successfully");
    navigate(`/circles/${circleId}/memories`)
  };

  const clearCurrentImage = () => {
    setCurrentMemory((prev) => ({
      ...prev,
      image: null,
      imagePreview: null,
    }));
  };

  return (
    <div className="mt-[65px] min-h-screen">
      {/* Header */}
      <div className="bg-main/15 border-primary border-b shadow-lg backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="mb-2 flex items-center gap-3">
            <div className="from-primary to-secondary rounded-xl bg-gradient-to-r p-3 text-white">
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

      <div className="mx-auto max-w-2xl px-6 py-8">
        {/* Upload Form */}
        <div className="bg-main mb-8 rounded-2xl border border-white/50 p-8 shadow-xl backdrop-blur-sm">
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="text-primary h-5 w-5" />
            <h2 className="text-text text-2xl font-semibold">Add New Memory</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Upload Picture
              </label>

              {!currentMemory.imagePreview ? (
                <div
                  className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
                    isDragging
                      ? "scale-105 border-purple-400 bg-purple-50"
                      : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <Camera className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <p className="mb-2 text-lg font-medium text-gray-600">
                    Drop your image here or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={currentMemory.imagePreview}
                    alt="Preview"
                    className="h-64 w-full rounded-xl object-cover shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={clearCurrentImage}
                    className="absolute top-2 right-2 rounded-full bg-red-500 p-2 text-white shadow-lg transition-colors hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Memory Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Memory Name
              </label>
              <input
                type="text"
                value={currentMemory.name}
                onChange={(e) =>
                  setCurrentMemory((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="Give your memory a special name..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={currentMemory.description}
                onChange={(e) =>
                  setCurrentMemory((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Tell the story behind this memory..."
                rows={4}
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                !currentMemory.name ||
                !currentMemory.description ||
                !currentMemory.image
              }
              className="from-primary to-secondary w-full transform rounded-xl bg-gradient-to-r px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="flex items-center justify-center gap-2">
                <Upload className="h-5 w-5" />
                Save Memory
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
