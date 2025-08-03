import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function PeoplePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Virtual Scrolling Demo</h1>
            <p className="text-muted-foreground">
              Coming soon: Paginated user list with infinite scroll, filtering, and search capabilities using @tanstack/react-virtual
            </p>
          </div>
          
          <Card className="text-left mb-8">
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>What this demo will showcase</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Virtual scrolling with @tanstack/react-virtual</li>
                <li>• Infinite scroll pagination</li>
                <li>• Real-time search by name</li>
                <li>• Filter by nationality and hobbies</li>
                <li>• Responsive card layout</li>
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