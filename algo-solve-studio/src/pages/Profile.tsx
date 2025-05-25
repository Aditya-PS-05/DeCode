
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();

  const stats = {
    problemsSolved: 12,
    totalProblems: 150,
    easyProblems: 8,
    mediumProblems: 3,
    hardProblems: 1,
    submissionAccuracy: '78%',
    currentStreak: 5
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
            <p className="text-gray-400">Your coding journey and achievements</p>
          </div>
          <Link to="/createproblem">
            <Button className="bg-green-600 hover:bg-green-700 text-white border-0 shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Create Problem
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Info */}
          <Card className="lg:col-span-1 bg-gray-800 border-gray-700">
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-gradient-to-r from-green-600 to-green-500 text-white text-2xl">
                  {user?.name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl text-white">{user?.name}</CardTitle>
              <p className="text-gray-400">{user?.email}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Member since</span>
                  <span className="font-medium text-white">Jan 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Current streak</span>
                  <Badge variant="secondary" className="bg-gray-700 text-gray-300 border-gray-600">{stats.currentStreak} days</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Accuracy</span>
                  <span className="font-medium text-white">{stats.submissionAccuracy}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Problem Solving Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{stats.problemsSolved}</div>
                    <div className="text-sm text-gray-400">Solved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-400">{stats.totalProblems - stats.problemsSolved}</div>
                    <div className="text-sm text-gray-400">Remaining</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{stats.easyProblems}</div>
                    <div className="text-sm text-gray-400">Easy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">{stats.mediumProblems}</div>
                    <div className="text-sm text-gray-400">Medium</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">{Math.round((stats.problemsSolved / stats.totalProblems) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-600 to-green-500 h-2 rounded-full"
                      style={{ width: `${(stats.problemsSolved / stats.totalProblems) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Difficulty Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300">Easy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{stats.easyProblems}</span>
                      <span className="text-gray-400">/ 50</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-300">Medium</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{stats.mediumProblems}</span>
                      <span className="text-gray-400">/ 75</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300">Hard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{stats.hardProblems}</span>
                      <span className="text-gray-400">/ 25</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
