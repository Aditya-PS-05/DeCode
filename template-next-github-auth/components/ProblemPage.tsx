
"use client";
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CustomSession } from '@/app/api/auth/[...nextauth]/options';

const ProblemSolver = ({user, id}: {user: CustomSession['user'] | null; id: string}) => {
//   const { id } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your solution here\nfunction twoSum(nums, target) {\n    \n}');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  // Mock problem data
  const problem = {
    id: id,
    title: 'Two Sum',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      }
    ],
    constraints: [
      '2 ≤ nums.length ≤ 10⁴',
      '-10⁹ ≤ nums[i] ≤ 10⁹',
      '-10⁹ ≤ target ≤ 10⁹',
      'Only one valid answer exists.'
    ]
  };

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' }
  ];

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

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running...');
    
    // Simulate code execution
    setTimeout(() => {
      setOutput(`Test case 1: PASSED
Input: nums = [2,7,11,15], target = 9
Expected: [0,1]
Output: [0,1]

Test case 2: PASSED
Input: nums = [3,2,4], target = 6
Expected: [1,2]
Output: [1,2]

All test cases passed! ✅`);
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = async () => {
    setIsRunning(true);
    
    // Simulate submission
    setTimeout(() => {
      toast({
        title: "Solution Submitted!",
        description: "Your solution passed all test cases. Well done!",
      });
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user!}/>
      
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Problem Description Panel */}
        <div className="w-1/2 border-r bg-white overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{problem.title}</h1>
              <Badge className={`border ${getDifficultyColor(problem.difficulty)}`} variant="outline">
                {problem.difficulty}
              </Badge>
            </div>

            <div className="flex gap-2 mb-6">
              {problem.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="prose max-w-none">
              <div className="whitespace-pre-line text-gray-700 mb-6 leading-relaxed">
                {problem.description}
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Examples</h3>
                {problem.examples.map((example, index) => (
                  <Card key={index} className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="font-medium text-gray-900 mb-2">Example {index + 1}:</div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Input:</span> <code className="bg-gray-200 px-1 rounded">{example.input}</code>
                        </div>
                        <div>
                          <span className="font-medium">Output:</span> <code className="bg-gray-200 px-1 rounded">{example.output}</code>
                        </div>
                        <div>
                          <span className="font-medium">Explanation:</span> {example.explanation}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Constraints</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {problem.constraints.map((constraint, index) => (
                      <li key={index} className="text-sm">{constraint}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Editor Panel */}
        <div className="w-1/2 flex flex-col bg-white">
          {/* Editor Header */}
          <div className="border-b p-4 flex items-center justify-between">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleRun}
                disabled={isRunning}
              >
                {isRunning ? 'Running...' : 'Run'}
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isRunning}
                className="bg-green-600 hover:bg-green-700"
              >
                {isRunning ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-4">
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full resize-none font-mono text-sm border-0 focus:ring-0 focus:border-0"
                placeholder="Write your code here..."
              />
            </div>

            {/* Output Panel */}
            <div className="border-t">
              <Tabs defaultValue="output" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b bg-gray-50">
                  <TabsTrigger value="output" className="rounded-none">Output</TabsTrigger>
                  <TabsTrigger value="console" className="rounded-none">Console</TabsTrigger>
                </TabsList>
                <TabsContent value="output" className="p-4 h-48 overflow-y-auto">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                    {output || 'Click "Run" to see output here...'}
                  </pre>
                </TabsContent>
                <TabsContent value="console" className="p-4 h-48 overflow-y-auto">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                    Console output will appear here...
                  </pre>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolver;
