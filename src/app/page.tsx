"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, MapPin, Calendar, Code, Server, Database, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import AvatarScene from "@/components/AvatarScene";
import ModernSkillCard from "@/components/ModernSkillCard";
import ModernModernProjectCard from "@/components/ModernProjectCard";
import ModernEducationCard from "@/components/ModernEducationCard";
import ModernContactForm from "@/components/ModernContactForm";
import Navbar from "@/components/Navbar";


// Icons for skills
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaPython, FaEthereum } from "react-icons/fa";
import { SiJavascript, SiSolidity, SiTypescript, SiTailwindcss } from "react-icons/si";

export default function Home() {
  // Projects data
  const projects = [
    {
      title: "Move With Joy",
      description: "A website dedicated to simplifying the moving experience for customers in the US, making moving stress-free and enjoyable.",
      image: "https://ext.same-assets.com/199405321/3028663587.png",
      demoLink: "https://rajeshchau.github.io/Delevery-WebSite/",
      githubLink: "https://github.com/rajeshchau/Delevery-WebSite",
      technologies: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "Paws & Whiskers",
      description: "A delightful single-page web application designed for pet lovers, providing a charming and informative experience.",
      image: "https://ext.same-assets.com/199405321/2036023040.png",
      demoLink: "https://rajeshchau.github.io/Pet-WebApplication/",
      githubLink: "https://github.com/rajeshchau/Pet-WebApplication",
      technologies: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "ChatGPT Integration",
      description: "Simplifies the integration process for developers aiming to incorporate ChatGPT into their applications, enabling real-time AI interactions.",
      image: "https://ext.same-assets.com/199405321/2141474644.jpeg",
      githubLink: "https://github.com/rajeshchau/chatgpt-responsive",
      technologies: ["Python", "AI", "API"],
    },
  ];

  // Education data
  const education = [
    {
      title: "IMCA (Integrated MCA)",
      institution: "Parul University",
      location: "Vadodara, Gujarat",
      period: "2022 - Present",
      description: "Pursuing Integrated Master's in Computer Applications, focusing on advanced programming concepts, web development, and AI technologies.",
      logo: "https://ext.same-assets.com/199405321/2783775497.jpeg",
      link: "https://paruluniversity.ac.in/",
    },
    {
      title: "High School",
      institution: "SIGV School",
      location: "Chikhali",
      period: "2016 - 2022",
      description: "Completed high school education with a focus on science and computer programming, building strong foundations in mathematics and logical thinking.",
      logo: "https://ext.same-assets.com/199405321/3154173079.jpeg",
      link: "http://sigvschool.com/",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <main className="min-h-screen flex flex-col">
      
      <Navbar />

      {/* Hero Section */}
     
      <Section
        id="home"
        fullHeight
        className="pt-24 md:pt-0 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/5 to-transparent" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-10 relative">
          
          <motion.div
            className="order-2 md:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mt-40"
              variants={itemVariants}
            >
              Hey, I&apos;m <span className="text-primary">Rajesh!</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-6"
              variants={itemVariants}
            >
              Software Engineer with a passion for creativity
            </motion.p>

            <motion.p
              className="text-lg text-muted-foreground mb-8 max-w-lg"
              variants={itemVariants}
            >
              As a software engineer with a passion for creativity, I aspire to lead teams at the forefront of the tech industry. My journey combines technical prowess with artistic flair, allowing me to innovate beyond conventional boundaries.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <Button asChild size="lg">
                <a href="#contact">Get in Touch</a>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <a href="#projects">View Projects</a>
              </Button>
            </motion.div>

            <motion.div
              className="flex mt-8 gap-4"
              variants={itemVariants}
            >
              <a
                href="https://github.com/rajeshchau"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/rajesh-chaudhari-842a11244/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://www.instagram.com/rajesh_chaudhary_70/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="mailto:rc8807928@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={24} />
              </a>
            </motion.div>
          </motion.div>

          <div className="order-1 md:order-2 flex justify-center mt-40">
            <div className="w-full max-w-md">
              <AvatarScene />
            </div>
          </div>
        </div>
      </Section>

      {/* About Me Section */}
      <Section
        id="about"
        title="About Me"
        subtitle="Learn more about my background, experience, and what drives me"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="https://ext.same-assets.com/199405321/3154173079.jpeg"
              alt="Rajesh Chaudhari"
              fill
              className="object-cover"
            />
          </div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold">Who am I?</h3>
            <p className="text-muted-foreground">
              I am a motivated student pursuing both my Bachelor's and Master's degrees in Computer Science concurrently. With a deep passion for programming and software development, I'm always eager to learn and take on new challenges.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="text-primary" size={18} />
                <span>Currently in 4th year of B.Tech</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-primary" size={18} />
                <span>Based in Gujarat, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="text-primary" size={18} />
                <span>Skilled in Python, JavaScript, Solidity</span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="text-primary" size={18} />
                <span>Currently learning advanced algorithms</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="text-primary" size={18} />
                <span>Exploring blockchain technology</span>
              </div>
              <div className="flex items-center gap-2">
                <PenTool className="text-primary" size={18} />
                <span>Passionate about problem-solving and design</span>
              </div>
            </div>

            <Button asChild>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
              </a>
            </Button>
          </motion.div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section
        id="skills"
        title="Skills & Expertise"
        subtitle="The technologies and tools I work with"
        className="bg-muted/30"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModernSkillCard
            icon={<FaHtml5 />}
            name="HTML5"
            level={90}
            index={0}
          />
          <ModernSkillCard
            icon={<FaCss3Alt />}
            name="CSS3"
            level={85}
            index={1}
          />
          <ModernSkillCard
            icon={<SiJavascript />}
            name="JavaScript"
            level={80}
            index={2}
          />
          <ModernSkillCard
            icon={<FaReact />}
            name="React"
            level={75}
            index={3}
          />
          <ModernSkillCard
            icon={<FaPython />}
            name="Python"
            level={85}
            index={4}
          />
          <ModernSkillCard
            icon={<FaNodeJs />}
            name="Node.js"
            level={70}
            index={5}
          />
          <ModernSkillCard
            icon={<SiSolidity />}
            name="Solidity"
            level={65}
            index={6}
          />
          <ModernSkillCard
            icon={<FaEthereum />}
            name="Ethereum"
            level={60}
            index={7}
          />
          <ModernSkillCard
            icon={<SiTypescript />}
            name="TypeScript"
            level={70}
            index={8}
          />
        </div>
      </Section>

      {/* Education Section */}
      <Section
        id="education"
        title="Education"
        subtitle="My academic journey"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <ModernEducationCard
              key={index}
              title={edu.title}
              institution={edu.institution}
              location={edu.location}
              description={edu.description}
              period={edu.period}
              logo={edu.logo}
              link={edu.link}
              index={index}
            />
          ))}
        </div>
      </Section>

      {/* Projects Section */}
      <Section
        id="projects"
        title="Projects"
        subtitle="Some of my recent work"
        className="bg-muted/30"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ModernModernProjectCard
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              demoLink={project.demoLink}
              githubLink={project.githubLink}
              technologies={project.technologies}
              index={index}
            />
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section
        id="contact"
        title="Get In Touch"
        subtitle="Have a question or want to work together? Feel free to reach out!"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">Contact Information</h3>
            <p className="text-muted-foreground">
              I'm always open to connecting with like-minded individuals and exploring new opportunities. Feel free to reach out through the form or directly via email or social media.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href="mailto:rc8807928@gmail.com" className="font-medium hover:text-primary transition-colors">
                    rc8807928@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Linkedin size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/in/rajesh-chaudhari-842a11244/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    rajesh-chaudhari-842a11244
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Github size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">GitHub</p>
                  <a
                    href="https://github.com/rajeshchau"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    rajeshchau
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Instagram size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Instagram</p>
                  <a
                    href="https://www.instagram.com/rajesh_chaudhary_70/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    rajesh_chaudhary_70
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <ModernContactForm />
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-primary">Rajesh<span className="text-foreground">.dev</span></h3>
              <p className="text-sm text-muted-foreground mt-1">Software Engineer & Creative Developer</p>
            </div>

            <div className="flex space-x-4">
              <a
                href="https://github.com/rajeshchau"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/rajesh-chaudhari-842a11244/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/rajesh_chaudhary_70/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:rc8807928@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="mt-6 text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Rajesh Chaudhari. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
