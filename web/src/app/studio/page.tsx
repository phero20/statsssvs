import { PlatformsGrid } from "./_components/PlatformsGrid";
import Preview from "./_components/features/Preview";


export default function StudioPage() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center py-24 gap-24">
      <PlatformsGrid />
      <Preview />
   </main>
  );
}
