export default function ExportResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main>
      <h1>Export Result</h1>
      <p>Dynamic route for viewing/downloading the final card.</p>
    </main>
  );
}
