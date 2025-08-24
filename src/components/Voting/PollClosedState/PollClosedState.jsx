import React from 'react';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className=" rounded-2xl fixed md:relative w-full backdrop-blur-lg p-4 sm:p-5 mt-2  md:left-[50%] transform md:translate-x-[-50%] text-text shadow-lg "
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="text-base sm:text-lg font-bold text-center text-text/90 mb-3"
      >
        Poll Closed! The winner is...
      </motion.h2>

      {/* Winner display */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.25, type: 'spring', stiffness: 120 }}
        className="flex items-center justify-center gap-2 sm:gap-3 mb-5"
      >
        <motion.div
          animate={{ rotate: [0, 8, -8, 8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="bg-gradient-to-tr from-primary to-secondary p-2 rounded-full shadow-md"
        >
          <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-text" />
        </motion.div>
        <motion.span
          whileHover={{ scale: 1.05, color: '#ac9ffa' }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="text-lg sm:text-xl font-extrabold text-center"
        >
          {winningOption.text}
        </motion.span>
      </motion.div>

      {/* Next step button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPollNextStep}
        className="w-full py-2.5 cursor-pointer sm:py-3 px-4 font-semibold rounded-full bg-gradient-to-r from-primary to-secondary text-black shadow-md transition-all hover:opacity-90"
      >
        {getButtonText()}
      </motion.button>
    </motion.div>
  );
};

export default PollClosedState;
