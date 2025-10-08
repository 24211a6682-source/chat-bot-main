import { mockOrders, type Order } from './mock-data';

// In a real application, this would fetch data from Firestore.
// For this example, we're using mock data.
export async function getOrderDetails(orderId: string): Promise<Order | null> {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));

  const order = mockOrders.find(o => o.id.toLowerCase() === orderId.toLowerCase());
  return order || null;
}
