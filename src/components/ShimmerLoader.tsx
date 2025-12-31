import { motion } from "motion/react";

interface ShimmerLoaderProps {
  width?: string;
  height?: string;
  className?: string;
  variant?: "text" | "card" | "circle" | "button";
}

export function ShimmerLoader({ 
  width = "100%", 
  height = "20px", 
  className = "",
  variant = "text"
}: ShimmerLoaderProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "circle":
        return "rounded-full";
      case "card":
        return "rounded-lg";
      case "button":
        return "rounded-md";
      default:
        return "rounded";
    }
  };

  return (
    <div 
      className={`relative overflow-hidden bg-gradient-to-r from-[#E9F1FA] via-[#D9DEE4] to-[#E9F1FA] ${getVariantStyles()} ${className}`}
      style={{ width, height }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white border border-[#D9DEE4] rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <ShimmerLoader variant="circle" width="40px" height="40px" />
        <ShimmerLoader width="200px" height="24px" />
      </div>
      <div className="space-y-3">
        <ShimmerLoader width="100%" height="16px" />
        <ShimmerLoader width="90%" height="16px" />
        <ShimmerLoader width="95%" height="16px" />
        <ShimmerLoader width="85%" height="16px" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex gap-4"
        >
          <ShimmerLoader width="30%" height="40px" />
          <ShimmerLoader width="50%" height="40px" />
          <ShimmerLoader width="20%" height="40px" />
        </motion.div>
      ))}
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#006BA6]">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Water Drop Animation */}
        <motion.div className="relative mx-auto mb-6 w-24 h-24">
          <motion.div
            className="absolute inset-0 bg-white rounded-full opacity-20"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
            </svg>
          </motion.div>
        </motion.div>
        
        {/* Loading Text */}
        <motion.h2 
          className="text-white text-xl mb-2"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.h2>
        <p className="text-white/80 text-sm">Please wait</p>
      </motion.div>
    </div>
  );
}

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export function Spinner({ size = "md", color = "#0077CC" }: SpinnerProps) {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <motion.div
      className={`${sizeMap[size]} border-2 border-t-transparent rounded-full`}
      style={{ borderColor: color, borderTopColor: "transparent" }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  );
}
