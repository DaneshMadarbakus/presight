import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QueueDisplay } from "@/components/queue/QueueDisplay";

export default function QueuePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-4 lg:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1 lg:mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Queue Processing
            </h1>
            <p className="text-sm lg:text-base text-muted-foreground">
              WebWorker + WebSocket queue processing system
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/">← Back</Link>
          </Button>
        </div>

        <QueueDisplay />
      </div>
    </div>
  );
}
