"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  href?: string;
}

export function Button({ children, variant = "primary", size = "md", onClick, className = "", href }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 cursor-pointer";
  const sizes = { sm: "px-5 py-2.5 text-sm", md: "px-8 py-3.5 text-base", lg: "px-10 py-4 text-lg" };
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50",
    secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/40 backdrop-blur-sm",
    ghost: "text-white hover:text-blue-400 border border-transparent hover:border-white/20",
  };

  const Tag = href ? "a" : "button";

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      <Tag
        href={href}
        onClick={onClick}
        className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
