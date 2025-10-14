import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PredictionTool } from "@/components/predict/prediction-tool";
import { users } from "@/lib/data";

export default function PredictPage() {
  const adminUser = users.find(u => u.role === 'ADMIN');

  if (!adminUser) {
    return <div>Admin user not found.</div>;
  }

  return (
    <DashboardLayout user={adminUser} pageTitle="AI Prediction Tool">
      <PredictionTool />
    </DashboardLayout>
  );
}
