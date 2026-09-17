'use client';
import { useEffect, useState } from 'react';

const CLIENT_TIMEOUT_MS = 8000;
const DEFAULT_DEBOUNCE_MS = 800;

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return String(h);
}

export function useAiText(endpoint, payload, fallback, pick, { debounceMs = DEFAULT_DEBOUNCE_MS } = {}) {
  const key = payload ? `ai:${endpoint}:${hash(JSON.stringify(payload))}` : null;
  const [state, setState] = useState({ data: fallback, source: 'template', loading: !!payload });

  useEffect(() => {
    if (!key) { setState({ data: fallback, source: 'template', loading: false }); return; }

    try {
      const cached = sessionStorage.getItem(key);
      if (cached) { setState({ data: JSON.parse(cached), source: 'ai', loading: false }); return; }
    } catch {}

    let cancelled = false;
    let timer = null;
    const ctrl = new AbortController();
    setState({ data: fallback, source: 'template', loading: true });

    const debounceTimer = setTimeout(() => {
      timer = setTimeout(() => ctrl.abort(), CLIENT_TIMEOUT_MS);

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      })
        .then(r => r.json())
        .then(json => {
          const value = json?.ok ? pick(json) : null;
          const empty = !value || (typeof value === 'object' && !Object.keys(value).length);
          if (empty) throw new Error('fallback');
          try { sessionStorage.setItem(key, JSON.stringify(value)); } catch {}
          if (!cancelled) setState({ data: value, source: 'ai', loading: false });
        })
        .catch(() => {
          if (!cancelled) setState({ data: fallback, source: 'template', loading: false });
        })
        .finally(() => clearTimeout(timer));
    }, debounceMs);

    return () => {
      cancelled = true;
      clearTimeout(debounceTimer);
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [key]);

  return state;
}
