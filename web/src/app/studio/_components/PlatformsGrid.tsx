"use client";
import React from "react";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { IntegrationInputCard } from "./features/Platform-Forms";
import { Button } from "@/components/ui/stateful-button";
import { integrations } from "../config/platforms";

export function PlatformsGrid() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center overflow-hidden p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-360">
        <BentoGrid>
          {/* 1. Typography */}
          <BentoCard
            className="col-span-1 row-span-2 sm:col-span-2 sm:min-h-[200px] md:col-span-2"
            title="Typography"
            description="Beautiful, responsive type that scales perfectly."
          />

          {/* Render Integration Cards */}
          {integrations.map((item) => (
            <BentoCard
              key={item.id}
              className={`relative overflow-hidden ${item.className || "col-span-1"}`}
              title=""
              description=""
              header={
                <IntegrationInputCard
                  title={item.title}
                  placeholder={item.placeholder}
                  icon={item.icon}
                  iconColorClass={item.iconColorClass}
                  glowClass={item.glowClass}
                  titleGradientClass={item.titleGradientClass}
                  inputFocusClass={item.inputFocusClass}
                  buttonHoverClass={item.buttonHoverClass}
                  activeBgClass={item.activeBgClass}
                  buttonIcon={item.buttonIcon}
                />
              }
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

// const integrations = [
//   {
//     id: "github",
//     title: "GitHub Username",
//     placeholder: "Enter username...",
//     icon: <Github className="h-6 w-6" />,
//     iconColorClass: "text-github",
//     glowClass: "drop-shadow-[0_0_12px_var(--color-github)]",
//     titleGradientClass: "via-github",
//     inputFocusClass: "focus:border-github focus:ring-1 focus:ring-github/50",
//     buttonHoverClass:
//       "hover:border-github/50 hover:bg-github/10 hover:ring-1 hover:ring-github hover:ring-offset-1 hover:ring-offset-background",
//     activeBgClass: "bg-github",
//   },
//   {
//     id: "leetcode",
//     title: "Leetcode Username",
//     placeholder: "Enter username...",
//     icon: <Code2 className="h-6 w-6" />,
//     iconColorClass: "text-leetcode",
//     glowClass: "drop-shadow-[0_0_12px_var(--color-leetcode)]",
//     titleGradientClass: "via-leetcode",
//     inputFocusClass:
//       "focus:border-leetcode focus:ring-1 focus:ring-leetcode/50",
//     buttonHoverClass:
//       "hover:border-leetcode/50 hover:bg-leetcode/10 hover:ring-1 hover:ring-leetcode hover:ring-offset-1 hover:ring-offset-background",
//     activeBgClass: "bg-leetcode",
//   },
//   {
//     id: "codeforces",
//     title: "Codeforces Handle",
//     placeholder: "Enter handle...",
//     icon: <BarChart2 className="h-6 w-6" />,
//     iconColorClass: "text-codeforces",
//     glowClass: "drop-shadow-[0_0_12px_var(--color-codeforces)]",
//     titleGradientClass: "via-codeforces",
//     inputFocusClass:
//       "focus:border-codeforces focus:ring-1 focus:ring-codeforces/50",
//     buttonHoverClass:
//       "hover:border-codeforces/50 hover:bg-codeforces/10 hover:ring-1 hover:ring-codeforces hover:ring-offset-1 hover:ring-offset-background",
//     activeBgClass: "bg-codeforces",
//   },
//   {
//     id: "portfolio",
//     title: "Portfolio URL",
//     placeholder: "Enter website URL...",
//     icon: <Globe className="h-6 w-6" />,
//     iconColorClass: "text-portfolio",
//     glowClass: "drop-shadow-[0_0_12px_var(--color-portfolio)]",
//     titleGradientClass: "via-portfolio",
//     inputFocusClass:
//       "focus:border-portfolio focus:ring-1 focus:ring-portfolio/50",
//     buttonHoverClass:
//       "hover:border-portfolio/50 hover:bg-portfolio/10 hover:ring-1 hover:ring-portfolio hover:ring-offset-1 hover:ring-offset-background",
//     activeBgClass: "bg-portfolio",
//   },
//   {
//     id: "linkedin",
//     title: "LinkedIn URL",
//     placeholder: "Enter LinkedIn URL...",
//     icon: <Linkedin className="h-6 w-6" />,
//     iconColorClass: "text-linkedin",
//     glowClass: "drop-shadow-[0_0_12px_var(--color-linkedin)]",
//     titleGradientClass: "via-linkedin",
//     inputFocusClass:
//       "focus:border-linkedin focus:ring-1 focus:ring-linkedin/50",
//     buttonHoverClass:
//       "hover:border-linkedin/50 hover:bg-linkedin/10 hover:ring-1 hover:ring-linkedin hover:ring-offset-1 hover:ring-offset-background",
//     activeBgClass: "bg-linkedin",
//   },
//   {
//     id: "name",
//     title: "Full Name",
//     placeholder: "Enter full name...",
//     icon: <User className="h-6 w-6" />,
//     iconColorClass: "text-name",
//     glowClass: "drop-shadow-[0_0_12px_var(--color-name)]",
//     titleGradientClass: "via-name",
//     inputFocusClass: "focus:border-name focus:ring-1 focus:ring-name/50",
//     buttonHoverClass:
//       "hover:border-name/50 hover:bg-name/10 hover:ring-1 hover:ring-name hover:ring-offset-1 hover:ring-offset-background",
//     activeBgClass: "bg-name",
//   },
//   {
//     id: "photo",
//     title: "Profile Photo URL",
//     placeholder: "Enter image URL...",
//     icon: <Camera className="h-6 w-6" />,
//     iconColorClass: "text-photo",
//     glowClass: "drop-shadow-[0_0_12px_var(--color-photo)]",
//     titleGradientClass: "via-photo",
//     inputFocusClass: "focus:border-photo focus:ring-1 focus:ring-photo/50",
//     buttonHoverClass:
//       "hover:border-photo/50 hover:bg-photo/10 hover:ring-1 hover:ring-photo hover:ring-offset-1 hover:ring-offset-background",
//     activeBgClass: "bg-photo",
//   },
//   {
//     id: "email",
//     title: "Public Email",
//     placeholder: "Enter public email...",
//     icon: <Mail className="h-6 w-6" />,
//     iconColorClass: "text-email",
//     glowClass: "drop-shadow-[0_0_12px_var(--color-email)]",
//     titleGradientClass: "via-email",
//     inputFocusClass: "focus:border-email focus:ring-1 focus:ring-email/50",
//     buttonHoverClass:
//       "hover:border-email/50 hover:bg-email/10 hover:ring-1 hover:ring-email hover:ring-offset-1 hover:ring-offset-background",
//     activeBgClass: "bg-email",
//   },
// ];

// export function PlatformsGrid() {
//   return (
//     <section className="flex min-h-screen items-center justify-center px-6">
//       <div className="mx-auto w-full max-w-340">
//         <BentoGrid>
//           {/* 1. Typography */}
//           <BentoCard
//             className="md:col-span-2 md:row-span-2"
//             title="Typography"
//             description="Beautiful, responsive type that scales perfectly."
//           />

//           {/* Render Integration Cards */}
//           {integrations.map((item) => (
//             <BentoCard
//               key={item.id}
//               className="relative overflow-hidden md:col-span-1"
//               title=""
//               description=""
//               header={
//                 <IntegrationInputCard
//                   title={item.title}
//                   placeholder={item.placeholder}
//                   icon={item.icon}
//                   iconColorClass={item.iconColorClass}
//                   glowClass={item.glowClass}
//                   titleGradientClass={item.titleGradientClass}
//                   inputFocusClass={item.inputFocusClass}
//                   buttonHoverClass={item.buttonHoverClass}
//                   activeBgClass={item.activeBgClass}
//                 />
//               }
//             />
//           ))}
//         </BentoGrid>
//       </div>
//     </section>
//   );
// }
