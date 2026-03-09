"use client";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { IntegrationInputCard } from "./features/Platform-Forms";
import { integrations } from "../config/platforms";

export function PlatformsGrid() {
  const getGridSpan = (id: string) => {
    switch (id) {
      case "github":
        return "col-span-1 sm:col-span-2 lg:col-span-2";
      case "leetcode":
        return "col-span-1 sm:col-span-1 lg:col-span-2";
      case "linkedin":
        return "col-span-1 sm:col-span-1 lg:col-span-2";
      case "photo":
        return "col-span-1 sm:col-span-1 lg:col-span-1 row-span-2 flex flex-col";
      default:
        return "col-span-1 sm:col-span-1 lg:col-span-1";
    }
  };

  return (
    <section className="flex min-h-screen w-full items-center justify-center overflow-hidden p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-7xl">
        <BentoGrid>
          {/* 1. Typography */}
          <BentoCard
            className="col-span-1 row-span-2 sm:col-span-2 sm:min-h-[200px] md:col-span-2"
            title="Typography"
            description="Beautiful, responsive type that scales perfectly."
          />

          {/* Render Integration Cards */}
          {integrations.map((item) => {
            const Icon = item.icon;
            const ButtonIcon = item.buttonIcon;

            return (
              <BentoCard
                key={item.id}
                className={`relative overflow-hidden ${getGridSpan(item.id)}`}
                title=""
                description=""
                header={
                  <IntegrationInputCard
                    title={item.title}
                    placeholder={item.placeholder}
                    icon={<Icon className="h-6 w-6" />}
                    variant={item.variant}
                    buttonIcon={
                      ButtonIcon ? (
                        <ButtonIcon className="h-5 w-5 transition-transform" />
                      ) : undefined
                    }
                    storeKey={item.storeKey}
                  />
                }
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}


