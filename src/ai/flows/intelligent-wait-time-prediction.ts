'use server';

/**
 * @fileOverview An intelligent wait time prediction AI agent.
 *
 * - predictWaitTime - A function that predicts the wait time.
 * - PredictWaitTimeInput - The input type for the predictWaitTime function.
 * - PredictWaitTimeOutput - The return type for the predictWaitTime function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictWaitTimeInputSchema = z.object({
  patientLoad: z.number().describe('The current number of patients waiting.'),
  doctorSchedule: z.string().describe('The doctor schedule for the day.'),
  caseComplexity: z.string().describe('The complexity of the cases being handled.'),
  historicalData: z.string().describe('Historical data on wait times.'),
});
export type PredictWaitTimeInput = z.infer<typeof PredictWaitTimeInputSchema>;

const PredictWaitTimeOutputSchema = z.object({
  estimatedWaitTime: z
    .number()
    .describe('The estimated wait time in minutes.'),
  confidenceLevel: z
    .number()
    .describe('The confidence level of the prediction (0-1).'),
  rationale: z.string().describe('The rationale for the wait time prediction.'),
});
export type PredictWaitTimeOutput = z.infer<typeof PredictWaitTimeOutputSchema>;

export async function predictWaitTime(
  input: PredictWaitTimeInput
): Promise<PredictWaitTimeOutput> {
  return predictWaitTimeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictWaitTimePrompt',
  input: {schema: PredictWaitTimeInputSchema},
  output: {schema: PredictWaitTimeOutputSchema},
  prompt: `You are an expert in predicting wait times for a hospital queue.

You will be provided with the current patient load, the doctor's schedule, the complexity of the cases being handled, and historical data on wait times.

Based on this information, you will predict the estimated wait time for a patient.

Patient Load: {{{patientLoad}}}
Doctor Schedule: {{{doctorSchedule}}}
Case Complexity: {{{caseComplexity}}}
Historical Data: {{{historicalData}}}

Consider all factors to arrive at the most accurate estimated wait time.

Please provide the estimated wait time in minutes, a confidence level (0-1), and a rationale for your prediction.

Output in JSON format.
`,
});

const predictWaitTimeFlow = ai.defineFlow(
  {
    name: 'predictWaitTimeFlow',
    inputSchema: PredictWaitTimeInputSchema,
    outputSchema: PredictWaitTimeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
