import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap } from "lucide-react"

export default function StreamingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4">HTTP Streaming Demo</h1>
            <p className="text-muted-foreground">
              Coming soon: Character-by-character text streaming demonstration with real-time display updates
            </p>
          </div>
          
          <Card className="text-left mb-8">
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>What this demo will showcase</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• HTTP streaming endpoint with long text content</li>
                <li>• Character-by-character real-time display</li>
                <li>• Stream processing with incremental updates</li>
                <li>• Complete text display when stream closes</li>
                <li>• Response time visualization</li>
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