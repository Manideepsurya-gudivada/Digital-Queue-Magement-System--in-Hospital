import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { notifications } from "@/lib/data";

export function Notifications() {
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {notifications.slice(0, 3).map((notification) => (
            <li key={notification.id} className="flex items-start gap-4">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-accent" />
              <div>
                <p className="font-medium">{notification.message}</p>
                <p className="text-sm text-muted-foreground">{notification.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
