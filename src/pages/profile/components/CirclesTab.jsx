import React from "react";
import CercleCard from "../../../components/profile components/CercleCard";

const CirclesTab = () => {
  return (
    <div className="px-3 py-4 sm:px-6 sm:py-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((circle) => (
          <CercleCard key={circle} />
        ))}
      </div>
    </div>
  );
};

export default CirclesTab;
