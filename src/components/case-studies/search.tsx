'use client';

import { useState, useActionState } from 'react';
import { caseStudyNlpSearch } from '@/ai/flows/case-study-nlp-search';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { CaseStudyNlpSearchOutput } from '@/ai/flows/case-study-nlp-search';

const initialState: CaseStudyNlpSearchOutput = {
  results: [],
};

export function CaseStudySearch() {
  const [query, setQuery] = useState('');
  const [state, formAction, isPending] = useActionState(caseStudyNlpSearch, initialState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formAction(formData);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
        <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              name="query"
              placeholder="NLP Search: e.g., 'atypical symptoms of heart attack in elderly males'"
              className="w-full pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
        </Button>
      </form>
      {state?.results && state.results.length > 0 && (
        <Alert>
          <AlertTitle>AI Search Results</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside space-y-2 mt-2">
              {state.results.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
