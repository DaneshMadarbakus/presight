import { QueueDisplay } from "@/components/queue/QueueDisplay";

export default function QueuePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Queue Processing</h1>
          <p className="text-muted-foreground text-lg">
            WebWorker + WebSocket queue processing system
          </p>
        </div>

        <QueueDisplay />
      </div>
    </div>
  );
}
