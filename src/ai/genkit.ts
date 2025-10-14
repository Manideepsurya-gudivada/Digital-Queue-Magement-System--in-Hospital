import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI({retries: 2})],
  model: 'googleai/gemini-2.5-flash',
});
