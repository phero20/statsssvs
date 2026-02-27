import type { Metadata } from "next";
import { StudioBackground } from "./_components/Background";

export const metadata: Metadata = {
  title: "DevStats - Studio",
  description: "Connect your competitive coding profiles.",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StudioBackground>{children}</StudioBackground>;
}
