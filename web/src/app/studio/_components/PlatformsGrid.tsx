"use client";
import React from "react";
import { motion } from "framer-motion";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Lock, Smartphone, Globe } from "lucide-react";
import {
  TypeTester,
  LayoutAnimation,
  SpeedIndicator,
  SecurityBadge,
  GlobalNetwork,
} from "./features/bento-animations";

export function PlatformsGrid() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <div className="mx-auto w-full max-w-7xl">
        <BentoGrid>
          {/* 1. Typography */}
          <BentoCard
            className="md:col-span-2 md:row-span-2"
            title="Typography"
            description="Beautiful, responsive type that scales perfectly."
            header={<TypeTester />}
          />

          {/* 2. Layouts */}
          <BentoCard
            className="md:col-span-2"
            title="Layouts"
            description="Flexible grids that adapt."
            header={<LayoutAnimation />}
          />

          {/* 3. Global Network */}
          <BentoCard
            className="md:col-span-2 md:row-span-2"
            contentClassName="relative z-20 mt-auto rounded-lg bg-zinc-900/50 p-2 backdrop-blur-sm"
            title={
              <h3 className="flex items-center gap-2 font-serif text-xl font-medium text-white">
                <Globe className="h-5 w-5" />
                Global CDN
              </h3>
            }
            description="Lightning-fast content delivery worldwide with edge locations."
            header={
              <div className="relative">
                <GlobalNetwork />
              </div>
            }
          />

          {/* 4. Speed */}
          <BentoCard
            className="md:col-span-2"
            title="Speed"
            description="Blazing fast performance."
            header={<SpeedIndicator />}
          />

          {/* 5. Security */}
          <BentoCard
            className="md:col-span-3"
            title={
              <h3 className="flex items-center gap-2 font-serif text-xl font-medium text-white">
                <Lock className="h-5 w-5" />
                Security First
              </h3>
            }
            description="Enterprise-grade encryption and data protection built-in."
            header={<SecurityBadge />}
          />

          {/* 6. Mobile Responsive */}
          <BentoCard
            className="md:col-span-3"
            title="Mobile Ready"
            description="Optimized for all devices and screen sizes."
            header={<Smartphone className="h-16 w-16 text-white" />}
          />
        </BentoGrid>
      </div>
    </section>
  );
}
