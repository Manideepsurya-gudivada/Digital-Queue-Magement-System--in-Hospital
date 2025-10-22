import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { departmentMetrics } from "@/lib/data";
import { Users, Clock, Stethoscope } from "lucide-react";

export function DepartmentPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Performance</CardTitle>
        <CardDescription>Live metrics for hospital departments.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Department</TableHead>
              <TableHead className="text-center">Patients</TableHead>
              <TableHead className="text-center">Avg. Wait</TableHead>
              <TableHead className="text-center">Doctors</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departmentMetrics.map((metric) => (
              <TableRow key={metric.id}>
                <TableCell className="font-semibold">{metric.name}</TableCell>
                <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{metric.patientLoad}</span>
                    </div>
                </TableCell>
                <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{metric.avgWaitTime} min</span>
                    </div>
                </TableCell>
                <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                        <Stethoscope className="h-4 w-4 text-muted-foreground" />
                        <span>{metric.doctorCount}</span>
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
