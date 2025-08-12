import React from 'react';
import { motion } from 'framer-motion';

const PollClosedState = ({ data, onPollNextStep }) => {
  const { winningOption, nextStep } = data;

  const getButtonText = () => {
    if (nextStep === 'poll_venue') {
      return 'Poll the Venue';
    }
    return 'Finalize Event & Get RSVPs';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="rounded-b-2xl p-4 sm:p-6 w-full max-w-lg mx-auto flex flex-col items-center text-white font-sans"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-4 sm:mb-6 text-xl sm:text-2xl  font-extrabold tracking-wide select-none text-center px-2"
      >
        Poll Closed! The winner is...
      </motion.h2>

      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
        className="flex items-center space-x-3 sm:space-x-4 mb-8 sm:mb-10"
      >
        <motion.img
          src="https://img.icons8.com/ios-filled/50/ffffff/crown.png"
          alt="Crown"
          className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse"
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        />
        <motion.span
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1, color: '#3b82f6' }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold select-text"
        >
          {winningOption.text}
        </motion.span>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: 'inset 0 0 7px black' }}
        whileTap={{ scale: 0.95 }}
        onClick={onPollNextStep}
        className="w-full py-3 sm:py-4 px-4 sm:px-5 cursor-pointer shadow-2xl font-bold border-2 border-secondary rounded-full mt-4 sm:mt-6 text-transparent bg-gradient-to-l from-primary to-secondary bg-clip-text font-secondary"
      >
        {getButtonText()}
      </motion.button>
    </motion.div>
  );
};

export default PollClosedState;
