
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

const Profile = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);
  const user = session?.user;

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
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">Profile</h1>
            <p className="text-gray-900">Your coding journey and achievements</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Info */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src={user?.image!} alt={user?.name!} />
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-2xl">
                  {user?.name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{user?.name}</CardTitle>
              <p className="text-gray-600">{user?.email}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Member since</span>
                  <span className="font-medium">Jan 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current streak</span>
                  <Badge variant="secondary">{stats.currentStreak} days</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Accuracy</span>
                  <span className="font-medium">{stats.submissionAccuracy}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Problem Solving Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.problemsSolved}</div>
                    <div className="text-sm text-gray-600">Solved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-400">{stats.totalProblems - stats.problemsSolved}</div>
                    <div className="text-sm text-gray-600">Remaining</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.easyProblems}</div>
                    <div className="text-sm text-gray-600">Easy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{stats.mediumProblems}</div>
                    <div className="text-sm text-gray-600">Medium</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{Math.round((stats.problemsSolved / stats.totalProblems) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full"
                      style={{ width: `${(stats.problemsSolved / stats.totalProblems) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Difficulty Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Easy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{stats.easyProblems}</span>
                      <span className="text-gray-600">/ 50</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span>Medium</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{stats.mediumProblems}</span>
                      <span className="text-gray-600">/ 75</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Hard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{stats.hardProblems}</span>
                      <span className="text-gray-600">/ 25</span>
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
