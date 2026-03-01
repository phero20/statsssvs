"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Globe, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/stateful-button";

export function IntegrationInputCard({
  title,
  placeholder,
  icon,
  className,
  iconColorClass = "text-mint",
  glowClass = "mint-glow",
  titleGradientClass = "via-mint",
  inputFocusClass = "focus:border-mint focus:ring-mint focus:mint-glow",
  buttonHoverClass = "hover:border-mint/90 hover:bg-mint/90 hover:text-mint",
  activeBgClass = "bg-mint",
  buttonIcon,
}: {
  title: string;
  placeholder: string;
  icon?: React.ReactNode;
  className?: string;
  iconColorClass?: string;
  glowClass?: string;
  titleGradientClass?: string;
  inputFocusClass?: string;
  buttonHoverClass?: string;
  activeBgClass?: string;
  buttonIcon?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "from-background/10 to-background/10 relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-linear-to-br py-8",
        className,
      )}
    >
      {/* Top right active icon */}
      {icon && (
        <div
          className={cn(
            "absolute top-4 right-4 z-20",
            iconColorClass,
            // glowClass,
          )}
        >
          {icon}
        </div>
      )}

      <div className="z-10 flex w-full flex-col items-center justify-center gap-4 px-6 sm:gap-6">
        <h3 className="text-foreground/60 text-center text-xl font-medium tracking-tight sm:text-2xl">
          {title}
        </h3>

        <div className="flex w-full max-w-[340px] items-center justify-center gap-2 sm:gap-3">
          <input
            type="text"
            placeholder={placeholder}
            className={cn(
              "glass-panel inner-bevel bg-background/5! text-foreground placeholder:text-muted-foreground h-10 w-full flex-1 rounded-xl px-4 py-2 text-sm transition-all focus:ring-1 focus:outline-none sm:h-12 sm:px-5 sm:py-3 sm:text-base",
              inputFocusClass,
            )}
          />
          <Button
            className={cn(
              "glass-panel inner-bevel group text-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-2xl transition-all sm:h-12 sm:w-12",
              buttonHoverClass,
            )}
            activeBgClass={activeBgClass}
          >
            {buttonIcon ? (
              buttonIcon
            ) : (
              <ArrowRight className="h-5 w-5 transition-transform hover:translate-x-1" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
