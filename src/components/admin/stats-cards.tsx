import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, Stethoscope } from "lucide-react";

export function StatsCards() {
  const stats = [
    {
      title: "Total Patients Today",
      value: "147",
      icon: Users,
      change: "+12.5% from yesterday",
    },
    {
      title: "Average Wait Time",
      value: "24 min",
      icon: Clock,
      change: "-5.2% from yesterday",
    },
    {
      title: "Doctors on Duty",
      value: "2",
      icon: Stethoscope,
      change: "Cardiology, Neurology",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
