"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

interface ModernProjectCardProps {
  title: string;
  description: string;
  image?: string;
  demoLink?: string;
  githubLink?: string;
  technologies: string[];
  featured?: boolean;
  gradient?: "blue" | "purple" | "cyan" | "pink" | "none";
  index?: number;
}

export default function ModernProjectCard({
  title,
  description,
  image,
  demoLink,
  githubLink,
  technologies,
  featured = false,
  gradient = "blue",
  index = 0,
}: ModernProjectCardProps) {
  const imageVariants = {
    hidden: { scale: 1 },
    visible: { scale: 1.05 },
  };

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }
  };

  return (
    <motion.div
      className="h-full"
      variants={variants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-100px" }}
    >
      <GlassCard
        className="h-full flex flex-col"
        gradient={gradient}
        noAnimation
        intensity={featured ? "high" : "medium"}
        bordered
      >
        {image && (
          <div className="relative w-full aspect-video overflow-hidden rounded-t-xl bg-muted">
            <motion.div
              className="h-full w-full"
              variants={imageVariants}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
              />
            </motion.div>

            {featured && (
              <div className="absolute top-3 left-3 z-10">
                <Badge variant="secondary" className="text-xs bg-black/50 backdrop-blur-md text-white font-medium border-0">
                  Featured Project
                </Badge>
              </div>
            )}
          </div>
        )}

        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          <p className="text-muted-foreground text-sm mb-4 flex-grow">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto mb-4">
            {technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="font-normal text-xs bg-transparent">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex justify-between gap-3">
            {githubLink && (
              <Button variant="outline" size="sm" asChild className="flex-1">
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1"
                >
                  <Github size={16} />
                  <span className="ml-1">Code</span>
                </a>
              </Button>
            )}

            {demoLink && (
              <Button variant="default" size="sm" asChild className="flex-1">
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1"
                >
                  <span className="mr-1">Live Demo</span>
                  <ArrowUpRight size={16} />
                </a>
              </Button>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
