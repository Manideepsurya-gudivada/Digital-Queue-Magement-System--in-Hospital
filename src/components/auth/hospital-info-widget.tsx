'use client';

import { Users, Clock, Stethoscope } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function HospitalInfoWidget() {
  const stats = [
    {
      title: "Total Patients Today",
      value: "147",
      icon: Users,
    },
    {
      title: "Average Wait Time",
      value: "24 min",
      icon: Clock,
    },
    {
      title: "Doctors on Duty",
      value: "2",
      icon: Stethoscope,
    },
  ];
  return (
    <div className="flex flex-col justify-center h-full text-white">
        <h2 className="text-3xl font-bold font-headline mb-4">Welcome to MediQueue Pro</h2>
        <p className="text-blue-100 mb-8">Your intelligent partner in hospital management. Providing seamless care and efficient service.</p>
        <div className="space-y-4">
            {stats.map((stat) => (
                <Card key={stat.title} className="bg-white/20 border-white/30 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="h-4 w-4 text-blue-100" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
