'use server';

/**
 * @fileOverview An NLP-based search for case studies.
 *
 * - caseStudyNlpSearch - A function that handles the NLP-based search for case studies.
 * - CaseStudyNlpSearchInput - The input type for the caseStudyNlpSearch function.
 * - CaseStudyNlpSearchOutput - The return type for the caseStudyNlpSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CaseStudyNlpSearchInputSchema = z.object({
  query: z.string().describe('The natural language query to search for.'),
});
export type CaseStudyNlpSearchInput = z.infer<typeof CaseStudyNlpSearchInputSchema>;

const CaseStudyNlpSearchOutputSchema = z.object({
  results: z
    .array(z.string())
    .describe('A list of case study summaries that match the query.'),
});
export type CaseStudyNlpSearchOutput = z.infer<typeof CaseStudyNlpSearchOutputSchema>;

export async function caseStudyNlpSearch(input: CaseStudyNlpSearchInput): Promise<CaseStudyNlpSearchOutput> {
  return caseStudyNlpSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'caseStudyNlpSearchPrompt',
  input: {schema: CaseStudyNlpSearchInputSchema},
  output: {schema: CaseStudyNlpSearchOutputSchema},
  prompt: `You are a medical expert who can search for case studies based on a natural language query.\n\nGiven the following query, please provide a list of case study summaries that match the query.\n\nQuery: {{{query}}}\n\nPlease provide the results in a JSON format.`,
});

const caseStudyNlpSearchFlow = ai.defineFlow(
  {
    name: 'caseStudyNlpSearchFlow',
    inputSchema: CaseStudyNlpSearchInputSchema,
    outputSchema: CaseStudyNlpSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
