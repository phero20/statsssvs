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
    <div
      className={cn(
        "grid w-full auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-6",
        className,
      )}
    >
      {children}
    </div>
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
      className={cn(
        "flex cursor-pointer flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm transition-colors hover:border-zinc-700",
        className,
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      {...props}
    >
      {header && (
        <div
          className={cn(
            "flex flex-1 items-center justify-center px-8 pt-8",
            headerClassName,
          )}
        >
          {header}
        </div>
      )}
      {children}
      {(title || description || icon) && (
        <div className={cn("mt-4 flex flex-col px-8 pb-8", contentClassName)}>
          {icon && <div className="mb-2">{icon}</div>}
          {title && typeof title === "string" ? (
            <h3 className="flex items-center gap-2 font-serif text-xl font-medium text-white">
              {title}
            </h3>
          ) : (
            title
          )}
          {description && typeof description === "string" ? (
            <p className="mt-1 text-sm text-gray-400">{description}</p>
          ) : (
            description
          )}
        </div>
      )}
    </motion.div>
  );
};
