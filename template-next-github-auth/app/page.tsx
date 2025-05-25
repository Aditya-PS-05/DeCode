
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const featureList = [
  {
    title: "Curated Problems",
    desc: "Large library of coding problems with detailed solutions, images, and tags.",
  },
  {
    title: "Interactive CMS",
    desc: "Upload and manage your own problems, answers, and illustrations in seconds.",
  },
  {
    title: "Track Progress",
    desc: "Solve, track, and review submissions to improve your skills efficiently.",
  },
];

const Home = async () => {
  const session : CustomSession | null = await getServerSession(authOptions);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header/Nav */}
      <Navbar user={session?.user} />

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 mt-8 md:mt-20 gap-8">
        {/* Text */}
        <div className="flex-1 flex flex-col items-start max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white leading-tight">
            A New Way to Learn Coding <br className="hidden md:block" />
            <span className="text-green-400">with CodeSolve</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            CodeSolve is the fastest way to practice coding, master algorithms,
            and ace interviews. Upload, solve, and review problems all in one place.
          </p>
          <Link href="/auth">
            <Button className="px-6 py-3 rounded-full text-lg shadow-md bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition-all text-white">
              Create Free Account
            </Button>
          </Link>
        </div>
        {/* Illustration */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="relative max-w-md w-full">
            {/* Simple dashboard-style card illustration */}
            <div className="rounded-3xl shadow-lg border border-gray-700 bg-gray-800 p-6 w-full">
              <div className="flex gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 border border-green-500/30" />
                <div className="w-10 h-10 rounded-lg bg-gray-600/50 border border-gray-500/30" />
                <div className="w-10 h-10 rounded-lg bg-gray-600/50 border border-gray-500/30" />
                <div className="w-10 h-10 rounded-lg bg-gray-600/50 border border-gray-500/30" />
              </div>
              <div className="w-32 h-5 rounded bg-green-500/20 mb-2" />
              <div className="w-full h-3 rounded bg-gray-700 mb-2" />
              <div className="w-2/3 h-3 rounded bg-gray-600 mb-2" />
              <div className="w-full h-3 rounded bg-gray-700 mb-2" />
              <div className="w-40 h-3 rounded bg-gray-600 mb-2" />
              <div className="h-32 mt-4 rounded-lg bg-gradient-to-tr from-green-600 via-green-500 to-green-400 flex items-center justify-center">
                <svg width="64" height="64" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                  <line x1="12" y1="2" x2="12" y2="22" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="mt-16 px-6 md:px-16 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Why CodeSolve?</h2>
        <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
          {featureList.map((feat) => (
            <div key={feat.title} className="bg-gray-800 rounded-xl shadow p-6 flex flex-col items-start border border-gray-700 hover:shadow-lg hover:border-green-500/30 transition">
              <div className="mb-4 flex-shrink-0 w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-400">{feat.title.charAt(0)}</span>
              </div>
              <h3 className="font-semibold text-lg text-white mb-1">{feat.title}</h3>
              <p className="text-gray-300 text-sm">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Explore section */}
      <section className="mt-20 mb-12 px-6 md:px-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 flex items-center justify-center gap-2">
            <span className="inline-block bg-green-500/20 border border-green-500/30 rounded-full p-2">
              <svg width="28" height="28" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="none" />
                <path d="M9.75 9.75h4.5v4.5h-4.5z" stroke="#22c55e" strokeWidth="2" />
              </svg>
            </span>
            Start Exploring
          </h3>
          <p className="text-gray-300 mb-6">
            Begin your journey with structured problem solving and skill tracking. Upload new challenges, add answers, and improve every day.
          </p>
          <Link href="/dashboard">
            <Button variant="secondary" className="px-5 rounded-full bg-gray-700 hover:bg-gray-600 text-white border-gray-600">Go to Dashboard</Button>
          </Link>
        </div>
      </section>

      <footer className="text-gray-500 py-6 text-center text-xs bg-transparent">
        &copy; {new Date().getFullYear()} CodeSolve. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
