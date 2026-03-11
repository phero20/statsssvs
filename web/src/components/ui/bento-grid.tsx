"use client";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
          },
        },
      }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "grid w-full auto-rows-[180px] grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:auto-rows-[200px] lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export interface BentoCardProps extends Omit<
  HTMLMotionProps<"div">,
  "title" | "children"
> {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  contentClassName?: string;
  headerClassName?: string;
  children?: React.ReactNode;
}

export const BentoCard = ({
  className,
  title,
  description,
  header,
  icon,
  contentClassName,
  headerClassName,
  children,
  ...props
}: BentoCardProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.9, y: 30 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            duration: 1,
            ease: [0.23, 0.86, 0.39, 0.96],
            opacity: { duration: .8 },
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      whileHover="hover"
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl",
        className,
      )}
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.018) 60%, rgba(255,255,255,0.008) 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(16px)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.05) inset, 0 8px 32px rgba(0,0,0,0.28)",
      }}
      {...props}
    >
      {/* Top inset highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.1) 50%, transparent 90%)",
        }}
      />

      {/* Hover border shimmer */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          border: "1px solid rgba(255,255,255,0.13)",
          boxShadow: "0 0 24px rgba(255,255,255,0.04) inset",
        }}
      />

      {/* Header area */}
      {header && (
        <div
          className={cn(
            "relative flex flex-1 items-center justify-center overflow-hidden",
            headerClassName,
          )}
        >
          {header}
        </div>
      )}

      {children}

      {/* Footer content */}
      {(title || description || icon) && (
        <div
          className={cn(
            "relative z-10 flex flex-col px-5 pb-5 sm:px-6 sm:pb-6",
            contentClassName,
          )}
        >
          {/* Separator */}
          {header && (
            <div
              className="mb-4 h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
              }}
            />
          )}

          <div className="flex items-start gap-3">
            {icon && (
              <div
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span className="text-white/50 [&>svg]:h-4 [&>svg]:w-4">
                  {icon}
                </span>
              </div>
            )}

            <div className="flex flex-col gap-0.5">
              {title &&
                (typeof title === "string" ? (
                  <h3
                    className="text-[15px] leading-snug font-medium tracking-tight"
                    style={{ color: "rgba(255,255,255,0.82)" }}
                  >
                    {title}
                  </h3>
                ) : (
                  title
                ))}
              {description &&
                (typeof description === "string" ? (
                  <p
                    className="text-[13px] leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.36)" }}
                  >
                    {description}
                  </p>
                ) : (
                  description
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom fade — blends content into card */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 100%)",
        }}
      />
    </motion.div>
  );
};
