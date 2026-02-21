"use client";
/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
  direction = "horizontal",
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href?: string;
    onClick?: () => void;
    id?: string;
  }[];
  desktopClassName?: string;
  mobileClassName?: string;
  direction?: "horizontal" | "vertical";
}) => {
  return (
    <>
      <FloatingDockDesktop
        items={items}
        className={desktopClassName}
        direction={direction}
      />
      <FloatingDockMobile
        items={items}
        className={mobileClassName}
        direction={direction}
      />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
  direction = "horizontal",
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href?: string;
    onClick?: () => void;
    id?: string;
  }[];
  className?: string;
  direction?: "horizontal" | "vertical";
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className={cn(
              "absolute mb-2 flex gap-2",
              direction === "vertical"
                ? "bottom-0 left-full ml-2 flex-row"
                : "inset-x-0 bottom-full flex-col",
            )}
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"
                  >
                    <div className="h-4 w-4">{item.icon}</div>
                  </a>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"
                  >
                    <div className="h-4 w-4">{item.icon}</div>
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
  direction = "horizontal",
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href?: string;
    onClick?: () => void;
    id?: string;
  }[];
  className?: string;
  direction?: "horizontal" | "vertical";
}) => {
  let mouse = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) =>
        mouse.set(direction === "horizontal" ? e.pageX : e.pageY)
      }
      onMouseLeave={() => mouse.set(Infinity)}
      className={cn(
        "mx-auto hidden rounded-2xl bg-gray-50 md:flex dark:bg-neutral-900",
        direction === "horizontal"
          ? "h-16 items-end gap-4 px-4 pb-3"
          : "w-16 flex-col items-center gap-4 py-4 pr-3",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer
          mouse={mouse}
          key={item.title}
          direction={direction}
          {...item}
        />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouse,
  title,
  icon,
  href,
  onClick,
  direction,
}: {
  mouse: MotionValue;
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  direction?: "horizontal" | "vertical";
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouse, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    if (direction === "vertical") {
      return val - bounds.y - bounds.height / 2;
    }
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex aspect-square items-center justify-center rounded-full transition-colors duration-300"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{
              opacity: 0,
              y: direction === "horizontal" ? 10 : "-50%",
              x: direction === "horizontal" ? "-50%" : -10,
            }}
            animate={{
              opacity: 1,
              y: direction === "horizontal" ? 0 : "-50%",
              x: direction === "horizontal" ? "-50%" : 0,
            }}
            exit={{
              opacity: 0,
              y: direction === "horizontal" ? 2 : "-50%",
              x: direction === "horizontal" ? "-50%" : -2,
            }}
            className={cn(
              "absolute w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white",
              direction === "horizontal"
                ? "-top-8 left-1/2"
                : "top-1/2 left-[calc(100%+16px)] z-50 shadow-xl",
            )}
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center"
      >
        {icon}
      </motion.div>
    </motion.div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }
  return (
    <button onClick={onClick} className="outline-none focus:outline-none">
      {content}
    </button>
  );
}
