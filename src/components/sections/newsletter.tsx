"use client";

import { Button } from "@/components/atoms/button";
import { motion } from "framer-motion";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Subscription failed");

      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className='py-16 px-4 sm:px-6 lg:px-8'>
      <div className='relative max-w-xl mx-auto'>
        <div className='text-center'>
          <motion.h2
            className='text-3xl font-bold mb-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Subscribe to our Newsletter
          </motion.h2>
          <motion.p
            className='text-foreground-muted mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Stay updated with our latest products and exclusive offers
          </motion.p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className='mt-8 sm:flex justify-center gap-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className='min-w-0 flex-1'>
            <label htmlFor='email' className='sr-only'>
              Email address
            </label>
            <input
              id='email'
              type='email'
              required
              className='block w-full rounded-md border border-input px-4 py-2 text-base text-foreground placeholder-foreground-muted shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading" || status === "success"}
            />
          </div>
          <Button
            type='submit'
            disabled={status === "loading" || status === "success"}
            className='mt-3 w-full sm:mt-0 sm:w-auto'
          >
            {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
          </Button>
        </motion.form>

        {status === "error" && (
          <motion.p className='mt-2 text-sm text-error' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Something went wrong. Please try again.
          </motion.p>
        )}
      </div>
    </section>
  );
}
