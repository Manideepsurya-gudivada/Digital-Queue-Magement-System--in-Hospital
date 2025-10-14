'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartTooltipContent, ChartTooltip, ChartContainer } from '@/components/ui/chart';

const chartData = [
  { time: "8am", patients: 12 },
  { time: "9am", patients: 23 },
  { time: "10am", patients: 31 },
  { time: "11am", patients: 28 },
  { time: "12pm", patients: 19 },
  { time: "1pm", patients: 25 },
  { time: "2pm", patients: 22 },
  { time: "3pm", patients: 30 },
  { time: "4pm", patients: 18 },
];

const chartConfig = {
  patients: {
    label: "Patients",
    color: "hsl(var(--primary))",
  },
};

export function PatientFlowChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Flow Today</CardTitle>
        <CardDescription>Number of patients checked in per hour.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="patients" fill="var(--color-patients)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
