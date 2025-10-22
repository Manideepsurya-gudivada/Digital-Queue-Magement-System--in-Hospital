'use client';

import { Stethoscope, Users, Clock } from "lucide-react";

const stats = [
    {
      icon: <Users className="h-8 w-8 text-white" />,
      label: "Total Patients Today",
      value: "500+",
    },
    {
      icon: <Clock className="h-8 w-8 text-white" />,
      label: "Average Wait Time",
      value: "15m",
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-white" />,
      label: "Doctors on Duty",
      value: "12",
    },
];
  

export function HospitalInfoWidget() {
    return (
        <div>
            <h2 className="text-3xl font-bold font-headline">MediQueue Pro</h2>
            <p className="mt-2 text-white/80">
                Welcome to the future of hospital management. Streamlining patient care with intelligent queueing.
            </p>
            <div className="mt-10 space-y-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="flex items-center gap-4">
                        <div className="bg-white/10 p-3 rounded-lg">
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-sm text-white/80">{stat.label}</p>
                            <p className="text-xl font-bold">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
