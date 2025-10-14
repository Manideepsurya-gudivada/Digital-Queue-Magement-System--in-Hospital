import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ProfileForm } from "@/components/profile/profile-form";
import { users } from "@/lib/data";

export default function ProfilePage() {
  // We'll show the profile for a sample patient user
  const user = users.find(u => u.email.startsWith('jane'));

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <DashboardLayout user={user} pageTitle="Profile Settings">
      <ProfileForm user={user} />
    </DashboardLayout>
  );
}
