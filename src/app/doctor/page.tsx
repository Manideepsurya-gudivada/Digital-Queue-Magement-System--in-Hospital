import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PatientQueueTable } from "@/components/doctor/patient-queue-table";
import { users } from "@/lib/data";

export default function DoctorDashboardPage() {
  // For demo purposes, we'll use the first doctor.
  const doctorUser = users.find(u => u.email.startsWith('evelyn'));
  const doctorId = "doc-1"; // Hardcoded for demo

  if (!doctorUser) {
    return <div>Doctor user not found.</div>;
  }

  return (
    <DashboardLayout user={doctorUser} pageTitle="Patient Queue">
      <Card>
        <CardHeader>
          <CardTitle>Today's Patient Queue</CardTitle>
          <CardDescription>
            Manage your patient consultations for the day.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PatientQueueTable doctorId={doctorId} />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
