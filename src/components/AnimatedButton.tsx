import { motion } from "motion/react";
import { Spinner } from "./ShimmerLoader";
import { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
  type?: "button" | "submit";
}

export function AnimatedButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  className = "",
  type = "button",
}: AnimatedButtonProps) {
  const variantStyles = {
    primary: "bg-[#33A1FD] text-white hover:bg-[#2196F3] shadow-md",
    secondary: "bg-[#FF9800] text-white hover:bg-[#F57C00] shadow-md",
    success: "bg-[#4CAF50] text-white hover:bg-[#43A047] shadow-md",
    danger: "bg-[#F44336] text-white hover:bg-[#E53935] shadow-md",
    outline: "border-2 border-[#33A1FD] text-[#33A1FD] hover:bg-[#33A1FD] hover:text-white",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden rounded-lg font-semibold
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <span className="relative flex items-center justify-center gap-2">
        {loading ? (
          <Spinner size="sm" color="white" />
        ) : icon ? (
          icon
        ) : null}
        {children}
      </span>
    </motion.button>
  );
}
