export default function Home() {
  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center py-14 px-6 bg-gradient-to-b from-indigo-50 via-white to-gray-50">
      {/* Hero section */}
      <section className="flex flex-col items-center max-w-lg w-full gap-6">
        <div className="bg-indigo-100/80 dark:bg-indigo-900/30 px-6 py-2 rounded-full mb-2 flex items-center gap-2">
          <span className="text-xl font-bold text-indigo-800 dark:text-indigo-200">🛤️ SkillBridge</span>
          <span className="text-base font-medium text-indigo-600/90 dark:text-indigo-200/70">AI-Powered Learning Journey</span>
        </div>
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold text-indigo-800 dark:text-indigo-200 drop-shadow mt-2">
          Find <span className="text-indigo-600 dark:text-indigo-400">Your Path</span> to Real Growth
        </h1>
        <p className="text-center text-gray-500 dark:text-indigo-100 text-lg max-w-md">
          Personalized learning paths, inspiring project ideas, and an AI companion to advance your skills and career.
        </p>
      </section>

      {/* Call-to-actions */}
      <section className="flex flex-col sm:flex-row items-center gap-4 mt-8">
        <a
          className="px-7 py-2.5 rounded-full font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow transition-colors text-base"
          href="/onboarding"
        >
          Get Started
        </a>
        <a
          className="px-6 py-2 rounded-full font-semibold border border-indigo-200 bg-white hover:bg-indigo-50 text-indigo-700 shadow-sm transition-colors text-base"
          href="/learning-path"
        >
          Explore Paths
        </a>
        <a
          className="px-6 py-2 rounded-full font-medium border border-indigo-100 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 shadow-sm transition-colors text-base"
          href="/chat"
        >
          Try AI Chat
        </a>
      </section>

      {/* Features */}
      <section className="mt-14 w-full max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-7 flex flex-col items-center text-center">
            <span className="text-indigo-500 text-3xl mb-2">🧩</span>
            <h2 className="text-lg font-bold mb-1">Personalized Learning Paths</h2>
            <p className="text-gray-500 dark:text-indigo-100">AI-curated journeys based on your experience and goals. Achieve more, faster.</p>
          </div>
          <div className="card p-7 flex flex-col items-center text-center">
            <span className="text-amber-500 text-3xl mb-2">💼</span>
            <h2 className="text-lg font-bold mb-1">Real-world Project Ideas</h2>
            <p className="text-gray-500 dark:text-indigo-100">Get hands-on with project suggestions tailored to your interests and tech stack.</p>
          </div>
          <div className="card p-7 flex flex-col items-center text-center">
            <span className="text-emerald-500 text-3xl mb-2">🤖</span>
            <h2 className="text-lg font-bold mb-1">Interactive AI Companion</h2>
            <p className="text-gray-500 dark:text-indigo-100">Chat with SkillBridge AI for instant answers, advice, and resource guidance.</p>
          </div>
        </div>
      </section>

      {/* MVP footnote */}
      <footer className="mt-14 text-gray-400 text-xs w-full text-center">
        <span>SkillBridge &copy; {new Date().getFullYear()} &middot; Built with Next.js & FastAPI</span>
      </footer>
    </div>
  );
}
