import BlogSection from '../components/BlogSection';
import MealGymSection from '../components/MealGymSection';
import PomodoroSection from '../components/PomodoroSection';
import PortfolioSection from '../components/PortfolioSection';
import TodoSection from '../components/TodoSection';
import { Button, Card, Pill } from '../components/Ui';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(38,38,38,0.95),rgba(19,19,19,0.96))] p-6 shadow-glow sm:p-8 lg:p-10">
        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Pill tone="accent">LOCKIN MVP</Pill>
              <Pill tone="neutral">React + Node + SQLite</Pill>
              <Pill tone="success">Dark mode optimized</Pill>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.45em] text-lockin-accent">Personal growth operating system</p>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">A focused dashboard for writing, planning, tracking, and executing every day.</h1>
              <p className="max-w-2xl text-sm leading-7 text-lockin-muted sm:text-base">
                LOCKIN combines portfolio, blog, task planning, nutrition, training, and Pomodoro focus blocks into one seamless workspace.
                It is built to be fast, calm, and practical for daily use.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => document.getElementById('portfolio-section')?.scrollIntoView({ behavior: 'smooth' })}>Explore dashboard</Button>
              <Button variant="secondary" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>Jump to Pomodoro</Button>
            </div>
          </div>

          <Card className="space-y-4 bg-black/20">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-lockin-muted">MVP priorities</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">The first release is already usable</h2>
            </div>
            <div className="space-y-3 text-sm text-lockin-muted">
              <p>• REST APIs for todos, blogs, meals, gym, pomodoro, and portfolio.</p>
              <p>• Dark interface with reusable cards, inputs, pills, and charts.</p>
              <p>• Seeded demo data so the workspace feels alive immediately.</p>
              <p>• CRUD workflows for the core modules, with validation and error handling.</p>
            </div>
          </Card>
        </div>
      </header>

      <section id="portfolio-section">
        <PortfolioSection />
      </section>

      <BlogSection />
      <TodoSection />
      <MealGymSection />
      <PomodoroSection />
    </div>
  );
}
