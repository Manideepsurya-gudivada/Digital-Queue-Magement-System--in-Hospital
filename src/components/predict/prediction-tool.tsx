
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { predictWaitTime } from '@/ai/flows/intelligent-wait-time-prediction';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2 } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import type { PredictWaitTimeOutput } from '@/ai/flows/intelligent-wait-time-prediction';


const initialState: PredictWaitTimeOutput = {
  estimatedWaitTime: 0,
  confidenceLevel: 0,
  rationale: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
      {pending ? 'Predicting...' : 'Predict Wait Time'}
    </Button>
  );
}

export function PredictionTool() {
  const [state, formAction] = useActionState(predictWaitTime, initialState);

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
        <Card>
            <form action={formAction}>
            <CardHeader>
                <CardTitle>Intelligent Wait Time Predictor</CardTitle>
                <CardDescription>Use AI to forecast queue wait times based on current conditions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="patientLoad">Patient Load</Label>
                <Input id="patientLoad" name="patientLoad" type="number" placeholder="e.g., 25" defaultValue="3" required />
                </div>
                <div className="space-y-2">
                <Label htmlFor="doctorSchedule">Doctor Schedule</Label>
                <Textarea id="doctorSchedule" name="doctorSchedule" placeholder="e.g., Dr. Reed on duty until 5pm..." defaultValue="Dr. Reed (Cardiology) until 5pm. Dr. Green (Neurology) until 6pm." required />
                </div>
                <div className="space-y-2">
                <Label htmlFor="caseComplexity">Case Complexity</Label>
                <Input id="caseComplexity" name="caseComplexity" placeholder="e.g., High" defaultValue="Moderate - mix of routine check-ups and new patient consultations." required />
                </div>
                <div className="space-y-2">
                <Label htmlFor="historicalData">Historical Data</Label>
                <Textarea id="historicalData" name="historicalData" placeholder="e.g., Average wait time on Mondays is 30 mins..." defaultValue="On a typical Tuesday afternoon, wait times average 20-30 minutes. Peak hours are 10am-12pm." required />
                </div>
            </CardContent>
            <CardFooter>
                <SubmitButton />
            </CardFooter>
            </form>
        </Card>

        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle>Prediction Result</CardTitle>
                <CardDescription>The estimated wait time based on the provided data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
            {state.estimatedWaitTime > 0 ? (
                <>
                <div>
                    <p className="text-sm text-muted-foreground">Estimated Wait Time</p>
                    <p className="text-4xl font-bold text-primary">{state.estimatedWaitTime} minutes</p>
                </div>
                <div>
                    <Label>Confidence Level: {Math.round((state.confidenceLevel || 0) * 100)}%</Label>
                    <Progress value={(state.confidenceLevel || 0) * 100} className="mt-2" />
                </div>
                <div>
                    <p className="text-sm font-medium">Rationale</p>
                    <p className="text-sm text-muted-foreground mt-1">{state.rationale}</p>
                </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-48">
                    <Wand2 className="h-12 w-12 mb-4" />
                    <p>Your AI-powered prediction will appear here.</p>
                </div>
            )}
            </CardContent>
        </Card>
    </div>
  );
}
