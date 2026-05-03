import { useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { api } from '../utils/api';
import { formatDateTime } from '../utils/format';
import { Button, Card, EmptyState, Input, Pill, SectionTitle, TextArea } from './Ui';

const mealInitial = {
  name: '',
  calories: '',
  consumedAt: new Date().toISOString().slice(0, 16),
  notes: '',
};

const gymInitial = {
  exerciseType: '',
  sets: '',
  reps: '',
  caloriesBurned: '',
  performedAt: new Date().toISOString().slice(0, 16),
  notes: '',
};

function toDateTimeInput(value) {
  return new Date(value).toISOString().slice(0, 16);
}

function buildChartData(meals, gymSessions) {
  const buckets = new Map();

  meals.forEach((meal) => {
    const key = new Date(meal.consumedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const entry = buckets.get(key) || { label: key, caloriesIn: 0, caloriesOut: 0 };
    entry.caloriesIn += Number(meal.calories);
    buckets.set(key, entry);
  });

  gymSessions.forEach((session) => {
    const key = new Date(session.performedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const entry = buckets.get(key) || { label: key, caloriesIn: 0, caloriesOut: 0 };
    entry.caloriesOut += Number(session.caloriesBurned);
    buckets.set(key, entry);
  });

  return Array.from(buckets.values()).slice(-7);
}

export default function MealGymSection() {
  const [activeTab, setActiveTab] = useState('meals');
  const [meals, setMeals] = useState([]);
  const [gymSessions, setGymSessions] = useState([]);
  const [mealSummary, setMealSummary] = useState({ totalCalories: 0, entries: 0 });
  const [gymSummary, setGymSummary] = useState({ totalCaloriesBurned: 0, entries: 0 });
  const [mealForm, setMealForm] = useState(mealInitial);
  const [gymForm, setGymForm] = useState(gymInitial);
  const [editingMealId, setEditingMealId] = useState(null);
  const [editingGymId, setEditingGymId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadData() {
    setLoading(true);
    setError('');
    try {
      const [mealsResponse, gymResponse, mealSummaryResponse, gymSummaryResponse] = await Promise.all([
        api.get('/meals'),
        api.get('/gym'),
        api.get('/meals/summary'),
        api.get('/gym/summary'),
      ]);
      setMeals(mealsResponse.data);
      setGymSessions(gymResponse.data);
      setMealSummary(mealSummaryResponse.data);
      setGymSummary(gymSummaryResponse.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const chartData = useMemo(() => buildChartData(meals, gymSessions), [meals, gymSessions]);

  function resetMealForm() {
    setMealForm(mealInitial);
    setEditingMealId(null);
  }

  function resetGymForm() {
    setGymForm(gymInitial);
    setEditingGymId(null);
  }

  function handleMealEdit(meal) {
    setEditingMealId(meal.id);
    setMealForm({
      name: meal.name,
      calories: String(meal.calories),
      consumedAt: toDateTimeInput(meal.consumedAt),
      notes: meal.notes || '',
    });
    setActiveTab('meals');
  }

  function handleGymEdit(session) {
    setEditingGymId(session.id);
    setGymForm({
      exerciseType: session.exerciseType,
      sets: String(session.sets),
      reps: String(session.reps),
      caloriesBurned: String(session.caloriesBurned),
      performedAt: toDateTimeInput(session.performedAt),
      notes: session.notes || '',
    });
    setActiveTab('gym');
  }

  async function submitMeal(event) {
    event.preventDefault();
    const payload = {
      ...mealForm,
      calories: Number(mealForm.calories),
      consumedAt: new Date(mealForm.consumedAt).toISOString(),
    };

    try {
      if (editingMealId) {
        await api.put(`/meals/${editingMealId}`, payload);
      } else {
        await api.post('/meals', payload);
      }
      resetMealForm();
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  async function submitGym(event) {
    event.preventDefault();
    const payload = {
      ...gymForm,
      sets: Number(gymForm.sets),
      reps: Number(gymForm.reps),
      caloriesBurned: Number(gymForm.caloriesBurned),
      performedAt: new Date(gymForm.performedAt).toISOString(),
    };

    try {
      if (editingGymId) {
        await api.put(`/gym/${editingGymId}`, payload);
      } else {
        await api.post('/gym', payload);
      }
      resetGymForm();
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  async function removeMeal(id) {
    if (!window.confirm('Delete this meal entry?')) return;
    try {
      await api.del(`/meals/${id}`);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  async function removeGymSession(id) {
    if (!window.confirm('Delete this gym session?')) return;
    try {
      await api.del(`/gym/${id}`);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Card className="space-y-6">
      <SectionTitle
        eyebrow="Fuel & Training"
        title="Track calories in and calories out"
        description="Meal and gym logs share the same analytic surface so your energy balance is easy to read."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-black/20 p-4"><p className="text-xs uppercase tracking-[0.28em] text-lockin-muted">Calories in</p><p className="mt-2 text-2xl font-semibold text-white">{mealSummary.totalCalories}</p></div>
        <div className="rounded-2xl bg-black/20 p-4"><p className="text-xs uppercase tracking-[0.28em] text-lockin-muted">Calories out</p><p className="mt-2 text-2xl font-semibold text-white">{gymSummary.totalCaloriesBurned}</p></div>
        <div className="rounded-2xl bg-black/20 p-4"><p className="text-xs uppercase tracking-[0.28em] text-lockin-muted">Meal entries</p><p className="mt-2 text-2xl font-semibold text-emerald-300">{mealSummary.entries}</p></div>
        <div className="rounded-2xl bg-black/20 p-4"><p className="text-xs uppercase tracking-[0.28em] text-lockin-muted">Gym entries</p><p className="mt-2 text-2xl font-semibold text-amber-300">{gymSummary.entries}</p></div>
      </div>

      <div className="h-80 rounded-2xl border border-white/10 bg-black/15 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="label" stroke="rgba(255,255,255,0.45)" />
            <YAxis stroke="rgba(255,255,255,0.45)" />
            <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} />
            <Bar dataKey="caloriesIn" fill="#1ABC9C" radius={[8, 8, 0, 0]} />
            <Bar dataKey="caloriesOut" fill="#FBBF24" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {error ? <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}

      <div className="flex flex-wrap gap-2">
        <Button variant={activeTab === 'meals' ? 'primary' : 'secondary'} onClick={() => setActiveTab('meals')}>Meals</Button>
        <Button variant={activeTab === 'gym' ? 'primary' : 'secondary'} onClick={() => setActiveTab('gym')}>Gym</Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          {loading ? <p className="text-sm text-lockin-muted">Loading nutrition and training logs...</p> : null}
          {!loading && activeTab === 'meals' && meals.length === 0 ? <EmptyState title="No meals logged yet" description="Create the first meal record to start tracking intake." /> : null}
          {!loading && activeTab === 'gym' && gymSessions.length === 0 ? <EmptyState title="No gym sessions logged yet" description="Add your first training entry here." /> : null}

          {activeTab === 'meals'
            ? meals.map((meal) => (
              <div key={meal.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-white">{meal.name}</h4>
                    <p className="mt-1 text-sm text-lockin-muted">{meal.notes || 'No notes yet'}</p>
                  </div>
                  <Pill tone="accent">{meal.calories} kcal</Pill>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-lockin-muted">
                  <span>{formatDateTime(meal.consumedAt)}</span>
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => handleMealEdit(meal)}>Edit</Button>
                    <Button variant="danger" onClick={() => removeMeal(meal.id)}>Delete</Button>
                  </div>
                </div>
              </div>
            ))
            : gymSessions.map((session) => (
              <div key={session.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-white">{session.exerciseType}</h4>
                    <p className="mt-1 text-sm text-lockin-muted">{session.sets} sets × {session.reps} reps</p>
                  </div>
                  <Pill tone="warning">{session.caloriesBurned} kcal burned</Pill>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-lockin-muted">
                  <span>{formatDateTime(session.performedAt)}</span>
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => handleGymEdit(session)}>Edit</Button>
                    <Button variant="danger" onClick={() => removeGymSession(session.id)}>Delete</Button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="space-y-5">
          {activeTab === 'meals' ? (
            <form className="space-y-4 rounded-2xl border border-white/10 bg-black/20 p-5" onSubmit={submitMeal}>
              <div>
                <p className="text-sm font-semibold text-white">{editingMealId ? 'Edit meal' : 'Log meal'}</p>
                <p className="text-sm text-lockin-muted">Capture the fuel side of the equation with quick logging.</p>
              </div>
              <Input placeholder="Meal name" value={mealForm.name} onChange={(event) => setMealForm((current) => ({ ...current, name: event.target.value }))} />
              <Input type="number" placeholder="Calories" value={mealForm.calories} onChange={(event) => setMealForm((current) => ({ ...current, calories: event.target.value }))} />
              <Input type="datetime-local" value={mealForm.consumedAt} onChange={(event) => setMealForm((current) => ({ ...current, consumedAt: event.target.value }))} />
              <TextArea rows={4} placeholder="Notes" value={mealForm.notes} onChange={(event) => setMealForm((current) => ({ ...current, notes: event.target.value }))} />
              <div className="flex gap-3">
                <Button type="submit">{editingMealId ? 'Update meal' : 'Save meal'}</Button>
                <Button type="button" variant="ghost" onClick={resetMealForm}>Reset</Button>
              </div>
            </form>
          ) : (
            <form className="space-y-4 rounded-2xl border border-white/10 bg-black/20 p-5" onSubmit={submitGym}>
              <div>
                <p className="text-sm font-semibold text-white">{editingGymId ? 'Edit gym session' : 'Log gym session'}</p>
                <p className="text-sm text-lockin-muted">Track training volume and calories burned in the same place.</p>
              </div>
              <Input placeholder="Exercise type" value={gymForm.exerciseType} onChange={(event) => setGymForm((current) => ({ ...current, exerciseType: event.target.value }))} />
              <div className="grid gap-3 md:grid-cols-2">
                <Input type="number" placeholder="Sets" value={gymForm.sets} onChange={(event) => setGymForm((current) => ({ ...current, sets: event.target.value }))} />
                <Input type="number" placeholder="Reps" value={gymForm.reps} onChange={(event) => setGymForm((current) => ({ ...current, reps: event.target.value }))} />
              </div>
              <Input type="number" placeholder="Calories burned" value={gymForm.caloriesBurned} onChange={(event) => setGymForm((current) => ({ ...current, caloriesBurned: event.target.value }))} />
              <Input type="datetime-local" value={gymForm.performedAt} onChange={(event) => setGymForm((current) => ({ ...current, performedAt: event.target.value }))} />
              <TextArea rows={4} placeholder="Notes" value={gymForm.notes} onChange={(event) => setGymForm((current) => ({ ...current, notes: event.target.value }))} />
              <div className="flex gap-3">
                <Button type="submit">{editingGymId ? 'Update session' : 'Save session'}</Button>
                <Button type="button" variant="ghost" onClick={resetGymForm}>Reset</Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Card>
  );
}
