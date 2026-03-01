"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { motion, AnimatePresence, useAnimate } from "motion/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  activeBgClass?: string;
  children: React.ReactNode;
}

export const Button = ({
  className,
  activeBgClass,
  children,
  ...props
}: ButtonProps) => {
  const [scope, animate] = useAnimate();

  const animateLoading = async () => {
    animate(".active-bg", { opacity: 1 }, { duration: 0.2 });
    animate(".child-container", { opacity: 0, scale: 0.8 }, { duration: 0.2 });
    await animate(
      ".loader",
      {
        opacity: 1,
        scale: 1,
      },
      {
        duration: 0.2,
      },
    );
  };

  const animateSuccess = async () => {
    animate(
      ".loader",
      {
        opacity: 0,
        scale: 0.5,
      },
      {
        duration: 0.2,
      },
    );
    await animate(
      ".check",
      {
        opacity: 1,
        scale: 1,
      },
      {
        duration: 0.2,
      },
    );

    animate(".active-bg", { opacity: 0 }, { delay: 2, duration: 0.2 });
    await animate(
      ".check",
      {
        opacity: 0,
        scale: 0.5,
      },
      {
        delay: 2,
        duration: 0.2,
      },
    );
    await animate(
      ".child-container",
      { opacity: 1, scale: 1 },
      { duration: 0.2 },
    );
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    await animateLoading();
    await props.onClick?.(event);
    await animateSuccess();
  };

  const {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onAnimationStart,
    onAnimationEnd,
    ...buttonProps
  } = props;

  return (
    <motion.button
      layout
      layoutId="button"
      ref={scope}
      className={cn(
        "relative flex shrink-0 cursor-pointer items-center justify-center rounded-full font-medium transition duration-200",
        className,
      )}
      {...buttonProps}
      onClick={handleClick}
    >
      <motion.div
        className={cn(
          "active-bg pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-colors",
          activeBgClass,
        )}
      />
      <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center text-current">
        <Loader />
        <CheckIcon />
      </div>
      <motion.span
        className="child-container relative z-10 flex items-center justify-center"
        layout
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

const Loader = () => {
  return (
    <motion.svg
      animate={{
        rotate: [0, 360],
      }}
      initial={{
        scale: 0,
        opacity: 0,
      }}
      style={{
        scale: 0.5,
        opacity: 0,
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
        ease: "linear",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="loader col-start-1 row-start-1"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </motion.svg>
  );
};

const CheckIcon = () => {
  return (
    <motion.svg
      initial={{
        scale: 0,
        opacity: 0,
      }}
      style={{
        scale: 0.5,
        opacity: 0,
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="check col-start-1 row-start-1"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </motion.svg>
  );
};
