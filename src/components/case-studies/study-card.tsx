import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CaseStudy } from "@/lib/data";
import { getDoctorById } from "@/lib/data";
import { format } from "date-fns";

interface StudyCardProps {
  study: CaseStudy;
}

export function StudyCard({ study }: StudyCardProps) {
  const doctor = getDoctorById(study.doctorId);
  return (
    <Card className="flex flex-col">
      {study.image && (
        <div className="aspect-[4/3] relative w-full">
          <Image
            src={study.image.imageUrl}
            alt={study.title}
            fill
            className="object-cover rounded-t-lg"
            data-ai-hint={study.image.imageHint}
          />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="font-headline text-lg">{study.title}</CardTitle>
          <Badge variant="secondary">{study.category}</Badge>
        </div>
        <CardDescription>By {doctor?.name || 'Unknown'} on {format(new Date(study.createdAt), "PPP")}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {study.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Read More</Button>
      </CardFooter>
    </Card>
  );
}
