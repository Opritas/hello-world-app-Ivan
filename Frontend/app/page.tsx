'use client';

import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleClick = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/hello');

      if (!response.ok) {
        throw new Error('Failed to fetch greeting');
      }

      const data = (await response.json()) as { message?: string };
      setMessage(data.message ?? 'Hello back!');
      setError('');
    } catch (err) {
      console.error(err);
      setError('Unable to reach the backend.');
      setMessage('');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-100">
      <button
        type="button"
        onClick={handleClick}
        className="rounded-md bg-slate-900 px-6 py-3 text-lg font-medium text-white shadow-sm transition-colors hover:bg-slate-700"
      >
        Hello
      </button>

      {message && <p className="text-lg text-slate-800">{message}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </main>
  );
}
