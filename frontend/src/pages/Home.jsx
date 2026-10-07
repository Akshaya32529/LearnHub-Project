import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/common/Logo';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between border-b border-slate-900 px-5 py-4 sm:px-8 lg:px-12">
        <Link to="/" aria-label="LearnHub home"><Logo size="sm" /></Link>
        <nav className="flex items-center gap-3 sm:gap-6">
          <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-black">Sign in</Link>
          <Link to="/register" className="lh-primary rounded-md px-4 py-2 text-sm font-semibold">Join LearnHub</Link>
        </nav>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-16 sm:px-8">
        <section className="flex w-full max-w-4xl flex-col items-center text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-950 sm:text-7xl">LearnHub</h1>
          <p className="mt-4 text-lg text-slate-600 sm:text-xl">Learn better, one chapter at a time.</p>
          <div className="mt-3 space-y-1 text-sm leading-6 text-slate-600 sm:text-base">
            <p>Learn at your pace with clear, chapter-based lessons.</p>
            <p>Practice with notes, assignments, and quizzes.</p>
            <p>Keep your courses and progress together in one place.</p>
          </div>

          <div className="mt-10 grid w-full max-w-2xl grid-cols-1 border-y border-slate-900 sm:grid-cols-3 sm:divide-x sm:divide-slate-300">
            <div className="px-5 py-5">
              <strong className="block text-3xl font-bold text-slate-950">3</strong>
              <span className="mt-1 block text-sm text-slate-600">starter courses</span>
            </div>
            <div className="border-t border-slate-300 px-5 py-5 sm:border-t-0">
              <strong className="block text-3xl font-bold text-slate-950">27</strong>
              <span className="mt-1 block text-sm text-slate-600">chapters</span>
            </div>
            <div className="border-t border-slate-300 px-5 py-5 sm:border-t-0">
              <strong className="block text-3xl font-bold text-slate-950">3</strong>
              <span className="mt-1 block text-sm text-slate-600">resources per chapter</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/register" className="lh-primary rounded-md px-5 py-3 text-sm font-semibold">Get started</Link>
            <Link to="/login" className="lh-secondary rounded-md px-5 py-3 text-sm font-semibold">Sign in</Link>
          </div>
        </section>
      </main>
    </div>
  );
}