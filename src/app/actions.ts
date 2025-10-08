"use server";

import { generateOrderResponse, type GenerateOrderResponseOutput } from '@/ai/flows/generate-order-response';
import { compareLlmPerformance, type LlmPerformanceReport } from '@/ai/flows/compare-llm-performance';
import { getOrderDetails } from '@/lib/orders';

// Define the type for the comparison result as it's not fully exported from the flow
export type PerformanceResult = {
  model: string;
  response: string;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  latency_ms: number;
};
export type ComparisonReport = PerformanceResult[];


export async function generateResponseAction(orderId: string, customerQuery: string): Promise<{ response?: GenerateOrderResponseOutput; error?: string }> {
  try {
    const orderDetails = await getOrderDetails(orderId);
    if (!orderDetails) {
      return { error: 'Order not found. Please try one of the example IDs: ORD12345, ORD67890, ORD54321' };
    }

    const orderDetailsString = JSON.stringify(orderDetails, null, 2);

    const result = await generateOrderResponse({
      order_id: orderId,
      customer_query: customerQuery,
      order_details: orderDetailsString,
    });

    return { response: result };

  } catch (error) {
    console.error(error);
    return { error: error instanceof Error ? error.message : 'An unknown error occurred while generating the response.' };
  }
}


export async function compareModelsAction(orderId: string, customerQuery: string): Promise<{ report?: ComparisonReport; error?: string }> {
  try {
    const orderDetails = await getOrderDetails(orderId);
    if (!orderDetails) {
      return { error: 'Order not found. Please try one of the example IDs: ORD12345, ORD67890, ORD54321' };
    }
    const orderDetailsString = JSON.stringify(orderDetails, null, 2);

    const report = await compareLlmPerformance({
      orderId,
      customerQuery: `${customerQuery}\n\nOrder Details:\n${orderDetailsString}`,
      models: ['gemini-1.5-flash', 'gemini-1.5-pro'],
    }) as LlmPerformanceReport;

    return { report: report as unknown as ComparisonReport };

  } catch (error) {
    console.error(error);
    return { 
      error: `An error occurred while comparing models: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}
