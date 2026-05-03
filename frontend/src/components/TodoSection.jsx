import { useEffect, useMemo, useState } from 'react';
import { api } from '../utils/api';
import { formatDate, groupByCalendarView } from '../utils/format';
import { Button, Card, EmptyState, Input, Pill, SectionTitle, Select, TextArea } from './Ui';

const initialForm = {
  title: '',
  description: '',
  dueDate: new Date().toISOString().slice(0, 16),
  status: 'todo',
  priority: 'medium',
};

const viewModes = ['daily', 'weekly', 'monthly', 'yearly'];

function toDateTimeInput(value) {
  return new Date(value).toISOString().slice(0, 16);
}

export default function TodoSection() {
  const [todos, setTodos] = useState([]);
  const [summary, setSummary] = useState({ total: 0, done: 0, pending: 0, overdue: 0 });
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [viewMode, setViewMode] = useState('monthly');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadTodos(nextSearch = search, nextStatus = statusFilter) {
    setLoading(true);
    setError('');
    try {
      const query = new URLSearchParams();
      if (nextSearch) query.set('search', nextSearch);
      if (nextStatus) query.set('status', nextStatus);
      const [todosResponse, summaryResponse] = await Promise.all([
        api.get(`/todos?${query.toString()}`),
        api.get('/todos/summary'),
      ]);
      setTodos(todosResponse.data);
      setSummary(summaryResponse.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  const groupedTodos = useMemo(() => groupByCalendarView(todos, viewMode, (item) => item.dueDate), [todos, viewMode]);

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
  }

  function handleEdit(todo) {
    setEditingId(todo.id);
    setForm({
      title: todo.title,
      description: todo.description,
      dueDate: toDateTimeInput(todo.dueDate),
      status: todo.status,
      priority: todo.priority,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      dueDate: new Date(form.dueDate).toISOString(),
    };

    try {
      if (editingId) {
        await api.put(`/todos/${editingId}`, payload);
      } else {
        await api.post('/todos', payload);
      }
      resetForm();
      await loadTodos();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this todo?')) return;
    try {
      await api.del(`/todos/${id}`);
      await loadTodos();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Card className="space-y-6">
      <SectionTitle
        eyebrow="Todos"
        title="Task system with calendar views"
        description="Track the day, week, month, or year without leaving the dashboard."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-black/20 p-4"><p className="text-xs uppercase tracking-[0.28em] text-lockin-muted">Total</p><p className="mt-2 text-2xl font-semibold text-white">{summary.total}</p></div>
        <div className="rounded-2xl bg-black/20 p-4"><p className="text-xs uppercase tracking-[0.28em] text-lockin-muted">Completed</p><p className="mt-2 text-2xl font-semibold text-emerald-300">{summary.done}</p></div>
        <div className="rounded-2xl bg-black/20 p-4"><p className="text-xs uppercase tracking-[0.28em] text-lockin-muted">Pending</p><p className="mt-2 text-2xl font-semibold text-amber-300">{summary.pending}</p></div>
        <div className="rounded-2xl bg-black/20 p-4"><p className="text-xs uppercase tracking-[0.28em] text-lockin-muted">Overdue</p><p className="mt-2 text-2xl font-semibold text-red-300">{summary.overdue}</p></div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Input placeholder="Search tasks" value={search} onChange={(event) => setSearch(event.target.value)} />
        <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="">All statuses</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </Select>
        <Button variant="secondary" onClick={() => loadTodos(search, statusFilter)}>Refresh tasks</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {viewModes.map((mode) => (
          <Button key={mode} variant={viewMode === mode ? 'primary' : 'secondary'} onClick={() => setViewMode(mode)}>
            {mode}
          </Button>
        ))}
      </div>

      {error ? <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {loading ? <p className="text-sm text-lockin-muted">Loading todos...</p> : null}
          {!loading && groupedTodos.length === 0 ? <EmptyState title="No tasks found" description="Create a task to begin tracking progress." /> : null}
          {groupedTodos.map((group) => (
            <div key={group.label} className="rounded-2xl border border-white/10 bg-black/15 p-4">
              <p className="text-sm font-semibold text-white">{group.label}</p>
              <div className="mt-4 space-y-3">
                {group.entries.map((todo) => (
                  <div key={todo.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h4 className="font-semibold text-white">{todo.title}</h4>
                        <p className="mt-1 text-sm text-lockin-muted">{todo.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Pill tone={todo.status === 'done' ? 'success' : todo.status === 'in-progress' ? 'warning' : 'neutral'}>{todo.status}</Pill>
                        <Pill tone="accent">{todo.priority}</Pill>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-lockin-muted">
                      <span>Due {formatDate(todo.dueDate)}</span>
                      <div className="flex gap-2">
                        <Button variant="secondary" onClick={() => handleEdit(todo)}>Edit</Button>
                        <Button variant="danger" onClick={() => handleDelete(todo.id)}>Delete</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <form className="space-y-4 rounded-2xl border border-white/10 bg-black/20 p-5" onSubmit={handleSubmit}>
          <div>
            <p className="text-sm font-semibold text-white">{editingId ? 'Edit task' : 'Create task'}</p>
            <p className="text-sm text-lockin-muted">Use this form to keep the workflow tightly synced with the backend.</p>
          </div>
          <Input placeholder="Task title" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
          <TextArea rows={5} placeholder="Description" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
          <Input type="datetime-local" value={form.dueDate} onChange={(event) => setForm((current) => ({ ...current, dueDate: event.target.value }))} />
          <div className="grid gap-3 md:grid-cols-2">
            <Select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}>
              <option value="todo">Todo</option>
              <option value="in-progress">In progress</option>
              <option value="done">Done</option>
            </Select>
            <Select value={form.priority} onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value }))}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </div>
          <div className="flex gap-3">
            <Button type="submit">{editingId ? 'Update task' : 'Create task'}</Button>
            <Button type="button" variant="ghost" onClick={resetForm}>Reset</Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
