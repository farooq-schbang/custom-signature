"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export function Badge({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 text-sm text-blue-300 font-medium"
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.div>
  );
}
