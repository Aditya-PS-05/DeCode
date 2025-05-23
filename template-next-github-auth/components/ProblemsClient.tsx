"use client";
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { CustomSession } from '@/app/api/auth/[...nextauth]/options';

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  description: string;
  acceptance: string;
  solved: boolean;
}

const mockProblems: Problem[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
    acceptance: '49.1%',
    solved: true
  },
  {
    id: '2',
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    tags: ['Linked List', 'Math'],
    description: 'You are given two non-empty linked lists representing two non-negative integers.',
    acceptance: '34.2%',
    solved: false
  },
  {
    id: '3',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    description: 'Given a string, find the length of the longest substring without repeating characters.',
    acceptance: '31.7%',
    solved: false
  },
  {
    id: '4',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
    acceptance: '33.8%',
    solved: false
  },
  {
    id: '5',
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    tags: ['String', 'Dynamic Programming'],
    description: 'Given a string s, return the longest palindromic substring in s.',
    acceptance: '30.5%',
    solved: true
  },
  {
    id: '6',
    title: 'ZigZag Conversion',
    difficulty: 'Medium',
    tags: ['String'],
    description: 'The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows.',
    acceptance: '39.8%',
    solved: false
  }
];

const ProblemsPage = () => {
  const { data: session } = useSession() as { data: CustomSession | null };
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');

  const filteredProblems = mockProblems.filter(problem => {
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

  const allTags = Array.from(new Set(mockProblems.flatMap(p => p.tags)));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={session?.user} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Problems</h1>
          <p className="text-gray-600">Sharpen your coding skills with our curated collection of problems</p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10"
            />
          </div>
          <div className="flex gap-2">
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
        </div>

        <div className="grid gap-4">
          {filteredProblems.map((problem) => (
            <Card key={problem.id} className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {problem.title}
                      </h3>
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
                        {problem.acceptance} accepted
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-6 flex-shrink-0">
                    <Button asChild>
                      <Link href={`/problems/1`}>
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

export default ProblemsPage;