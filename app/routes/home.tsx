import type { Route } from "./+types/home";
import Navbar from '~/components/Navbar';
import ResumeCard from '~/components/ResumeCard';
import { usePuterStore } from '~/lib/puter';
import { Link, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

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
  const { auth ,kv} = usePuterStore();
  const navigate = useNavigate();
  const [resumes,setResumes]=useState<Resume[]>([]);

  const [loadingResumes,setLoadingResumes]=useState(false);


  useEffect(() => {
    if (!auth.isAuthenticated) navigate(
      '/auth?next=/'
    );
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) =>
        JSON.parse(resume.value) as Resume
      );

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section py-16">
        <div className="page-heading">
          <h1>Optimize your resume and track applications</h1>
          {!loadingResumes && resumes?.length ===0?(
            <h2>No Resume found, Upload your first resume to get feedback</h2>
          ):(
          <h2>
            Review your submissions and uncover insights with AI-powered
            analysis
          </h2>)}
        </div>

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center ">
            <img src="/images/resume-scan-2.gif" className="w-[200px]"/>
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div>
            <Link to="/upload">Upload Resume</Link>
          </div>
        )}
      </section>
    </main>
  );
}
