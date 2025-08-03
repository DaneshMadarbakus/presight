import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Radio } from "lucide-react"

export default function QueuePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Radio className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4">WebSocket Queue Demo</h1>
            <p className="text-muted-foreground">
              Coming soon: Background processing with WebWorkers and real-time WebSocket communication
            </p>
          </div>
          
          <Card className="text-left mb-8">
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>What this demo will showcase</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Request queuing with in-memory storage</li>
                <li>• Background processing using WebWorkers</li>
                <li>• Real-time results via WebSocket communication</li>
                <li>• 20-item pending/result state management</li>
                <li>• Queue status visualization</li>
              </ul>
            </CardContent>
          </Card>
          
          <Button asChild>
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}