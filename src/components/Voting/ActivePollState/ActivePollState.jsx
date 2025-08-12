import React, { useState, useEffect } from 'react';
import SendBtn from '../../ui/ReactBits/SendBtn/SendBtn';

  const ActivePollState = ({ pollData, onFinishVoting, onVote, onAddOption }) => {
  const [remainingTime, setRemainingTime] = useState('');
  const [isExpired, setIsExpired] = useState(false);
  const [showAddOption, setShowAddOption] = useState(false);
  const [newOptionText, setNewOptionText] = useState('');
  const [message, setMessage] = useState(''); // Custom message state for alerts

  // Timer logic from the first component
  useEffect(() => {
    if (!pollData || !pollData.deadline) {
      setRemainingTime('No deadline');
      return;
    }

    const calculateRemainingTime = () => {
      const deadlineDate = new Date(pollData.deadline);
      const now = new Date();
      const diff = deadlineDate.getTime() - now.getTime();

      if (diff <= 0) {
        setRemainingTime('Poll ended');
        if (!isExpired) {
          setIsExpired(true);
          // Automatically finish voting when deadline is reached
          // We'll use a small delay to show the "Poll ended" message first
          setTimeout(() => onFinishVoting(), 1000);
        }
        return;
      } else {
        setIsExpired(false);
      }

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      let timeString = '';
      if (days > 0) timeString += `${days}d `;
      if (hours > 0 || days > 0) timeString += `${hours}h `;
      if (minutes > 0 || hours > 0 || days > 0) timeString += `${minutes}m `;
      timeString += `${seconds}s`;

      setRemainingTime(timeString.trim());
    };

    calculateRemainingTime();
    const timer = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(timer);
  }, [pollData, isExpired, onFinishVoting]);

  if (!pollData) return null;

  // Logic to count votes for each option
  const getVoteCount = (optionText) => {
    if (!pollData.votes) return 0;
    return Object.values(pollData.votes).filter(vote => vote === optionText).length;
  };

  // Logic to handle adding a new option
  const handleAddOption = () => {
    if (!newOptionText.trim()) {
      setMessage('Please enter an option.');
      return;
    }

    if (isExpired) {
      setMessage('Cannot add options after the poll deadline.');
      return;
    }

    const optionExists = pollData.options.some(option =>
      option.text.toLowerCase() === newOptionText.trim().toLowerCase()
    );

    if (optionExists) {
      setMessage('This option already exists.');
      return;
    }

    onAddOption(newOptionText.trim());
    setNewOptionText('');
    setShowAddOption(false);
  };

  const canAddOptions = pollData.allowNewOptions && !isExpired;
  const totalVotes = Object.keys(pollData.votes || {}).length;

  return (
    <div className="relative h-auto w-full max-w-lg space-y-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white shadow-lg">
      {/* Custom Message Box for alerts */}
      {message && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 p-3 bg-red-600 text-white rounded-lg shadow-lg flex items-center justify-between min-w-[200px]">
          <p>{message}</p>
          <button onClick={() => setMessage('')} className="ml-4 font-bold text-lg leading-none">&times;</button>
        </div>
      )}

      {/* Poll Question and Timer */}
      <h3 className="mb-2 text-2xl font-bold">{pollData.question}</h3>
      <p className={`mb-4 text-sm ${isExpired ? 'text-red-400 font-bold' : 'text-gray-400'}`}>
        {isExpired ? 'Poll Ended' : `Ends in: ${remainingTime}`}
      </p>

      {/* Options List */}
      <div className="space-y-3">
        {pollData.options.map((option, index) => {
          const voteCount = getVoteCount(option.text);
          const percent = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
          const isEnabled = !isExpired;

          return (
            <div
              key={index}
              onClick={() => isEnabled && onVote(option.text)}
              className={`group flex cursor-pointer flex-col gap-1 rounded-xl border px-4 py-3 transition-all ${
                isEnabled
                  ? "border-white/10 bg-white/5 hover:border-blue-400"
                  : "opacity-60 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{option.text}</span>
                <span className="text-xs text-blue-400">
                  {percent}%
                </span>
              </div>

              <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/20">
                <div
                  className="absolute top-0 left-0 h-full bg-blue-400 transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* Voter avatars are not supported by the original logic, so we show the vote count directly */}
              <div className="mt-1 flex items-center space-x-2">
                <span className="ml-3 text-xs text-white/40">
                  {voteCount} votes
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Option Section */}
      {canAddOptions && (
        <div className="mt-5">
          {showAddOption ? (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Add new option..."
                value={newOptionText}
                onChange={(e) => setNewOptionText(e.target.value)}
                maxLength={50}
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex justify-between gap-3">
                <button
                  className="w-1/2 py-2 px-5 rounded-lg bg-blue-500 text-gray-800 font-bold text-sm hover:bg-blue-600 transition-colors"
                  onClick={handleAddOption}
                >
                  Add
                </button>
                <button
                  className="w-1/2 py-2 px-5 rounded-lg border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-colors"
                  onClick={() => {
                    setShowAddOption(false);
                    setNewOptionText('');
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              className="w-full py-3 px-5 rounded-xl border-2 border-dashed border-blue-400 text-blue-400 font-bold text-base hover:bg-white/5 transition-colors"
              onClick={() => setShowAddOption(true)}
            >
              + Add Option
            </button>
          )}
        </div>
      )}

      {/* Finish Voting Button */}
      <button
        disabled={isExpired}
        onClick={onFinishVoting}
        className={`w-full py-4 px-5 cursor-pointer shadow-2xl font-bold border-2 border-secondary rounded-full mt-6 text-transparent bg-gradient-to-l from-primary to-secondary bg-clip-text font-secondary
          ${isExpired ? 'bg-gray-700 opacity-60 cursor-not-allowed text-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
      >
        {isExpired ? 'Poll Ended' : 'Send Vote'}
      </button>
    </div>
  );
};


export default ActivePollState;
