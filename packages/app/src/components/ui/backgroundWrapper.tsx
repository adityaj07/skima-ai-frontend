import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BackgroundWrapperProps {
  children: ReactNode;
  className?: string;
}

function BackgroundWrapper({ children, className }: BackgroundWrapperProps) {
  return (
    <div className={cn("min-h-screen w-full relative bg-black", className)}>
      {/* Rose Twilight Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(244, 114, 182, 0.25), transparent 70%),
            radial-gradient(ellipse 60% 40% at 20% 100%, rgba(168, 85, 247, 0.15), transparent 50%),
            radial-gradient(ellipse 40% 30% at 80% 100%, rgba(59, 130, 246, 0.1), transparent 50%),
            #000000
          `,
        }}
      />

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default BackgroundWrapper;
