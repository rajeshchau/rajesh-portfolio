"use client";

import { ReactNode, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Progress } from "@/components/ui/progress";

interface ModernSkillCardProps {
  icon: ReactNode;
  name: string;
  level: number;
  gradient?: "blue" | "purple" | "cyan" | "pink" | "none";
  description?: string;
  index?: number;
}

export default function ModernSkillCard({
  icon,
  name,
  level,
  gradient = "blue",
  description,
  index = 0,
}: ModernSkillCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const progressControls = useAnimation();

  useEffect(() => {
    if (inView) {
      progressControls.start({
        width: `${level}%`,
        transition: { duration: 1.2, delay: index * 0.1 + 0.3, ease: "easeOut" }
      });
    }
  }, [inView, level, progressControls, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlassCard
        noAnimation
        gradient={gradient}
        intensity="medium"
        className="h-full p-5"
        hoverEffect
      >
        <div className="flex items-start gap-4">
          <div className="text-3xl text-primary p-3 bg-primary/10 rounded-xl">
            {icon}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{name}</h3>

            {description && (
              <p className="text-muted-foreground text-sm mb-3">{description}</p>
            )}

            <div className="relative h-2.5 w-full bg-muted rounded-full overflow-hidden mt-2">
              <motion.div
                initial={{ width: "0%" }}
                animate={progressControls}
                className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
                style={{
                  backgroundImage: getGradientByType(gradient)
                }}
              />
            </div>

            <div className="text-xs text-right mt-1 text-muted-foreground">
              {level}%
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

// Helper function to get appropriate gradient based on type
function getGradientByType(gradient: string): string {
  switch (gradient) {
    case "blue":
      return "linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)";
    case "purple":
      return "linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%)";
    case "cyan":
      return "linear-gradient(90deg, #06b6d4 0%, #22d3ee 100%)";
    case "pink":
      return "linear-gradient(90deg, #ec4899 0%, #f472b6 100%)";
    default:
      return "linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)";
  }
}
