export function formatDateTime(value) {
  if (!value) return 'N/A';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export function formatDate(value) {
  if (!value) return 'N/A';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));
}

export function getRelativeDayLabel(value) {
  const date = new Date(value);
  const today = new Date();
  const diff = Math.floor((new Date(today.getFullYear(), today.getMonth(), today.getDate()) - new Date(date.getFullYear(), date.getMonth(), date.getDate())) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return `${diff} days ago`;
  return formatDate(value);
}

export function groupByCalendarView(items, viewMode, keySelector) {
  const groups = new Map();

  items.forEach((item) => {
    const rawDate = keySelector(item);
    const date = new Date(rawDate);
    let label;

    if (viewMode === 'daily') {
      label = formatDate(rawDate);
    } else if (viewMode === 'weekly') {
      const start = new Date(date);
      start.setDate(date.getDate() - date.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      label = `${formatDate(start)} - ${formatDate(end)}`;
    } else if (viewMode === 'monthly') {
      label = `${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`;
    } else {
      label = String(date.getFullYear());
    }

    const bucket = groups.get(label) || [];
    bucket.push(item);
    groups.set(label, bucket);
  });

  return Array.from(groups.entries()).map(([label, entries]) => ({ label, entries }));
}
