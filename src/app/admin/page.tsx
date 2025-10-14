import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatsCards } from "@/components/admin/stats-cards";
import { PatientFlowChart } from "@/components/admin/patient-flow-chart";
import { DoctorManagementTable } from "@/components/admin/doctor-management-table";
import { users } from "@/lib/data";

export default function AdminDashboardPage() {
  const adminUser = users.find(u => u.role === 'ADMIN');

  if (!adminUser) {
    return <div>Admin user not found.</div>;
  }

  return (
    <DashboardLayout user={adminUser} pageTitle="Admin Analytics">
      <div className="flex flex-col gap-8">
        <StatsCards />
        <div className="grid gap-8 lg:grid-cols-2">
          <PatientFlowChart />
          <DoctorManagementTable />
        </div>
      </div>
    </DashboardLayout>
  );
}
