import type { Route } from "./+types/home";
import Navbar from '~/components/Navbar';
import { resumes } from '../../constants';
import ResumeCard from '~/components/ResumeCard';
import { usePuterStore } from '~/lib/puter';
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'ResumeSense' },
    {
      name: 'description',
      content:
        'AI-powered resume analyzer that evaluates resumes, extracts key skills, and provides personalized feedback to help candidates improve their chances of landing interviews.',
    },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate(
      '/auth?next=/'
    );
  }, [auth.isAuthenticated]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section py-16">
        <div className="page-heading">
          <h1>Optimize your resume and track applications</h1>
          <h2>
            Review your submissions and uncover insights with AI-powered
            analysis
          </h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
