import { motion } from "motion/react";

const TypingDots = () => {
  return (
    <div className="flex space-x-1 items-center">
      <motion.span
        className="size-1 bg-white rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
      <motion.span
        className="size-1 bg-white rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
      />
      <motion.span
        className="size-1 bg-white rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
      />
    </div>
  );
};

export default TypingDots;
