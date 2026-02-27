"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Circle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "border-2 border-white/[0.15] backdrop-blur-[2px]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function StudioBackground({ children }: { children?: React.ReactNode }) {
  return (
    <div className="bg-background relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/15 via-transparent to-black/15 blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-zinc-500/15"
          className="top-[15%] left-[-10%] md:top-[20%] md:left-[-5%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-neutral-600/15"
          className="top-[70%] right-[-5%] md:top-[75%] md:right-[0%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-slate-500/15"
          className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-stone-500/15"
          className="top-[10%] right-[15%] md:top-[15%] md:right-[20%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-gray-500/15"
          className="top-[5%] left-[20%] md:top-[10%] md:left-[25%]"
        />
      </div>
      <div className="from-background to-background/80 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent" />

      {/* Main Content Wrapper */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}

export { StudioBackground };







// "use client";

// import { motion } from "framer-motion";
// import { cn } from "@/lib/utils";
// import React from "react";

// function ElegantShape({
//   className,
//   delay = 0,
//   width = 400,
//   height = 100,
//   rotate = 0,
//   gradient = "from-white/[0.05]",
// }: {
//   className?: string;
//   delay?: number;
//   width?: number;
//   height?: number;
//   rotate?: number;
//   gradient?: string;
// }) {
//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         y: -150,
//         rotate: rotate - 15,
//       }}
//       animate={{
//         opacity: 1,
//         y: 0,
//         rotate: rotate,
//       }}
//       transition={{
//         duration: 2.4,
//         delay,
//         ease: [0.23, 0.86, 0.39, 0.96],
//         opacity: { duration: 1.2 },
//       }}
//       className={cn("absolute", className)}
//     >
//       <motion.div
//         animate={{
//           y: [0, 15, 0],
//         }}
//         transition={{
//           duration: 12,
//           repeat: Number.POSITIVE_INFINITY,
//           ease: "easeInOut",
//         }}
//         style={{
//           width,
//           height,
//         }}
//         className="relative"
//       >
//         <div
//           className={cn(
//             "absolute inset-0 rounded-full",
//             "bg-gradient-to-r to-transparent",
//             gradient,
//             // 1. STRONGER BORDER: Makes the edge of the glass visible
//             "border border-white/[0.05] backdrop-blur-[6px]",
//             // 2. SOFTER SHADOW: So it doesn't look like a black hole
//             "shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]",
//             "after:absolute after:inset-0 after:rounded-full",
//             // 3. BRIGHTER INNER GLOW: Gives it that 3D "Kokonut" volume
//             "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]",
//           )}
//         />
//       </motion.div>
//     </motion.div>
//   );
// }

// function StudioBackground({ children }: { children?: React.ReactNode }) {
//   return (
//     <div className="relative min-h-screen w-full overflow-hidden bg-[#050505]">
//       {/* Subtle ambient light so it isn't completely dead black */}
//       <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/20 via-transparent to-black blur-3xl" />

//       {/* Increased opacity of the wrapper so shapes are bolder */}
//       <div className="absolute inset-0 overflow-hidden opacity-100">
//         <ElegantShape
//           delay={0.3}
//           width={600}
//           height={140}
//           rotate={12}
//           gradient="from-white/[0.05]" // Brighter
//           className="top-[15%] left-[-10%] md:top-[20%] md:left-[-5%]"
//         />

//         <ElegantShape
//           delay={0.5}
//           width={500}
//           height={120}
//           rotate={-15}
//           gradient="from-zinc-400/[0.15]" // Brighter
//           className="top-[70%] right-[-5%] md:top-[75%] md:right-[0%]"
//         />

//         <ElegantShape
//           delay={0.4}
//           width={300}
//           height={80}
//           rotate={-8}
//           gradient="from-slate-400/[0.15]" // Brighter
//           className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[6%]"
//         />

//         <ElegantShape
//           delay={0.6}
//           width={200}
//           height={60}
//           rotate={20}
//           gradient="from-neutral-400/[0.15]" // Brighter
//           className="top-[10%] right-[15%] md:top-[15%] md:right-[20%]"
//         />

//         <ElegantShape
//           delay={0.7}
//           width={150}
//           height={40}
//           rotate={-25}
//           gradient="from-white/[0.1]" // Brighter
//           className="top-[5%] left-[20%] md:top-[10%] md:left-[25%]"
//         />
//       </div>

//       {/* Lighter vignette so it doesn't crush the bottom pills */}
//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />

//       {/* Main Content Wrapper */}
//       <div className="relative z-10 h-full w-full">{children}</div>
//     </div>
//   );
// }

// export { StudioBackground };
