import { useState, useEffect } from "react";
import MemoriesPresentational from "./MemoriesPresentational.jsx";
import { useNavigate, useParams } from "react-router";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config.js";
const MemoriesGallery = () => {
  const [memories, setMemories] = useState([]);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { circleId } = useParams();
  const sampleMemories = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
      title: "Mountain Adventure",
      date: "2024-06-15",
      location: "Rocky Mountains, Colorado",
      category: "travel",
      description:
        "An amazing hike through the beautiful Rocky Mountains with friends.",
      likes: 24,
      tags: ["nature", "hiking", "mountains"],
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
      title: "Family BBQ",
      date: "2024-07-04",
      location: "Backyard, Home",
      category: "family",
      description: "Fourth of July celebration with the whole family.",
      likes: 18,
      tags: ["family", "celebration", "summer"],
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      title: "Beach Sunset",
      date: "2024-05-20",
      location: "Malibu, California",
      category: "travel",
      description: "Perfect sunset at Malibu beach during our weekend getaway.",
      likes: 32,
      tags: ["beach", "sunset", "ocean"],
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?w=800&h=600&fit=crop",
      title: "Birthday Celebration",
      date: "2024-03-12",
      location: "Downtown Restaurant",
      category: "celebration",
      description: "My 25th birthday dinner with closest friends.",
      likes: 15,
      tags: ["birthday", "friends", "dinner"],
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      title: "Forest Walk",
      date: "2024-04-08",
      location: "Redwood Forest, CA",
      category: "nature",
      description: "Peaceful morning walk through the ancient redwoods.",
      likes: 28,
      tags: ["forest", "nature", "peaceful"],
    },
  ];

  useEffect(() => {
    const getMemories = async () => {
      const docRef = collection(db, "circles", circleId, "memories");
      const res = await getDocs(docRef);

      const memories = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(memories);
      setMemories(memories);
    };
    getMemories();
  }, []);

  const filteredMemories = memories.filter((memory) => {
    const matchesSearch =
      memory.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memory.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleFileUpload = async (event) => {
    // const files = event.target.files;
    // if (!files.length) return;

    navigate(`/circles/${circleId}/memories/add`);
    return;

    setIsUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      const newMemory = {
        id: Date.now() + i,
        url: url,
        title: file.name.split(".")[0],
        date: new Date().toISOString().split("T")[0],
        location: "Unknown Location",
        category: "uncategorized",
        description: "Recently uploaded memory",
        likes: 0,
        tags: ["new", "upload"],
      };
      setMemories((prev) => [newMemory, ...prev]);
    }

    setIsUploading(false);
    event.target.value = "";
  };

  const openLightbox = (memory) => setSelectedMemory(memory);
  const closeLightbox = () => setSelectedMemory(null);
  const navigateMemory = (direction) => {
    const currentIndex = filteredMemories.findIndex(
      (m) => m.id === selectedMemory.id,
    );
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % filteredMemories.length
        : currentIndex === 0
          ? filteredMemories.length - 1
          : currentIndex - 1;
    setSelectedMemory(filteredMemories[newIndex]);
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <MemoriesPresentational
      openLightbox={openLightbox}
      closeLightbox={closeLightbox}
      navigateMemory={navigateMemory}
      selectedMemory={selectedMemory}
      filteredMemories={filteredMemories}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      isUploading={isUploading}
      formatDate={formatDate}
      handleFileUpload={handleFileUpload}
    />
  );
};

export default MemoriesGallery;
