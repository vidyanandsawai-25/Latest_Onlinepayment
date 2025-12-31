import { motion } from "motion/react";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  gradient?: boolean;
}

export function AnimatedCard({ 
  children, 
  className = "", 
  hover = true,
  delay = 0,
  gradient = false 
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={hover ? { y: -4, boxShadow: "0 20px 40px rgba(0, 90, 156, 0.15)" } : {}}
      className={`
        relative bg-white border border-[#D9DEE4] rounded-xl overflow-hidden
        transition-all duration-300
        ${gradient ? "bg-gradient-to-br from-white to-[#F8FBFF]" : ""}
        ${className}
      `}
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#33A1FD]" />
      
      {children}
      
      {/* Shine effect on hover */}
      {hover && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
          initial={{ x: "-100%", opacity: 0 }}
          whileHover={{ x: "100%", opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.div>
  );
}

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({ children, className = "", glowColor = "#0077CC" }: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`relative ${className}`}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-xl opacity-0 blur-xl"
        style={{ background: glowColor }}
        whileHover={{ opacity: 0.3 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative bg-white border border-[#D9DEE4] rounded-xl overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
}
