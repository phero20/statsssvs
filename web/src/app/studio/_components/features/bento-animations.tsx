"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Globe } from "lucide-react";

export function TypeTester() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.5 : 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full items-center justify-center">
      <motion.span
        className="font-serif text-6xl font-medium text-white md:text-8xl"
        animate={{ scale }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Aa
      </motion.span>
    </div>
  );
}

export function LayoutAnimation() {
  const [layout, setLayout] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLayout((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const layouts = ["grid-cols-2", "grid-cols-3", "grid-cols-1"];

  return (
    <div className="flex h-full items-center justify-center">
      <motion.div
        className={`grid ${layouts[layout]} h-full w-full max-w-[140px] gap-1.5`}
        layout
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="h-5 w-full rounded-md bg-white/20"
            layout
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export function SpeedIndicator() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="relative flex h-10 w-full items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              className="h-8 w-24 rounded bg-white/10"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              exit={{ opacity: 0, y: -20, position: "absolute" }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          ) : (
            <motion.span
              key="text"
              initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              className="font-sans text-3xl font-medium text-white md:text-4xl"
            >
              100ms
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <span className="text-sm text-gray-400">Load Time</span>
      <div className="h-1.5 w-full max-w-[120px] overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: loading ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 15, mass: 1 }}
        />
      </div>
    </div>
  );
}

export function SecurityBadge() {
  const [shields, setShields] = useState([
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShields((prev) => {
        const nextIndex = prev.findIndex((s) => !s.active);
        if (nextIndex === -1) {
          return prev.map(() => ({ id: Math.random(), active: false }));
        }
        return prev.map((s, i) =>
          i === nextIndex ? { ...s, active: true } : s,
        );
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full items-center justify-center gap-2">
      {shields.map((shield) => (
        <motion.div
          key={shield.id}
          className={`flex h-12 w-12 items-center justify-center rounded-lg ${
            shield.active ? "bg-white/20" : "bg-white/5"
          }`}
          animate={{ scale: shield.active ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Lock
            className={`h-5 w-5 ${shield.active ? "text-white" : "text-gray-600"}`}
          />
        </motion.div>
      ))}
    </div>
  );
}

export function GlobalNetwork() {
  const [pulses] = useState([0, 1, 2, 3, 4]);

  return (
    <div className="relative flex h-full items-center justify-center">
      <Globe className="z-10 h-16 w-16 text-white/80" />
      {pulses.map((pulse) => (
        <motion.div
          key={pulse}
          className="absolute h-16 w-16 rounded-full border-2 border-white/30"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: pulse * 0.8,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
