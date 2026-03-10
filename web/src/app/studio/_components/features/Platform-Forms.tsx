"use client";
import React, { useState, useEffect } from "react";
import { Globe, ArrowRight, Loader2, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/stateful-button";
import { cva } from "class-variance-authority";
import { useIntegrationField } from "@/hooks";
import { StudioStoreKey } from "@/store/useStudioStore";

interface IntegrationInputCardProps {
  title: string;
  placeholder: string;
  icon?: React.ReactNode;
  className?: string;
  variant:
    | "github"
    | "leetcode"
    | "codeforces"
    | "portfolio"
    | "linkedin"
    | "name"
    | "photo"
    | "email";
  buttonIcon?: React.ReactNode;
  storeKey?: StudioStoreKey;
}

const iconColorVariants = cva("", {
  variants: {
    variant: {
      github: "text-github",
      leetcode: "text-leetcode",
      codeforces: "text-codeforces",
      portfolio: "text-portfolio",
      linkedin: "text-linkedin",
      name: "text-name",
      photo: "text-photo",
      email: "text-email",
    },
  },
});

const activeBgVariants = cva("", {
  variants: {
    variant: {
      github: "bg-github/70",
      leetcode: "bg-leetcode/70",
      codeforces: "bg-codeforces/70",
      portfolio: "bg-portfolio/70",
      linkedin: "bg-linkedin/70",
      name: "bg-name/70",
      photo: "bg-photo/70",
      email: "bg-email/70",
    },
  },
});

const focusVariants = cva("", {
  variants: {
    variant: {
      github: "focus:border-github focus:ring-github/50",
      leetcode: "focus:border-leetcode focus:ring-leetcode/50",
      codeforces: "focus:border-codeforces focus:ring-codeforces/50",
      portfolio: "focus:border-portfolio focus:ring-portfolio/50",
      linkedin: "focus:border-linkedin focus:ring-linkedin/50",
      name: "focus:border-name focus:ring-name/50",
      photo: "focus:border-photo focus:ring-photo/50",
      email: "focus:border-email focus:ring-email/50",
    },
  },
});

const hoverVariants = cva("", {
  variants: {
    variant: {
      github:
        "hover:border-github/50 hover:bg-github/10 hover:ring-1 hover:ring-github hover:ring-offset-1 hover:ring-offset-background",
      leetcode:
        "hover:border-leetcode/50 hover:bg-leetcode/10 hover:ring-1 hover:ring-leetcode hover:ring-offset-1 hover:ring-offset-background",
      codeforces:
        "hover:border-codeforces/50 hover:bg-codeforces/10 hover:ring-1 hover:ring-codeforces hover:ring-offset-1 hover:ring-offset-background",
      portfolio:
        "hover:border-portfolio/50 hover:bg-portfolio/10 hover:ring-1 hover:ring-portfolio hover:ring-offset-1 hover:ring-offset-background",
      linkedin:
        "hover:border-linkedin/50 hover:bg-linkedin/10 hover:ring-1 hover:ring-linkedin hover:ring-offset-1 hover:ring-offset-background",
      name: "hover:border-name/50 hover:bg-name/10 hover:ring-1 hover:ring-name hover:ring-offset-1 hover:ring-offset-background",
      photo:
        "hover:border-photo/50 hover:bg-photo/10 hover:ring-1 hover:ring-photo hover:ring-offset-1 hover:ring-offset-background",
      email:
        "hover:border-email/50 hover:bg-email/10 hover:ring-1 hover:ring-email hover:ring-offset-1 hover:ring-offset-background",
    },
  },
});

export function IntegrationInputCard({
  title,
  placeholder,
  icon,
  className,
  variant,
  buttonIcon,
  storeKey,
}: IntegrationInputCardProps) {
  const {
    localValue,
    setLocalValue,
    handleSave,
    clearField,
    isFetching,
    isError,
    isSuccess,
    isLocallySaved,
  } = useIntegrationField(storeKey);

  return (
    <div
      className={cn(
        "from-background/10 to-background/10 relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-linear-to-br",
        className,
      )}
    >
      {/* Top right active icon */}
      {icon && (
        <div
          className={cn(
            "absolute top-4 right-4 z-20",
            iconColorVariants({ variant }),
          )}
        >
          {icon}
        </div>
      )}

      <div className="z-10 flex w-full flex-col items-center justify-center gap-4 px-6">
        <h3 className="text-foreground/60 text-center text-xl font-medium tracking-tight sm:text-2xl">
          {title}
        </h3>

        <AnimatePresence mode="wait">
          {isSuccess || isLocallySaved ? (
            <motion.div
              key="success-view"
              initial={{ opacity: 0, y: 15, filter: "blur(4px)", scale: 0.95 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, y: -15, filter: "blur(4px)", scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="flex w-full flex-col items-center justify-center gap-5 sm:gap-6"
            >
              <div className="flex items-center justify-center gap-2">
                {variant === "photo" && localValue ? (
                  <motion.div
                    layoutId="photo-preview"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={cn(
                      "relative h-16 w-16 overflow-hidden rounded-full border-2 shadow-2xl sm:h-20 sm:w-20",
                      "border-photo/50",
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={localValue}
                      alt="Profile Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        // Fallback if the URL they pasted isn't an image!
                        const target = e.currentTarget as HTMLImageElement;
                        target.onerror = null; // Prevent infinite loop if fallback also fails
                        target.src =
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback";
                      }}
                    />
                  </motion.div>
                ) : (
                  <>
                    <div
                      className={cn(
                        "glass-panel inner-bevel mb-1 flex h-8 w-8 items-center justify-center rounded-full shadow-lg",
                        "bg-background/20",
                      )}
                    >
                      <Check
                        className={cn(
                          "h-4 w-4 shrink-0",
                          iconColorVariants({ variant }),
                        )}
                      />
                    </div>

                    <p className="text-foreground text-center text-base font-medium tracking-tight sm:text-lg">
                      {isSuccess ? (
                        <>
                          Fetched for{" "}
                          <span className="font-bold">{localValue}</span>
                        </>
                      ) : (
                        <>
                          <span className="font-bold">{localValue}</span> saved
                        </>
                      )}
                    </p>
                  </>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearField}
                type="button"
                className={cn(
                  "group/btn inner-bevel relative cursor-pointer overflow-hidden rounded-xl px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all",
                  "text-primary-foreground shadow-md hover:shadow-xl",
                  activeBgVariants({ variant }),
                )}
                title={
                  isSuccess
                    ? "Refetch with another username"
                    : "Update saved field"
                }
              >
                {/* Premium Shine Sweep Effect */}
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full" />

                <span className="relative z-10 drop-shadow-sm">Update</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="form-view"
              initial={{ opacity: 0, y: 15, filter: "blur(4px)", scale: 0.95 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, y: -15, filter: "blur(4px)", scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="flex w-full max-w-[340px] flex-col gap-1 sm:gap-1.5"
            >
              <form
                onSubmit={handleSave}
                className="flex w-full items-center justify-center gap-2 sm:gap-3"
              >
                <input
                  type="text"
                  value={localValue}
                  onChange={(e) => setLocalValue(e.target.value)}
                  placeholder={placeholder}
                  className={cn(
                    "glass-panel inner-bevel bg-background/5! h-10 w-full flex-1 rounded-xl px-4 py-2 text-sm transition-all focus:ring-1 focus:outline-none sm:h-12 sm:px-5 sm:py-3 sm:text-base",
                    isError
                      ? "border-error/50! text-error placeholder:text-error/50 focus:ring-error/50"
                      : cn(
                          focusVariants({ variant }),
                          "text-foreground placeholder:text-muted-foreground",
                        ),
                  )}
                />
                <Button
                  type="submit"
                  disabled={isFetching || !localValue}
                  className={cn(
                    "glass-panel inner-bevel group text-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-2xl transition-all sm:h-12 sm:w-12",
                    hoverVariants({ variant }),
                  )}
                  activeBgClass={activeBgVariants({ variant })}
                >
                  {isFetching ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : buttonIcon ? (
                    buttonIcon
                  ) : (
                    <ArrowRight className="h-5 w-5 transition-transform hover:translate-x-1" />
                  )}
                </Button>
              </form>
              {isError && (
                <span className="text-error pl-1 text-xs font-medium tracking-wide">
                  User not found. Please try again.
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
