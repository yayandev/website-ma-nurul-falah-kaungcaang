'use client';

import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  loadingText?: string;
}

export function SubmitButton({ 
  children, 
  className = "w-full justify-center rounded-md border border-transparent bg-emerald-600 py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors",
  loadingText = "Menyimpan..."
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${className} flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed`}
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}
