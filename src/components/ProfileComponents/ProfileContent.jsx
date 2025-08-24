import { useEffect, useState } from "react";
import AboutTab from "./AboutTab";
import CirclesTab from "./CirclesTab";
import { getCircleById } from "../../fire_base/circleController/circleController";

const ProfileContent = ({ activeTab, profileData }) => {
  const [joinedCircles, setJoinedCircles] = useState([]);
  const [isLoadingCircles, setIsLoadingCircles] = useState(false);

  useEffect(() => {
    const fetchCircleData = async () => {
      // Reset circles and set loading state
      setJoinedCircles([]);
      setIsLoadingCircles(true);

      try {
        // Check if profileData and joinedCircles exist
        if (
          !profileData?.joinedCircles ||
          !Array.isArray(profileData.joinedCircles)
        ) {
          setIsLoadingCircles(false);
          return;
        }

        // Fetch all circles concurrently instead of sequentially
        const circlePromises = profileData.joinedCircles.map((circleId) =>
          getCircleById(circleId).catch((error) => {
            console.error(`Error fetching circle ${circleId}:`, error);
            return null; // Return null for failed requests
          }),
        );

        const circles = await Promise.all(circlePromises);

        // Filter out null values (failed requests) and set the circles
        const validCircles = circles.filter(
          (circle) => circle !== null && circle !== undefined,
        );
        setJoinedCircles(validCircles);

      } catch (error) {
        console.error("Error fetching circle data:", error);
        setJoinedCircles([]); // Set empty array on error
      } finally {
        setIsLoadingCircles(false);
      }
    };

    // Only fetch when circles tab is active and we have profile data
    if (activeTab === "circles" && profileData) {
      fetchCircleData();
    } else if (activeTab !== "circles") {
      // Reset state when switching away from circles tab
      setJoinedCircles([]);
      setIsLoadingCircles(false);
    }
  }, [activeTab, profileData?.uid]); // Use uid as dependency to avoid infinite loops

  return (
    <div className="bg-text/5 mb-10 rounded-2xl shadow-md backdrop-blur-2xl">
      {activeTab === "about" && (
        <AboutTab
          uid={profileData?.uid}
          interests={profileData?.interests ?? []}
          recentActivities={profileData?.joinedEvents ?? []} // Fixed typo: joninedEvents -> joinedEvents
        />
      )}

      {activeTab === "circles" && (
        <CirclesTab
          joinedCircles={joinedCircles}
          joinedCirclesIds={profileData.joinedCircles}
          isLoading={isLoadingCircles}
        />
      )}
    </div>
  );
};

export default ProfileContent;
