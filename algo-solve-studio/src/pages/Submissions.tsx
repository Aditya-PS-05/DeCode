
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Submission {
  id: string;
  problemTitle: string;
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error';
  language: string;
  runtime: string;
  memory: string;
  submittedAt: string;
}

const mockSubmissions: Submission[] = [
  {
    id: '1',
    problemTitle: 'Two Sum',
    status: 'Accepted',
    language: 'JavaScript',
    runtime: '68 ms',
    memory: '44.8 MB',
    submittedAt: '2 hours ago'
  },
  {
    id: '2',
    problemTitle: 'Add Two Numbers',
    status: 'Wrong Answer',
    language: 'Python',
    runtime: 'N/A',
    memory: 'N/A',
    submittedAt: '1 day ago'
  },
  {
    id: '3',
    problemTitle: 'Longest Palindromic Substring',
    status: 'Accepted',
    language: 'JavaScript',
    runtime: '124 ms',
    memory: '52.1 MB',
    submittedAt: '3 days ago'
  }
];

const Submissions = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Wrong Answer':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'Time Limit Exceeded':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Runtime Error':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Submissions</h1>
          <p className="text-gray-600">Track your progress and review your solutions</p>
        </div>

        <div className="space-y-4">
          {mockSubmissions.map((submission) => (
            <Card key={submission.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {submission.problemTitle}
                      </h3>
                      <Badge className={`border ${getStatusColor(submission.status)}`} variant="outline">
                        {submission.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span>{submission.language}</span>
                      {submission.status === 'Accepted' && (
                        <>
                          <span>Runtime: {submission.runtime}</span>
                          <span>Memory: {submission.memory}</span>
                        </>
                      )}
                      <span>{submission.submittedAt}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    View Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockSubmissions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions yet</h3>
            <p className="text-gray-600">Start solving problems to see your submissions here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Submissions;
