const KEY = 'atc_offline_queue_v1';

export function saveOffline(entry) {
  const q = listOffline();
  q.push({ id: crypto.randomUUID(), createdAt: Date.now(), ...entry });
  localStorage.setItem(KEY, JSON.stringify(q));
}

export function listOffline() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearOffline() {
  localStorage.removeItem(KEY);
}

export async function syncAll({ sender }) {
  const q = listOffline();
  const results = [];
  for (const item of q) {
    // Attempt to send using provided sender(payload) -> { ok }
    const out = await sender(item.payload);
    results.push({ id: item.id, ok: !!out?.ok });
  }
  if (results.every((r) => r.ok)) {
    clearOffline();
  }
  return results;
}
