import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { FC } from "react";

interface PlanCardButtonProps {
  label: string;
  onClick: () => void;
  loading: boolean;
  variant: "upgrade" | "downgrade";
}

const PlanCardButton: FC<PlanCardButtonProps> = ({
  label,
  onClick,
  loading,
  variant = "upgrade",
}) => {
  const isUpgrade = variant === "upgrade";
  return (
    <motion.button
      onClick={onClick}
      disabled={loading}
      className={cn(
        "w-full py-3 px-4 rounded-xl font-instrument font-semibold transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        isUpgrade
          ? "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg shadow-primary-500/25"
          : "border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800 hover:bg-gray-50"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          Loading...
        </div>
      ) : (
        label
      )}
    </motion.button>
  );
};

export default PlanCardButton;
