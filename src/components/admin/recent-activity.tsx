import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { recentActivities } from "@/lib/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>A live feed of events happening in the hospital.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="flex h-1.5 w-1.5 translate-y-2 rounded-full bg-primary" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm leading-snug text-muted-foreground">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
