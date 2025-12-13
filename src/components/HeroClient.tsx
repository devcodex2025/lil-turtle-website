"use client";

import { motion } from "framer-motion";
import Turtle3DViewer from "./Turtle3DViewer";

export default function HeroClient() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative"
    >
      <div className="relative z-10">
        <Turtle3DViewer />
      </div>

      {/* Decorative Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-primary-green/20 rounded-full animate-[spin_20s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-primary-gold/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
    </motion.div>
  );
}
