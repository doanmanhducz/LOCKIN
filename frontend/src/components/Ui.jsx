
export function Card({ className = '', children }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-lockin-panel/90 p-5 shadow-glow backdrop-blur ${className}`}>
      {children}
    </div>
  );
}

export function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="space-y-2">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.35em] text-lockin-accent">{eyebrow}</p> : null}
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        {description ? <p className="max-w-3xl text-sm leading-6 text-lockin-muted">{description}</p> : null}
      </div>
    </div>
  );
}

export function Button({ variant = 'primary', className = '', children, type = 'button', ...props }) {
  const variants = {
    primary: 'bg-lockin-accent text-white hover:bg-lockin-accentSoft',
    secondary: 'border border-white/10 bg-white/5 text-white hover:bg-white/10',
    ghost: 'text-lockin-muted hover:text-white hover:bg-white/5',
    danger: 'bg-red-500/90 text-white hover:bg-red-500',
  };

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-lockin-accent/70 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-lockin-accent focus:ring-2 focus:ring-lockin-accent/20 ${className}`}
      {...props}
    />
  );
}

export function TextArea({ className = '', ...props }) {
  return (
    <textarea
      className={`w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-lockin-accent focus:ring-2 focus:ring-lockin-accent/20 ${className}`}
      {...props}
    />
  );
}

export function Select({ className = '', ...props }) {
  return (
    <select
      className={`w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-lockin-accent focus:ring-2 focus:ring-lockin-accent/20 ${className}`}
      {...props}
    />
  );
}

export function Pill({ tone = 'neutral', children }) {
  const tones = {
    neutral: 'bg-white/10 text-white',
    accent: 'bg-lockin-accent/20 text-lockin-accentSoft',
    success: 'bg-emerald-500/15 text-emerald-300',
    warning: 'bg-amber-500/15 text-amber-300',
    danger: 'bg-red-500/15 text-red-300',
  };

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${tones[tone] || tones.neutral}`}>{children}</span>;
}

export function EmptyState({ title, description }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-black/15 p-6 text-center">
      <p className="text-sm font-medium text-white">{title}</p>
      {description ? <p className="mt-2 text-sm text-lockin-muted">{description}</p> : null}
    </div>
  );
}
