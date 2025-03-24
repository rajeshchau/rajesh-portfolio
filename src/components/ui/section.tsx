"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  fullHeight?: boolean;
  id?: string;
}

export function Section({
  title,
  subtitle,
  children,
  className,
  fullHeight = false,
  id,
  ...props
}: SectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.section
      id={id}
      className={cn(
        "py-16 md:py-24 w-full",
        fullHeight && "min-h-screen flex flex-col justify-center",
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      {...props}
    >
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
                variants={itemVariants}
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
                variants={itemVariants}
              >
                {subtitle}
              </motion.p>
            )}
            <motion.div
              className="w-20 h-1 bg-primary mx-auto mt-6 rounded-full"
              variants={itemVariants}
            />
          </div>
        )}
        {children}
      </div>
    </motion.section>
  );
}
