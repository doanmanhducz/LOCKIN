
export default function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-lockin-radial">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
