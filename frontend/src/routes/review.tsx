import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title: "Leave a Review" },
      { name: "description", content: "Share your dining experience" },
    ],
  }),
  component: ReviewPage,
});

function ReviewPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Share Your Experience</h1>
          <p className="mt-2 text-muted-foreground">Help us improve with your feedback</p>
        </div>

        <div className="rounded-2xl bg-slate-800 border border-white/10 p-6">
          <p className="text-sm text-muted-foreground">Review form coming soon...</p>
        </div>
      </div>
    </div>
  );
}
