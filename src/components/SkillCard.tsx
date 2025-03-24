"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  icon: ReactNode;
  name: string;
  level?: number;
  className?: string;
  color?: string;
  index?: number;
}

export default function SkillCard({
  icon,
  name,
  level = 75,
  className,
  color = "bg-primary",
  index = 0,
}: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className={cn("", className)}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow border-t-4" style={{ borderTopColor: color }}>
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className={`text-3xl mr-3 ${color.includes('bg-') ? cn('text-primary') : ''}`}>
              {icon}
            </div>
            <h3 className="font-semibold text-lg">{name}</h3>
          </div>

          <div className="w-full bg-muted rounded-full h-2.5">
            <motion.div
              className={`h-2.5 rounded-full ${color}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${level}%` }}
              transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
            />
          </div>
          <div className="text-xs text-right mt-1 text-muted-foreground">
            {level}%
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
