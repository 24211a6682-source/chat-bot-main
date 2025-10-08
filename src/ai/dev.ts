import { config } from 'dotenv';
config();

import '@/ai/flows/generate-order-response.ts';
import '@/ai/flows/analyze-order-sentiment.ts';
import '@/ai/flows/compare-llm-performance.ts';