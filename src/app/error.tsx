"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    console.error(error);
    fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        digest: error.digest,
      }),
    })
      .then(() => setLogged(true))
      .catch((err) => console.error('Failed to log error to server', err));
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center py-10">
      <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 mx-auto">
        <AlertCircle size={40} />
      </div>
      <h2 className="text-3xl font-black text-gray-900 mb-4 font-heading">Something went wrong!</h2>
      <p className="text-gray-600 mb-4 max-w-md">
        We apologize for the inconvenience. An unexpected error has occurred while loading this page.
      </p>

      {/* Render details for direct model/user visibility */}
      <div className="w-full max-w-2xl bg-gray-50 border border-gray-200 rounded-xl p-4 text-left font-mono text-[11px] text-red-600 overflow-auto mb-8 whitespace-pre-wrap max-h-[300px]">
        <p className="font-bold mb-2 text-xs text-red-800">Error: {error.message}</p>
        <p className="leading-relaxed">{error.stack}</p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => reset()}
          className="bg-[#1a8b4c] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#15713e] transition-all shadow-lg hover:shadow-xl"
        >
          Try again
        </button>
        <Link
          href="/"
          className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
