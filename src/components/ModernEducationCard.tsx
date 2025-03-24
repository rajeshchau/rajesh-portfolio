"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Calendar, MapPin, ExternalLink, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModernEducationCardProps {
  title: string;
  institution: string;
  location: string;
  description: string;
  period: string;
  logo?: string;
  link?: string;
  gradient?: "blue" | "purple" | "cyan" | "pink" | "none";
  index?: number;
}

export default function ModernEducationCard({
  title,
  institution,
  location,
  description,
  period,
  logo,
  link,
  gradient = "blue",
  index = 0,
}: ModernEducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="h-full"
    >
      <GlassCard
        className="h-full p-0 overflow-hidden"
        gradient={gradient}
        noAnimation
        intensity="medium"
        hoverEffect
      >
        <div className="p-6 pb-0">
          <div className="flex gap-4 items-start">
            {logo ? (
              <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 bg-gradient-to-br from-white/5 to-white/10">
                <Image
                  src={logo}
                  alt={institution}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-16 w-16 rounded-lg flex items-center justify-center text-primary flex-shrink-0 bg-primary/10">
                <Bookmark size={28} />
              </div>
            )}

            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">{title}</h3>
              <p className="text-lg font-medium text-primary">
                {institution}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 pt-4">
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <Calendar className="mr-2 h-4 w-4 text-primary" />
            <span>{period}</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <MapPin className="mr-2 h-4 w-4 text-primary" />
            <span>{location}</span>
          </div>

          <div className="relative px-4 py-3 mb-6 bg-white/5 rounded-lg border-l-4 border-primary">
            <p className="text-sm">{description}</p>
          </div>
        </div>

        {link && (
          <div className="px-6 pb-6">
            <Button variant="outline" size="sm" asChild className="w-full">
              <a
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-center gap-1"
              >
                <span>Visit Website</span>
                <ExternalLink size={14} />
              </a>
            </Button>
          </div>
        )}

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full -z-10" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/20 to-transparent rounded-tr-full -z-10" />
      </GlassCard>
    </motion.div>
  );
}
