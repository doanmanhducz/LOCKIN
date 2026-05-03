import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { formatDateTime } from '../utils/format';
import { Card, Pill, SectionTitle } from './Ui';

export default function PortfolioSection() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadPortfolio() {
      try {
        const response = await api.get('/portfolio');
        if (active) setPortfolio(response.data);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPortfolio();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <Card><SectionTitle eyebrow="Portfolio" title="Loading profile" description="Fetching the initial LOCKIN profile snapshot." /></Card>;
  }

  if (error) {
    return <Card><SectionTitle eyebrow="Portfolio" title="Profile unavailable" description={error} /></Card>;
  }

  if (!portfolio) return null;

  return (
    <Card className="space-y-6">
      <SectionTitle
        eyebrow="Portfolio"
        title={portfolio.name}
        description={portfolio.objective}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-lockin-muted">Bio</p>
          <p className="mt-2 text-sm leading-6 text-white">{portfolio.bio}</p>
        </div>
        <div className="rounded-2xl bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-lockin-muted">Education</p>
          <p className="mt-2 text-sm leading-6 text-white">{portfolio.education}</p>
        </div>
        <div className="rounded-2xl bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-lockin-muted">Links</p>
          <div className="mt-3 space-y-2 text-sm">
            <a className="block text-lockin-accentSoft hover:underline" href={portfolio.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="block text-lockin-accentSoft hover:underline" href={portfolio.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="block text-lockin-accentSoft hover:underline" href={`mailto:${portfolio.email}`}>Email</a>
          </div>
        </div>
        <div className="rounded-2xl bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-lockin-muted">Updated</p>
          <p className="mt-2 text-sm text-white">{formatDateTime(portfolio.updatedAt)}</p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        <div>
          <p className="mb-3 text-sm font-semibold text-white">Skills</p>
          <div className="flex flex-wrap gap-2">
            {portfolio.skills.map((skill) => <Pill key={skill} tone="accent">{skill}</Pill>)}
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-white">Experience</p>
          <ul className="space-y-2 text-sm text-lockin-muted">
            {portfolio.experience.map((item) => <li key={item}>• {item}</li>)}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-white">Projects & Publications</p>
          <div className="space-y-2 text-sm text-lockin-muted">
            {portfolio.projects.map((item) => <p key={item}>• {item}</p>)}
            {portfolio.publications.map((item) => <p key={item}>• {item}</p>)}
          </div>
        </div>
      </div>
    </Card>
  );
}
