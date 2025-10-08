export interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  trackingNumber?: string;
}

export const mockOrders: Order[] = [
  {
    id: 'ORD12345',
    customerName: 'Alice Johnson',
    orderDate: '2024-05-15T10:30:00Z',
    status: 'shipped',
    items: [
      {
        productId: 'PROD001',
        productName: 'The Minimalist Wallet',
        quantity: 1,
        price: 49.99,
      },
    ],
    shippingAddress: {
      street: '123 Maple St',
      city: 'Springfield',
      state: 'IL',
      zip: '62704',
      country: 'USA',
    },
    trackingNumber: '1Z999AA10123456789',
  },
  {
    id: 'ORD67890',
    customerName: 'Bob Williams',
    orderDate: '2024-05-20T14:00:00Z',
    status: 'processing',
    items: [
      {
        productId: 'PROD002',
        productName: 'Wireless Charging Pad',
        quantity: 1,
        price: 35.0,
      },
      {
        productId: 'PROD003',
        productName: 'Braided USB-C Cable',
        quantity: 2,
        price: 12.5,
      },
    ],
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Metropolis',
      state: 'NY',
      zip: '10001',
      country: 'USA',
    },
  },
  {
    id: 'ORD54321',
    customerName: 'Charlie Brown',
    orderDate: '2024-05-10T09:00:00Z',
    status: 'delivered',
    items: [
      {
        productId: 'PROD004',
        productName: 'Noise-Cancelling Headphones',
        quantity: 1,
        price: 299.99,
      },
    ],
    shippingAddress: {
      street: '789 Pine Ln',
      city: 'Gotham',
      state: 'NJ',
      zip: '07001',
      country: 'USA',
    },
    trackingNumber: '1Z999BB20298765432',
  },
];
