"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  demoLink?: string;
  githubLink?: string;
  technologies: string[];
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  image,
  demoLink,
  githubLink,
  technologies,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col border border-border overflow-hidden hover:shadow-lg transition-all">
        {image && (
          <div className="relative w-full aspect-video overflow-hidden bg-muted">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <div className="flex flex-wrap gap-2 my-2">
            {technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="font-normal">
                {tech}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
          {githubLink && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={githubLink}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1"
              >
                <Github size={16} />
                Code
              </a>
            </Button>
          )}

          {demoLink && (
            <Button variant="default" size="sm" asChild>
              <a
                href={demoLink}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
