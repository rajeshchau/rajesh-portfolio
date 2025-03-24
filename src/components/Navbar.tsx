"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, Github, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <motion.div
            className="text-2xl font-bold text-primary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Rajesh<span className="text-foreground">.dev</span>
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <motion.div
          className="hidden md:flex items-center space-x-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {navLinks.map((link) => (
            <motion.div key={link.href} variants={itemVariants}>
              <Link
                href={link.href}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}

          <motion.div className="flex items-center space-x-4" variants={itemVariants}>
            <a
              href="https://github.com/rajeshchau"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/rajesh-chaudhari-842a11244/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://www.instagram.com/rajesh_chaudhary_70/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              <Instagram size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-background border-t"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-primary py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex space-x-4 py-2">
              <a
                href="https://github.com/rajeshchau"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/rajesh-chaudhari-842a11244/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/rajesh_chaudhary_70/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
