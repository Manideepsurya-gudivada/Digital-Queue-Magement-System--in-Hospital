import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { users, caseStudies as allCaseStudies } from "@/lib/data";
import { CaseStudySearch } from "@/components/case-studies/search";
import { StudyCard } from "@/components/case-studies/study-card";
import { Separator } from "@/components/ui/separator";

export default function CaseStudiesPage() {
  const doctorUser = users.find(u => u.role === 'DOCTOR');

  if (!doctorUser) {
    return <div>User not found.</div>;
  }

  return (
    <DashboardLayout user={doctorUser} pageTitle="Case Study Library">
      <div className="space-y-8">
        <CaseStudySearch />
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCaseStudies.map((study) => (
            <StudyCard key={study.id} study={study} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
