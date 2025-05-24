// Remove "use client" directive to make this a server component
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options';
import ProblemsClient from '../../components/ProblemsClient'; // Create a separate client component

export default async function ProblemsPage() {
  const session: CustomSession | null = await getServerSession(authOptions);
  
  return <ProblemsClient />;
}