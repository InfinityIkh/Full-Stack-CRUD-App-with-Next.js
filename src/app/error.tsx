"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({
  error,
  reset,
}: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="rounded-full bg-red-100 p-4 text-red-600">
        <AlertTriangle size={36} />
      </div>

      <h2 className="text-2xl font-bold">
        Something went wrong!
      </h2>

      <p className="max-w-md text-gray-500">
        An unexpected error occurred. Please try again.
      </p>

      <button
        onClick={reset}
        className="flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-white transition hover:bg-gray-800"
      >
        <RotateCcw size={18} />
        Try again
      </button>
    </div>
  )
}