export default function Loading() {
  return (
    <div className="bg-background/50 flex h-screen w-full items-center justify-center backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="border-primary text-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent shadow-lg"></div>
        <p className="text-muted-foreground animate-pulse text-sm font-medium">
          Loading amazing stats...
        </p>
      </div>
    </div>
  );
}
