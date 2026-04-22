import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white border-b-4 border-orange-500 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-8">

        {/* Brand - Left */}
        <Link to="/" className="flex items-center gap-5 group flex-1">
          <div className="w-24 h-24 rounded-full border-4 border-orange-500 p-1 shadow-md group-hover:shadow-lg group-hover:border-orange-600 transition-all flex-shrink-0">
            <img src="/jntu-logo.jpeg" alt="JNTUK Logo" className="w-full h-full rounded-full object-contain" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold tracking-widest uppercase text-orange-600 mb-1">
              University College of Engineering Kakinada (Autonomous)
            </p>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 leading-tight">
              Jawaharlal Nehru Technological University Kakinada
            </h1>
            <p className="text-sm text-slate-700 font-semibold hidden sm:block mt-1">
              యూనివర్సిటీ ఇంజినీరింగ్ కళాశాల, కాకినాడ - 533003
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
