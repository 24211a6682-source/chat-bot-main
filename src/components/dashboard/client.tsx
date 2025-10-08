'use client';

import * as React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PanelLeft, Bot, Sparkles, BrainCircuit } from 'lucide-react';

import { generateResponseAction, compareModelsAction, type ComparisonReport } from '@/app/actions';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/logo';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  useSidebar,
  SidebarTrigger,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { StreamingResponse } from './streaming-response';
import { ComparisonReportTable } from './comparison-report';
import { EmptyState } from './empty-state';

const formSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required.'),
  customerQuery: z.string().min(10, 'Query must be at least 10 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export function DashboardClient() {
  const { isMobile, toggleSidebar } = useSidebar();
  const { toast } = useToast();

  const [isLoadingSingle, setIsLoadingSingle] = React.useState(false);
  const [isLoadingComparison, setIsLoadingComparison] = React.useState(false);
  const [generatedResponse, setGeneratedResponse] = React.useState<string | null>(null);
  const [comparisonReport, setComparisonReport] = React.useState<ComparisonReport | null>(null);
  const [activeView, setActiveView] = React.useState<'single' | 'comparison' | 'none'>('none');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderId: '',
      customerQuery: '',
    },
  });

  const handleGenerateResponse = async (values: FormValues) => {
    setIsLoadingSingle(true);
    setGeneratedResponse(null);
    setComparisonReport(null);
    setActiveView('single');
    
    const result = await generateResponseAction(values.orderId, values.customerQuery);

    if (result.error) {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
      setIsLoadingSingle(false);
      setActiveView('none');
      return;
    }

    setGeneratedResponse(result.response?.response ?? '');
    setIsLoadingSingle(false);
  };

  const handleCompareModels = async (values: FormValues) => {
    setIsLoadingComparison(true);
    setGeneratedResponse(null);
    setComparisonReport(null);
    setActiveView('comparison');

    const { report, error } = await compareModelsAction(values.orderId, values.customerQuery);
    
    if (error) {
      toast({ variant: 'default', title: 'Note', description: error });
    }

    if (report) {
      setComparisonReport(report);
    } else {
       setActiveView('none');
    }

    setIsLoadingComparison(false);
  };
  
  const hasContent = activeView !== 'none';

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <Logo className="h-6 w-auto" />
            <SidebarTrigger className="md:hidden" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <FormProvider {...form}>
            <form className="flex h-full flex-col">
              <SidebarGroup className="flex-1">
                <SidebarGroupLabel className="flex items-center gap-2">
                  <Bot className="text-primary"/>
                  <span>Query Details</span>
                </SidebarGroupLabel>
                <div className="space-y-4 p-2">
                  <FormField
                    control={form.control}
                    name="orderId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order ID</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., ORD12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customerQuery"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Query</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., Where is my order?" {...field} rows={5} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </SidebarGroup>
              <SidebarFooter>
                <div className="flex flex-col gap-2">
                   <Button
                    type="button"
                    onClick={form.handleSubmit(handleGenerateResponse)}
                    disabled={isLoadingSingle || isLoadingComparison}
                  >
                    <Sparkles />
                    {isLoadingSingle ? 'Generating...' : 'Generate Response'}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={form.handleSubmit(handleCompareModels)}
                    disabled={isLoadingSingle || isLoadingComparison}
                  >
                    <BrainCircuit />
                    {isLoadingComparison ? 'Comparing...' : 'Compare Models'}
                  </Button>
                </div>
              </SidebarFooter>
            </form>
          </FormProvider>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="max-w-full">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="shrink-0 md:hidden">
            <PanelLeft />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <h1 className="text-lg font-semibold sm:text-xl">
            {activeView === 'single' && 'Generated Response'}
            {activeView === 'comparison' && 'Model Comparison Report'}
            {activeView === 'none' && 'Welcome'}
          </h1>
          <div className="w-10"></div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          {!hasContent && <EmptyState onExampleClick={(id, query) => {
            form.setValue('orderId', id);
            form.setValue('customerQuery', query);
          }} />}

          {activeView === 'single' && (
            <StreamingResponse response={generatedResponse} isLoading={isLoadingSingle} />
          )}

          {activeView === 'comparison' && (
            <ComparisonReportTable report={comparisonReport} isLoading={isLoadingComparison} />
          )}
        </main>
      </SidebarInset>
    </>
  );
}
