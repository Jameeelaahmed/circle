import CircleCard from "../CircleCard/CircleCardPresentational";

const CirclesTab = ({ joinedCircles }) => {
  return (
    <div className="px-3 py-4 sm:px-6 sm:py-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {joinedCircles.map((circle) => (
          <CircleCard key={circle} />
        ))}
      </div>
    </div>
  );
};

export default CirclesTab;
