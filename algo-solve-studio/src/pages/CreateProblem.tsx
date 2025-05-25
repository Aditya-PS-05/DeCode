
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TestCase {
  id: string;
  input: string;
  output: string;
}

const CreateProblem = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: '1', input: '', output: '' }
  ]);
  const [solutionTemplate, setSolutionTemplate] = useState(`function solution(nums) {
    // Your code here
    return [];
}`);

  const addTestCase = () => {
    const newTestCase: TestCase = {
      id: Date.now().toString(),
      input: '',
      output: ''
    };
    setTestCases([...testCases, newTestCase]);
  };

  const removeTestCase = (id: string) => {
    if (testCases.length > 1) {
      setTestCases(testCases.filter(tc => tc.id !== id));
    }
  };

  const updateTestCase = (id: string, field: 'input' | 'output', value: string) => {
    setTestCases(testCases.map(tc => 
      tc.id === id ? { ...tc, [field]: value } : tc
    ));
  };

  const handleSubmit = () => {
    if (!title || !description || !difficulty) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically save to a database
    console.log('Problem created:', {
      title,
      description,
      difficulty,
      testCases,
      solutionTemplate
    });

    toast({
      title: "Success",
      description: "Problem created successfully!",
      className: "bg-green-600 text-white border-green-500"
    });

    navigate('/dashboard');
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-green-400 bg-green-950 border-green-800';
      case 'Medium': return 'text-orange-400 bg-orange-950 border-orange-800';
      case 'Hard': return 'text-red-400 bg-red-950 border-red-800';
      default: return 'text-gray-400 bg-gray-800 border-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Problem</h1>
          <p className="text-gray-400">Design a new coding challenge for the community</p>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Problem Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter problem title..."
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty" className="text-gray-300">Difficulty *</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-green-500">
                    <SelectValue placeholder="Select difficulty level" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="Easy" className="text-white hover:bg-gray-600">Easy</SelectItem>
                    <SelectItem value="Medium" className="text-white hover:bg-gray-600">Medium</SelectItem>
                    <SelectItem value="Hard" className="text-white hover:bg-gray-600">Hard</SelectItem>
                  </SelectContent>
                </Select>
                {difficulty && (
                  <Badge className={`border ${getDifficultyColor(difficulty)} w-fit`} variant="outline">
                    {difficulty}
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the problem, requirements, and constraints..."
                  rows={6}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Test Cases */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Test Cases</CardTitle>
                <Button
                  onClick={addTestCase}
                  variant="outline"
                  size="sm"
                  className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Test Case
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {testCases.map((testCase, index) => (
                <div key={testCase.id} className="p-4 bg-gray-700 rounded-lg border border-gray-600">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-300">Test Case {index + 1}</h4>
                    {testCases.length > 1 && (
                      <Button
                        onClick={() => removeTestCase(testCase.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-950"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-400">Input</Label>
                      <Textarea
                        value={testCase.input}
                        onChange={(e) => updateTestCase(testCase.id, 'input', e.target.value)}
                        placeholder="Enter input..."
                        rows={3}
                        className="bg-gray-600 border-gray-500 text-white placeholder:text-gray-400 focus:border-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-400">Expected Output</Label>
                      <Textarea
                        value={testCase.output}
                        onChange={(e) => updateTestCase(testCase.id, 'output', e.target.value)}
                        placeholder="Enter expected output..."
                        rows={3}
                        className="bg-gray-600 border-gray-500 text-white placeholder:text-gray-400 focus:border-green-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Solution Template */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Solution Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label className="text-gray-300">Starter Code</Label>
                <Textarea
                  value={solutionTemplate}
                  onChange={(e) => setSolutionTemplate(e.target.value)}
                  placeholder="Provide starter code for users..."
                  rows={8}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-500 font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white border-0 shadow-lg"
            >
              <Save className="h-4 w-4 mr-2" />
              Create Problem
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProblem;
