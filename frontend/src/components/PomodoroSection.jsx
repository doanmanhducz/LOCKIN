import { useEffect, useMemo, useRef, useState } from 'react';
import { api } from '../utils/api';
import { formatDateTime } from '../utils/format';
import { Button, Card, EmptyState, Input, Pill, SectionTitle } from './Ui';

const modeLabels = {
  focus: 'Focus',
  'short-break': 'Short break',
  'long-break': 'Long break',
};

const modeDurations = {
  focus: 25 * 60,
  'short-break': 5 * 60,
  'long-break': 20 * 60,
};

function formatSeconds(seconds) {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60)
    .toString()
    .padStart(2, '0');
  const remaining = (safeSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remaining}`;
}

export default function PomodoroSection() {
  const [settings, setSettings] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [summary, setSummary] = useState({ totalSessions: 0, sessionsCompleted: 0, focusMinutes: 0, settings: null });
  const [mode, setMode] = useState('focus');
  const [secondsLeft, setSecondsLeft] = useState(modeDurations.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  async function loadPomodoro() {
    setLoading(true);
    setError('');
    try {
      const [settingsResponse, sessionsResponse, summaryResponse] = await Promise.all([
        api.get('/pomodoro/settings'),
        api.get('/pomodoro/sessions'),
        api.get('/pomodoro'),
      ]);
      setSettings(settingsResponse.data);
      setSessions(sessionsResponse.data);
      setSummary(summaryResponse.data);
      const baseMode = 'focus';
      setMode(baseMode);
      setSecondsLeft((settingsResponse.data?.workMinutes || 25) * 60);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPomodoro();
  }, []);

  useEffect(() => {
    if (!isRunning) return undefined;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          notifyCompletion(mode);
          logSession(mode, note || `${modeLabels[mode]} session completed`).catch(() => null);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isRunning, mode, note]);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const progress = useMemo(() => {
    const total = mode === 'focus'
      ? (settings?.workMinutes || 25) * 60
      : mode === 'short-break'
        ? (settings?.shortBreakMinutes || 5) * 60
        : (settings?.longBreakMinutes || 20) * 60;
    return Math.max(0, Math.min(100, 100 - Math.round((secondsLeft / total) * 100)));
  }, [mode, secondsLeft, settings]);

  function notifyCompletion(nextMode) {
    const message = `${modeLabels[nextMode]} session completed`;
    if (window.Notification && Notification.permission === 'granted') {
      new Notification('LOCKIN Pomodoro', { body: message });
    } else if (window.Notification && Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('LOCKIN Pomodoro', { body: message });
        }
      });
    }
  }

  async function logSession(sessionMode, sessionNote) {
    const durationMinutes = sessionMode === 'focus'
      ? settings?.workMinutes || 25
      : sessionMode === 'short-break'
        ? settings?.shortBreakMinutes || 5
        : settings?.longBreakMinutes || 20;

    await api.post('/pomodoro/sessions', {
      sessionType: sessionMode,
      durationMinutes,
      completed: true,
      startedAt: new Date(Date.now() - durationMinutes * 60 * 1000).toISOString(),
      endedAt: new Date().toISOString(),
      notes: sessionNote,
    });
    await loadPomodoro();
  }

  function handleModeChange(nextMode) {
    setMode(nextMode);
    setIsRunning(false);
    const duration = settings
      ? {
          focus: settings.workMinutes * 60,
          'short-break': settings.shortBreakMinutes * 60,
          'long-break': settings.longBreakMinutes * 60,
        }[nextMode]
      : modeDurations[nextMode];
    setSecondsLeft(duration);
  }

  function handleReset() {
    handleModeChange(mode);
    setNote('');
  }

  async function handleSubmitSettings(event) {
    event.preventDefault();
    try {
      const payload = {
        workMinutes: Number(settings.workMinutes),
        shortBreakMinutes: Number(settings.shortBreakMinutes),
        longBreakMinutes: Number(settings.longBreakMinutes),
        longBreakInterval: Number(settings.longBreakInterval),
      };
      const response = await api.put('/pomodoro/settings', payload);
      setSettings(response.data);
      handleReset();
      await loadPomodoro();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleManualSave() {
    try {
      await logSession(mode, note || `${modeLabels[mode]} session completed manually`);
      setNote('');
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this Pomodoro session?')) return;
    try {
      await api.del(`/pomodoro/sessions/${id}`);
      await loadPomodoro();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Card className="space-y-6">
      <SectionTitle
        eyebrow="Pomodoro"
        title="Stay locked in with timed focus blocks"
        description="Use the timer for work, short breaks, and longer resets without leaving the dashboard."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-black/20 p-4"><p className="text-xs uppercase tracking-[0.28em] text-lockin-muted">Total sessions</p><p className="mt-2 text-2xl font-semibold text-white">{summary.totalSessions}</p></div>
        <div className="rounded-2xl bg-black/20 p-4"><p className="text-xs uppercase tracking-[0.28em] text-lockin-muted">Completed</p><p className="mt-2 text-2xl font-semibold text-emerald-300">{summary.sessionsCompleted}</p></div>
        <div className="rounded-2xl bg-black/20 p-4"><p className="text-xs uppercase tracking-[0.28em] text-lockin-muted">Focus minutes</p><p className="mt-2 text-2xl font-semibold text-lockin-accentSoft">{summary.focusMinutes}</p></div>
        <div className="rounded-2xl bg-black/20 p-4"><p className="text-xs uppercase tracking-[0.28em] text-lockin-muted">Cycle</p><p className="mt-2 text-2xl font-semibold text-amber-300">{settings?.longBreakInterval || 4}</p></div>
      </div>

      {error ? <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4 rounded-3xl border border-white/10 bg-black/20 p-6">
          <div className="flex flex-wrap gap-2">
            {Object.keys(modeLabels).map((item) => (
              <Button key={item} variant={mode === item ? 'primary' : 'secondary'} onClick={() => handleModeChange(item)}>
                {modeLabels[item]}
              </Button>
            ))}
          </div>

          <div className="space-y-4 rounded-3xl border border-white/10 bg-black/20 p-6 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-lockin-muted">{modeLabels[mode]}</p>
            <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle,_rgba(26,188,156,0.18),_rgba(0,0,0,0.08)_70%)] text-5xl font-semibold text-white">
              {formatSeconds(secondsLeft)}
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-lockin-accent transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-sm text-lockin-muted">{progress}% complete</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button onClick={() => setIsRunning((current) => !current)}>{isRunning ? 'Pause' : 'Start'}</Button>
              <Button variant="secondary" onClick={handleReset}>Reset</Button>
            </div>
          </div>

          <Input placeholder="Session note" value={note} onChange={(event) => setNote(event.target.value)} />
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={handleManualSave}>Save session</Button>
            <Button variant="ghost" onClick={() => setNote('')}>Clear note</Button>
          </div>

          <form className="space-y-4 rounded-2xl border border-white/10 bg-black/15 p-4" onSubmit={handleSubmitSettings}>
            <div>
              <p className="text-sm font-semibold text-white">Timer settings</p>
              <p className="text-sm text-lockin-muted">Adjust the default work and break intervals.</p>
            </div>
            {settings ? (
              <div className="grid gap-3 md:grid-cols-2">
                <Input type="number" value={settings.workMinutes} onChange={(event) => setSettings((current) => ({ ...current, workMinutes: Number(event.target.value) }))} />
                <Input type="number" value={settings.shortBreakMinutes} onChange={(event) => setSettings((current) => ({ ...current, shortBreakMinutes: Number(event.target.value) }))} />
                <Input type="number" value={settings.longBreakMinutes} onChange={(event) => setSettings((current) => ({ ...current, longBreakMinutes: Number(event.target.value) }))} />
                <Input type="number" value={settings.longBreakInterval} onChange={(event) => setSettings((current) => ({ ...current, longBreakInterval: Number(event.target.value) }))} />
              </div>
            ) : null}
            <Button type="submit">Save settings</Button>
          </form>
        </div>

        <div className="space-y-4">
          {loading ? <p className="text-sm text-lockin-muted">Loading timer history...</p> : null}
          {!loading && sessions.length === 0 ? <EmptyState title="No completed sessions yet" description="Finish a timer or save a manual session to build your streak." /> : null}
          {sessions.map((session) => (
            <div key={session.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="font-semibold text-white">{modeLabels[session.sessionType] || session.sessionType}</h4>
                  <p className="mt-1 text-sm text-lockin-muted">{formatDateTime(session.startedAt)} → {formatDateTime(session.endedAt)}</p>
                </div>
                <Pill tone={session.completed ? 'success' : 'neutral'}>{session.durationMinutes} min</Pill>
              </div>
              <p className="mt-3 text-sm text-lockin-muted">{session.notes || 'No notes'}</p>
              <div className="mt-4 flex justify-end">
                <Button variant="danger" onClick={() => handleDelete(session.id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
