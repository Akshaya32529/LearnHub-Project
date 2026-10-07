import { Link } from 'react-router-dom';
import { FiCheckCircle, FiCompass } from 'react-icons/fi';

export default function InstructorVerification() {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
        <FiCheckCircle className="text-lg" />
        Instructor access enabled
      </div>

      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome to LearnHub</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Your instructor account is ready. Start creating courses, adding lessons, and building learning materials right away.
      </p>

      <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/70">
        <div className="flex items-start gap-3">
          <FiCompass className="mt-1 text-indigo-500" />
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">Create your first course</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">Use the course builder to add course details, modules, and lessons in one place.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/instructor/dashboard"
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-500"
        >
          Go to dashboard
        </Link>
        <Link
          to="/instructor/courses/new"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Create course
        </Link>
      </div>
    </div>
  );
}
