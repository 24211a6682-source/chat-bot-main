'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { StarRating } from '@/components/star-rating';
import type { ComparisonReport } from '@/app/actions';
import { BrainCircuit, Clock, DollarSign, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface ComparisonReportTableProps {
  report: ComparisonReport | null;
  isLoading: boolean;
}

export function ComparisonReportTable({ report, isLoading }: ComparisonReportTableProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
             <CardTitle>Generating Comparison Report...</CardTitle>
             <CardDescription>Please wait while we gather data from multiple models.</CardDescription>
        </CardHeader>
        <CardContent>
             <div className="rounded-md border">
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[180px]">Model</TableHead>
                            <TableHead>Response</TableHead>
                            <TableHead className="w-[180px]">Accuracy</TableHead>
                            <TableHead className="text-right w-[120px]">Cost (Tokens)</TableHead>
                            <TableHead className="text-right w-[120px]">Latency</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(2)].map((_, i) => (
                            <TableRow key={i}>
                            <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                            <TableCell><div className="space-y-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-4/5" /></div></TableCell>
                            <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                            <TableCell className="text-right"><Skeleton className="h-5 w-12 ml-auto" /></TableCell>
                            <TableCell className="text-right"><Skeleton className="h-5 w-12 ml-auto" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
             </div>
        </CardContent>
      </Card>
    );
  }

  if (!report) return null;

  return (
    <Card className="w-full">
        <CardHeader>
            <CardTitle>Model Comparison Report</CardTitle>
            <CardDescription>Comparative analysis of different LLM models for the given query.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[180px]"><BrainCircuit className="inline-block mr-2 h-4 w-4"/>Model</TableHead>
                        <TableHead><MessageSquare className="inline-block mr-2 h-4 w-4"/>Response</TableHead>
                        <TableHead className="w-[180px]">Accuracy</TableHead>
                        <TableHead className="text-right w-[140px]"><DollarSign className="inline-block mr-2 h-4 w-4"/>Cost (Tokens)</TableHead>
                        <TableHead className="text-right w-[120px]"><Clock className="inline-block mr-2 h-4 w-4"/>Latency</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {report.map((result) => (
                        <TableRow key={result.model}>
                        <TableCell className="font-medium">{result.model}</TableCell>
                        <TableCell className="whitespace-pre-wrap">{result.response}</TableCell>
                        <TableCell>
                            <StarRating />
                        </TableCell>
                        <TableCell className="text-right">
                            <div>{result.total_tokens} total</div>
                            <div className="text-xs text-muted-foreground">{result.prompt_tokens}p + {result.completion_tokens}c</div>
                        </TableCell>
                        <TableCell className="text-right">{result.latency_ms}ms</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
      </CardContent>
    </Card>
  );
}
