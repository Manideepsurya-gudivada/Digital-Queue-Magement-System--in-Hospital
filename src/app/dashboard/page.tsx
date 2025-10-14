import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { QueueStatus } from "@/components/dashboard/queue-status";
import { Notifications } from "@/components/dashboard/notifications";
import { users } from "@/lib/data";

export default function PatientDashboardPage() {
  const patientUser = users.find(u => u.email.startsWith('jane')); // Demo for Jane Smith

  if (!patientUser) {
    return <div>Patient user not found.</div>;
  }

  return (
    <DashboardLayout user={patientUser} pageTitle="My Dashboard">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:w-1/2 flex-grow">
          <QueueStatus />
        </div>
        <div className="w-full lg:w-1/2 flex-grow">
          <Notifications />
        </div>
      </div>
    </DashboardLayout>
  );
}
