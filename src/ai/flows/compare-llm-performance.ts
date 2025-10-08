'use server';

/**
 * @fileOverview Compares the performance of different LLM models for customer order queries.
 *
 * - compareLlmPerformance - A function that compares the accuracy, cost, and response time of different LLM models.
 * - CompareLlmPerformanceInput - The input type for the compareLlmPerformance function.
 * - LlmPerformanceReport - The return type for the compareLlmPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {generateOrderResponse} from './generate-order-response';

const CompareLlmPerformanceInputSchema = z.object({
  orderId: z.string().describe('The ID of the customer order.'),
  customerQuery: z
    .string()
    .describe('The customer query related to the order.'),
  models: z
    .array(z.string())
    .describe(
      'The array of models to compare (e.g., ["gemini-1.5-flash", "gemini-1.5-pro"])'
    ),
});

export type CompareLlmPerformanceInput = z.infer<
  typeof CompareLlmPerformanceInputSchema
>;

const LlmPerformanceReportSchema = z.array(
  z.object({
    model: z.string(),
    response: z.string(),
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
    total_tokens: z.number(),
    latency_ms: z.number(),
  })
);

export type LlmPerformanceReport = z.infer<typeof LlmPerformanceReportSchema>;

export async function compareLlmPerformance(
  input: CompareLlmPerformanceInput
): Promise<LlmPerformanceReport> {
  return compareLlmPerformanceFlow(input);
}

const compareLlmPerformanceFlow = ai.defineFlow(
  {
    name: 'compareLlmPerformanceFlow',
    inputSchema: CompareLlmPerformanceInputSchema,
    outputSchema: LlmPerformanceReportSchema,
  },
  async ({orderId, customerQuery, models}) => {
    const results: LlmPerformanceReport = [];

    for (const model of models) {
      const startTime = Date.now();

      const result = await ai.generate({
        model: `googleai/${model}`,
        prompt: customerQuery,
      });

      const { text, usage } = result;
      const response = text ?? '';
      const prompt_tokens = usage?.promptTokens ?? 0;
      const completion_tokens = usage?.completionTokens ?? 0;
      const total_tokens = usage?.totalTokens ?? 0;

      const endTime = Date.now();
      const latency = endTime - startTime;

      results.push({
        model: model,
        response: response,
        prompt_tokens: prompt_tokens,
        completion_tokens: completion_tokens,
        total_tokens: total_tokens,
        latency_ms: latency,
      });
    }

    return results;
  }
);