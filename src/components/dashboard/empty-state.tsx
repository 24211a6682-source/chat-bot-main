'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface EmptyStateProps {
    onExampleClick: (orderId: string, query: string) => void;
}

export function EmptyState({ onExampleClick }: EmptyStateProps) {
  const image = PlaceHolderImages.find(img => img.id === 'empty-state-illustration');

  const examples = [
    { orderId: 'ORD12345', query: 'Where is my order?' },
    { orderId: 'ORD67890', query: 'Can I get an update on my order status?' },
    { orderId: 'ORD54321', query: 'My order says delivered but I have not received it.' },
  ];

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center h-full">
      {image && (
          <Image
            src={image.imageUrl}
            alt={image.description}
            width={300}
            height={200}
            className="mb-6 rounded-lg object-cover"
            data-ai-hint={image.imageHint}
          />
      )}
      <h2 className="text-2xl font-bold tracking-tight">Welcome to Order Responder</h2>
      <p className="mt-2 text-muted-foreground">
        Enter an order ID and a customer query in the sidebar to get started.
      </p>

      <Card className="mt-8 w-full max-w-md text-left">
        <CardHeader>
          <CardTitle>Try an Example</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {examples.map((ex, i) => (
            <Button 
                key={i} 
                variant="ghost" 
                className="w-full justify-start text-left h-auto"
                onClick={() => onExampleClick(ex.orderId, ex.query)}
            >
                <div>
                    <p className="font-semibold text-primary">{ex.orderId}</p>
                    <p className="text-sm text-muted-foreground font-normal whitespace-normal">{ex.query}</p>
                </div>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
