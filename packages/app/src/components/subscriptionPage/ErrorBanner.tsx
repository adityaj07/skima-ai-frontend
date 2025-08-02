import { motion } from "framer-motion";

interface Props {
  message: string;
  onRetry?: () => void;
}

export const ErrorBanner: React.FC<Props> = ({ message, onRetry }) => (
  <motion.div
    className="bg-red-500/20 border-2 border-red-400/50 text-red-100 p-4 my-6 rounded-xl backdrop-blur-sm shadow-lg"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <svg
          className="w-5 h-5 text-red-400 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-instrument font-medium">{message}</span>
      </div>
      
      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-instrument font-semibold transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Retry
        </motion.button>
      )}
    </div>
  </motion.div>
);
