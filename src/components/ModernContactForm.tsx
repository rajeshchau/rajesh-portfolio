"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SendIcon, Loader2 } from "lucide-react";

export default function ModernContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real scenario, you would submit the form data to your backend
    // For demo purposes, we're just simulating a submission
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 2px rgba(79, 70, 229, 0.4)",
      borderColor: "rgba(79, 70, 229, 0.4)",
      transition: { duration: 0.2 }
    },
  };

  return (
    <GlassCard
      className="overflow-hidden"
      gradient="purple"
      intensity="medium"
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Name
          </label>
          <motion.div whileFocus="focus">
            <motion.input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              variants={inputVariants}
              className="flex h-11 w-full rounded-lg border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Your name"
            />
          </motion.div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Email
          </label>
          <motion.div whileFocus="focus">
            <motion.input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              variants={inputVariants}
              className="flex h-11 w-full rounded-lg border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="your.email@example.com"
            />
          </motion.div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Message
          </label>
          <motion.div whileFocus="focus">
            <motion.textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              variants={inputVariants}
              className="flex min-h-[140px] w-full rounded-lg border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Your message..."
            />
          </motion.div>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white h-11 rounded-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <SendIcon className="h-4 w-4" />
                Send Message
              </span>
            )}
          </Button>
        </motion.div>

        <p className="text-xs text-center text-muted-foreground mt-4 px-6">
          I value your privacy. Your information will only be used to respond to your message.
        </p>
      </form>
    </GlassCard>
  );
}
