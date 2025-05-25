// components/ProblemsClient.tsx
"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { CustomSession } from '@/app/api/auth/[...nextauth]/options';

interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  description: string;
  acceptance?: string;
  solved?: boolean;
}

const ProblemsClient = () => {
  const { data: session } = useSession() as { data: CustomSession | null };
  const [problems, setProblems] = useState<Problem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch("/api/problems");
        const data = await res.json();
        setProblems(data.problems);
        console.log("The data is: ", data);
      } catch (error) {
        console.error("Failed to fetch problems", error);
      }
    };

    fetchProblems();
  }, []);

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || problem.difficulty === difficultyFilter;
    const matchesTag = tagFilter === 'all' || problem.tags.some(tag => tag === tagFilter);
    return matchesSearch && matchesDifficulty && matchesTag;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Hard':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const allTags = Array.from(new Set(problems.flatMap(p => p.tags)));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={session?.user} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Problems</h1>
          <p className="text-gray-600">Sharpen your coding skills with our curated collection of problems</p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10"
          />
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
          <Select value={tagFilter} onValueChange={setTagFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Topics</SelectItem>
              {allTags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {filteredProblems.map((problem) => (
            <Card key={problem.id} className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{problem.title}</h3>
                      {problem.solved && (
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{problem.description}</p>
                    <div className="flex items-center gap-4">
                      <Badge className={`border ${getDifficultyColor(problem.difficulty)}`} variant="outline">
                        {problem.difficulty}
                      </Badge>
                      <div className="flex gap-1 flex-wrap">
                        {problem.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {problem.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{problem.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 ml-auto hidden sm:block">
                        {problem.acceptance ?? 'N/A'} accepted
                      </div>
                    </div>
                  </div>
                  <div className="ml-6 flex-shrink-0">
                    <Button asChild>
                      <Link href={`/problems/${problem.id}`}>
                        {problem.solved ? 'Review' : 'Solve'}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.058 0-3.9.78-5.291 2.062M6.343 6.343A8 8 0 1017.657 17.657 8 8 0 006.343 6.343z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No problems found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemsClient;
