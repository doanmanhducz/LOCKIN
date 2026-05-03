import { useEffect, useMemo, useState } from 'react';
import { api } from '../utils/api';
import { formatDateTime } from '../utils/format';
import { Button, Card, EmptyState, Input, Pill, SectionTitle, TextArea } from './Ui';

const initialForm = {
  title: '',
  content: '',
  tags: '',
};

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadBlogs(nextSearch = search, nextTag = tag) {
    setLoading(true);
    setError('');
    try {
      const query = new URLSearchParams();
      if (nextSearch) query.set('search', nextSearch);
      if (nextTag) query.set('tag', nextTag);
      const response = await api.get(`/blogs?${query.toString()}`);
      setBlogs(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBlogs();
  }, []);

  const availableTags = useMemo(() => {
    const tags = new Set();
    blogs.forEach((blog) => blog.tags.forEach((item) => tags.add(item)));
    return Array.from(tags);
  }, [blogs]);

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
  }

  function handleEdit(blog) {
    setEditingId(blog.id);
    setForm({
      title: blog.title,
      content: blog.content,
      tags: blog.tags.join(', '),
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      title: form.title.trim(),
      content: form.content.trim(),
      tags: form.tags.split(',').map((item) => item.trim()).filter(Boolean),
    };

    try {
      if (editingId) {
        await api.put(`/blogs/${editingId}`, payload);
      } else {
        await api.post('/blogs', payload);
      }
      resetForm();
      await loadBlogs();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      await api.del(`/blogs/${id}`);
      await loadBlogs();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Card className="space-y-6">
      <SectionTitle
        eyebrow="Blog"
        title="Thoughts, notes, and progress logs"
        description="Search, filter, create, edit, and remove posts from the same dark workspace."
      />

      <div className="grid gap-3 md:grid-cols-3">
        <Input placeholder="Search title or content" value={search} onChange={(event) => setSearch(event.target.value)} />
        <Input placeholder="Filter by tag" value={tag} onChange={(event) => setTag(event.target.value)} />
        <Button variant="secondary" onClick={() => loadBlogs(search, tag)}>Apply filters</Button>
      </div>

      {error ? <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          {loading ? <p className="text-sm text-lockin-muted">Loading blog entries...</p> : null}
          {!loading && blogs.length === 0 ? <EmptyState title="No blog posts yet" description="Create the first post and turn it into a habit log." /> : null}
          {blogs.map((blog) => (
            <article key={blog.id} className="rounded-2xl border border-white/10 bg-black/15 p-5 transition hover:border-lockin-accent/30">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{blog.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.28em] text-lockin-muted">{formatDateTime(blog.createdAt)}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => handleEdit(blog)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(blog.id)}>Delete</Button>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-lockin-muted">{blog.content}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {blog.tags.map((item) => <Pill key={item}>{item}</Pill>)}
              </div>
            </article>
          ))}
          {availableTags.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-2">
              {availableTags.map((item) => <Pill key={item} tone="accent">{item}</Pill>)}
            </div>
          ) : null}
        </div>

        <form className="space-y-4 rounded-2xl border border-white/10 bg-black/20 p-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-white">{editingId ? 'Edit blog post' : 'Create blog post'}</p>
            <p className="text-sm text-lockin-muted">Use the form to update your build-in-public notes or personal reflections.</p>
          </div>
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
          />
          <TextArea
            rows={8}
            placeholder="Content"
            value={form.content}
            onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
          />
          <Input
            placeholder="Tags separated by commas"
            value={form.tags}
            onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))}
          />
          <div className="flex gap-3">
            <Button type="submit">{editingId ? 'Update Post' : 'Publish Post'}</Button>
            <Button type="button" variant="ghost" onClick={resetForm}>Reset</Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
