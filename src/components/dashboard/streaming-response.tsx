'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot } from 'lucide-react';

interface StreamingResponseProps {
  response: string | null;
  isLoading: boolean;
}

function useSimulatedStream(fullText: string | null) {
  const [streamedText, setStreamedText] = React.useState('');

  React.useEffect(() => {
    setStreamedText('');
    if (!fullText) return;

    const words = fullText.split(/(\s+)/);
    let currentText = '';
    let wordIndex = 0;

    const intervalId = setInterval(() => {
      if (wordIndex < words.length) {
        currentText += words[wordIndex];
        setStreamedText(currentText);
        wordIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 50); // Adjust speed of streaming here

    return () => clearInterval(intervalId);
  }, [fullText]);

  return streamedText;
}

export function StreamingResponse({ response, isLoading }: StreamingResponseProps) {
  const streamedResponse = useSimulatedStream(response);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="text-primary" />
            <span>AI Response</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </CardContent>
      </Card>
    );
  }

  if (!response) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="text-primary" />
          <span>AI Response</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap text-base leading-relaxed">
          {streamedResponse}
          <span className="inline-block h-5 w-1 animate-pulse bg-foreground ml-1" />
        </p>
      </CardContent>
    </Card>
  );
}
