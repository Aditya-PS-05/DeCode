import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import ProblemSolver from '@/components/ProblemPage';

const ProblemPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);

  return <ProblemSolver user={session?.user} id={params.id} />;
};

export default ProblemPage;