'use server';

/**
 * @fileOverview This flow analyzes the sentiment of a given text.
 *
 * - analyzeSentiment - Analyzes the sentiment of the input text.
 * - AnalyzeSentimentInput - The input type for the analyzeSentiment function.
 * - AnalyzeSentimentOutput - The return type for the analyzeSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSentimentInputSchema = z.object({
  text: z.string().describe('The text to analyze for sentiment.'),
});

export type AnalyzeSentimentInput = z.infer<typeof AnalyzeSentimentInputSchema>;

const AnalyzeSentimentOutputSchema = z.object({
  sentiment: z.string().describe('The sentiment of the text (positive, negative, or neutral).'),
  score: z.number().describe('A numerical score representing the sentiment strength (-1 to 1).'),
});

export type AnalyzeSentimentOutput = z.infer<typeof AnalyzeSentimentOutputSchema>;

export async function analyzeSentiment(input: AnalyzeSentimentInput): Promise<AnalyzeSentimentOutput> {
  return analyzeSentimentFlow(input);
}

const sentimentPrompt = ai.definePrompt({
  name: 'sentimentPrompt',
  input: {schema: AnalyzeSentimentInputSchema},
  output: {schema: AnalyzeSentimentOutputSchema},
  prompt: `Analyze the sentiment of the following text and provide a sentiment label (positive, negative, or neutral) and a sentiment score between -1 and 1. -1 being most negative, and 1 being most positive.

Text: {{{text}}}

Output in JSON format:
{
  "sentiment": "sentiment",
  "score": score
}
`,
});

const analyzeSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeSentimentFlow',
    inputSchema: AnalyzeSentimentInputSchema,
    outputSchema: AnalyzeSentimentOutputSchema,
  },
  async input => {
    const {output} = await sentimentPrompt(input);
    return output!;
  }
);
