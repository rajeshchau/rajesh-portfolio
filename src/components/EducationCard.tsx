"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EducationCardProps {
  title: string;
  institution: string;
  location: string;
  description: string;
  period: string;
  logo?: string;
  link?: string;
  index?: number;
}

export default function EducationCard({
  title,
  institution,
  location,
  description,
  period,
  logo,
  link,
  index = 0,
}: EducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-lg transition-all overflow-hidden border border-border">
        <CardHeader className="flex flex-row items-center gap-4">
          {logo ? (
            <div className="relative h-16 w-16 overflow-hidden rounded-md flex-shrink-0 bg-muted">
              <Image
                src={logo}
                alt={institution}
                fill
                className="object-contain p-2"
              />
            </div>
          ) : (
            <div className="h-16 w-16 rounded-md bg-primary/10 flex items-center justify-center text-primary">
              <Calendar size={24} />
            </div>
          )}
          <div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <CardDescription className="text-muted-foreground font-medium">
              {institution}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{period}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{location}</span>
          </div>
          <p className="text-sm">{description}</p>
        </CardContent>
        {link && (
          <CardFooter>
            <Button variant="outline" size="sm" asChild className="w-full">
              <a
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-center gap-1"
              >
                <ExternalLink size={16} />
                Visit Website
              </a>
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
