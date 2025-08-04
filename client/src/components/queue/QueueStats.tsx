import { Card } from "@/components/ui/card";

interface QueueStatsProps {
  pendingCount: number;
  processingCount: number;
  completedCount: number;
  errorCount: number;
}

const StatCard = ({ count, label, colorClass }: { count: number; label: string; colorClass: string }) => (
  <Card className="p-4">
    <div className="text-center">
      <div className={`text-2xl font-bold ${colorClass}`}>{count}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  </Card>
);

export function QueueStats({ pendingCount, processingCount, completedCount, errorCount }: QueueStatsProps) {
  const stats = [
    { count: pendingCount, label: 'Pending', colorClass: 'text-yellow-600' },
    { count: processingCount, label: 'Processing', colorClass: 'text-blue-600' },
    { count: completedCount, label: 'Completed', colorClass: 'text-green-600' },
    { count: errorCount, label: 'Errors', colorClass: 'text-red-600' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}