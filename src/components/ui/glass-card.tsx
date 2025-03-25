"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";

interface GlassCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof MotionProps>, MotionProps {
  children: React.ReactNode;
  className?: string;
  gradient?: "blue" | "purple" | "cyan" | "pink" | "none";
  intensity?: "low" | "medium" | "high";
  bordered?: boolean;
  hoverEffect?: boolean;
  noAnimation?: boolean;
}

const gradientMap = {
  blue: "from-blue-600/10 via-indigo-500/5 to-blue-400/10",
  purple: "from-purple-600/10 via-violet-500/5 to-indigo-400/10",
  cyan: "from-cyan-500/10 via-blue-400/5 to-sky-300/10",
  pink: "from-pink-500/10 via-rose-400/5 to-red-400/10",
  none: ""
};

const intensityMap = {
  low: "backdrop-blur-sm bg-white/5 dark:bg-black/5",
  medium: "backdrop-blur-md bg-white/10 dark:bg-black/10",
  high: "backdrop-blur-lg bg-white/20 dark:bg-black/20"
};

export function GlassCard({
  children,
  className,
  gradient = "blue",
  intensity = "medium",
  bordered = true,
  hoverEffect = true,
  noAnimation = false,
  ...props
}: GlassCardProps) {
  // Base component
  const Component = noAnimation ? motion.div : motion.div;

  // Animation props
  const animationProps = noAnimation
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        whileHover: hoverEffect ? {
          y: -5,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        } : {}
      };

  return (
    <Component
      className={cn(
        "relative rounded-2xl overflow-hidden",
        intensityMap[intensity],
        bordered && "border border-white/10 dark:border-white/5",
        hoverEffect && "transition-all duration-300 ease-out",
        className
      )}
      {...animationProps}
      {...props}
    >
      {gradient !== "none" && (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-30 z-0",
            gradientMap[gradient]
          )}
        />
      )}
      <div className="relative z-10">{children}</div>
    </Component>
  );
}
