import MemoriesPresentational from "./MemoriesPresentational";
import "./upload.css"
function MemoriesContainer() {
  const staticMemories = [
    "src/assets/images/memories/1.webp",
    "src/assets/images/memories/2.webp",
    "src/assets/images/memories/3.webp",
  ];

  return (
    <MemoriesPresentational
      imageList={staticMemories}
    />
  );
}
export default MemoriesContainer;
