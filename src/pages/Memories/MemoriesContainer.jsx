import { useState, useEffect } from "react";
import MemoriesPresentational from "./MemoriesPresentational.jsx";
import { useNavigate, useParams } from "react-router";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase-config.js";
const MemoriesGallery = () => {
  const [memories, setMemories] = useState([]);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { circleId } = useParams();
  useEffect(() => {
    const getMemories = async () => {
      const docRef = collection(db, "circles", circleId, "memories");
      const res = await getDocs(docRef);

      const memories = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMemories(memories);
    };
    getMemories();
  }, []);

  const handleFileUpload = async (event) => {
    navigate(`/circles/${circleId}/memories/add`);
    return;
  };

  const openLightbox = (memory) => {
    setSelectedMemory(memory);
  };
  const closeLightbox = () => setSelectedMemory(null);
  const navigateMemory = (direction) => {
    const currentIndex = memories.findIndex((m) => m.id === selectedMemory.id);
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % memories.length
        : currentIndex === 0
          ? memories.length - 1
          : currentIndex - 1;
    setSelectedMemory(memories[newIndex]);
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
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      isUploading={isUploading}
      formatDate={formatDate}
      handleFileUpload={handleFileUpload}
      memories={memories}
    />
  );
};

export default MemoriesGallery;
