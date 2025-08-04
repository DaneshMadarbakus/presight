import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Zap, Radio } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "Virtual Scrolling",
      description:
        "Paginated user list with infinite scroll, filtering, and search capabilities",
      icon: Users,
      href: "/people",
      badge: "React Virtual",
    },
    {
      title: "HTTP Streaming",
      description:
        "Character-by-character text streaming demonstration with real-time display updates",
      icon: Zap,
      href: "/streaming",
      badge: "Streaming API",
    },
    {
      title: "WebSocket Queue",
      description:
        "Background processing with WebWorkers and real-time WebSocket communication",
      icon: Radio,
      href: "/queue",
      badge: "WebSockets",
    },
  ];

  const techStack = [
    "Next.js",
    "TypeScript",
    "shadcn/ui",
    "Tailwind CSS",
    "Express",
    "@tanstack/react-virtual",
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-4 pt-16 pb-6 sm:pt-20 sm:pb-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Presight
          </span>{" "}
          Tech Exercise
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
          Three technical demonstrations showcasing virtual scrolling, HTTP
          streaming, and WebSocket communication
        </p>

        <div className="flex flex-wrap gap-2 justify-center mb-8 sm:mb-12">
          {techStack.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 pb-12 sm:pb-20">
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card key={feature.title} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <IconComponent className="h-6 w-6 text-primary" />
                    <Badge variant="outline">{feature.badge}</Badge>
                  </div>
                  <CardTitle className="text-lg sm:text-xl">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={feature.href}>View Demo</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
