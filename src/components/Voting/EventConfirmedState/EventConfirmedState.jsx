import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  PlusCircle,
  PartyPopper,
  Map,
  Sparkles,
} from 'lucide-react';
import RsvpConfettiOverlay from '../PartyPopperCelebration/RsvpConfettiOverlay';

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";

const RSVP_OPTIONS = [
  { type: 'yes', label: 'Going', icon: CheckCircle2, color: 'text-green-300' },
  { type: 'maybe', label: 'Maybe', icon: HelpCircle, color: 'text-yellow-300' },
  { type: 'no', label: 'Not Going', icon: XCircle, color: 'text-red-300' },
];

const EventConfirmedNew = ({ eventData, onRsvp, onStartNewPoll }) => {
  const [showConfetti, setShowConfetti] = useState(false);

const handleClick = () => {
  console.log("Button clicked");
  setShowConfetti(true);

  // Wait 3s for confetti before navigating
  setTimeout(() => {
    if (onStartNewPoll) onStartNewPoll();
    setShowConfetti(false);
  }, 2000);
};


  // Preserved logic from your original component
  const { winningActivity, winningPlace, rsvps, currentUser } = eventData || {};

  const rsvpCounts = { yes: 0, no: 0, maybe: 0 };
  Object.values(rsvps || {}).forEach((rsvp) => {
    if (rsvpCounts[rsvp] !== undefined) rsvpCounts[rsvp]++;
  });

  const userRsvp = currentUser?.rsvp;

  return (
    <div className="w-full max-w-sm mx-auto p-8 space-y-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700 text-white">
      {/* Header with a new icon and color scheme */}
      <header className="flex flex-col items-center justify-center space-y-2 text-center">
        <PartyPopper size={48} className="text-yellow-400 animate-pulse" />
        <h1 className="text-3xl font-extrabold tracking-tight">Event Confirmed!</h1>
        <p className="text-sm text-gray-400">All set, get ready to celebrate!</p>
      </header>

      {/* Event details card */}
      <div className="bg-gray-800 rounded-2xl p-6 space-y-4 shadow-inner border border-gray-700">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-500/20 rounded-full">
            <Sparkles size={24} className="text-purple-400" />
          </div>
          <p className="font-semibold text-lg truncate">{winningActivity || 'N/A'}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-500/20 rounded-full">
            <Map size={24} className="text-purple-400" />
          </div>
          <p className="font-semibold text-lg truncate">{winningPlace || 'N/A'}</p>
        </div>
      </div>

      {/* RSVP buttons with integrated counts */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h2 className="text-lg text-center font-bold mb-5">Will you be joining us?</h2>
        <div className="flex justify-between gap-3">
          {RSVP_OPTIONS.map(({ type, label, icon: Icon, color, bg, border }) => {
            const isSelected = userRsvp === type;
            const count = rsvpCounts[type];
            return (
              <button
                key={type}
                onClick={() => onRsvp(type)}
                className={`
                  relative flex flex-col items-center w-full py-4 rounded-xl
                  border-2 transition-all duration-300 ease-in-out
                  ${isSelected ? `${bg} ${border} scale-105 shadow-md` : 'bg-gray-700 border-transparent hover:bg-gray-600 hover:scale-[1.02]'}
                `}
                aria-pressed={isSelected}
                title={label}
              >
                <Icon className={`mb-2 ${isSelected ? color : 'text-gray-400'}`} size={28} />
                <span className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                  {label}
                </span>
                <span className={`absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center font-bold text-xs rounded-full shadow-lg border-2 ${isSelected ? 'bg-white text-gray-800' : 'bg-gray-600 text-white border-gray-800'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* New Poll Button */}
      {onStartNewPoll && (
        <button
          onClick={handleClick}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 transition-all duration-200 text-white font-bold text-lg shadow-lg"
        >
          <PlusCircle size={20} />
          Plan New Event
        </button>
      )}
      {showConfetti && <RsvpConfettiOverlay key={Date.now()} />}
    </div>
  );
};


export default EventConfirmedNew;
