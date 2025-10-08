'use server';

/**
 * @fileOverview A flow to generate responses to customer order questions using GenAI.
 *
 * - generateOrderResponse - A function that generates a response to a customer order question.
 * - GenerateOrderResponseInput - The input type for the generateOrderResponse function.
 * - GenerateOrderResponseOutput - The return type for the generateOrderResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateOrderResponseInputSchema = z.object({
  order_id: z.string().describe('The ID of the order.'),
  customer_query: z.string().describe('The customer support query regarding the order.'),
  order_details: z.string().describe('Order details fetched from the database.'),
});
export type GenerateOrderResponseInput = z.infer<
  typeof GenerateOrderResponseInputSchema
>;

const GenerateOrderResponseOutputSchema = z.object({
  response: z.string().describe('The generated response to the customer query.'),
  prompt_tokens: z.number().optional().describe('Number of prompt tokens used.'),
  completion_tokens: z.number().optional().describe('Number of completion tokens used.'),
});
export type GenerateOrderResponseOutput = z.infer<
  typeof GenerateOrderResponseOutputSchema
>;

export async function generateOrderResponse(
  input: GenerateOrderResponseInput
): Promise<GenerateOrderResponseOutput> {
  return generateOrderResponseFlow(input);
}

const generateOrderResponsePrompt = ai.definePrompt({
  name: 'generateOrderResponsePrompt',
  input: {schema: GenerateOrderResponseInputSchema},
  output: {schema: GenerateOrderResponseOutputSchema},
  prompt: `You are a customer support agent answering questions about customer orders.
  Use the following order details to answer the customer's query.

  Order Details:
  {{order_details}}

  Customer Query:
  {{customer_query}}
  `,
});

const generateOrderResponseFlow = ai.defineFlow(
  {
    name: 'generateOrderResponseFlow',
    inputSchema: GenerateOrderResponseInputSchema,
    outputSchema: GenerateOrderResponseOutputSchema,
  },
  async input => {
    const result = await generateOrderResponsePrompt(input);
    const output = result.output!;
    return {
      response: output.response,
      prompt_tokens: result.usage?.promptTokens,
      completion_tokens: result.usage?.completionTokens,
    };
  }
);
