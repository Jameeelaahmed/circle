import React from "react";
import { Feather } from "lucide-react";
import DefaultState from "../DefaultState/DefaultState";
import ActivePollState from "../ActivePollState/ActivePollState";
import PollClosedState from "../PollClosedState/PollClosedState";
import EventConfirmedState from "../EventConfirmedState/EventConfirmedState";

const ContextualPin = ({
  currentStage,
  onStartPoll,
  activityPollData,
  placePollData,
  onFinishVoting,
  onVote,
  onAddOption,
  eventData,
  onRsvp,
  onStartNewPoll,
  onDismiss,
  onPollNextStep,
}) => {
  console.log("[ContextualPin] Current poll state:", currentStage);
  console.log(
    "[ContextualPin] Activity poll data:",
    activityPollData ? "Present" : "Missing"
  );
  console.log(
    "[ContextualPin] Place poll data:",
    placePollData ? "Present" : "Missing"
  );
  console.log("[ContextualPin] Event data:", eventData);

  const renderContent = () => {
    switch (currentStage) {
      case "Idle":
        return <DefaultState onStartPoll={onStartPoll} />;
      case "Planning the Activity":
        return (
          <ActivePollState
            pollData={activityPollData}
            onFinishVoting={onFinishVoting}
            onVote={onVote}
            onAddOption={(option) => onAddOption(option, "activity")}
          />
        );
      case "Activity Poll Closed":
        return (
          <PollClosedState
            data={{
              winningOption: { text: eventData?.winningActivity },
              nextStep: "poll_venue",
            }}
            onPollNextStep={onPollNextStep}
          />
        );
      case "Planning the Place":
        return (
          <ActivePollState
            pollData={placePollData}
            onFinishVoting={onFinishVoting}
            onVote={onVote}
            onAddOption={(option) => onAddOption(option, "place")}
          />
        );
      case "Place Poll Closed":
        return (
          <PollClosedState
            data={{
              winningOption: { text: eventData?.winningPlace },
              nextStep: "finalize_event",
            }}
            onPollNextStep={onPollNextStep}
            
          />
          
        );
      case "Event Confirmed":
        return (
          <EventConfirmedState
            eventData={eventData}
            onRsvp={onRsvp}
            onStartNewPoll={onStartNewPoll}
          />
        );
      default:
        return <DefaultState onStartPoll={onStartPoll} />;
    }
  };

  return (
    <div className="w-full flex flex-col items-center relative">
      <button
        className="absolute top-2 right-2 z-10 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition"
        onClick={onDismiss}
      >
      </button>
      {renderContent()}
    </div>
  );
};

export default ContextualPin;
