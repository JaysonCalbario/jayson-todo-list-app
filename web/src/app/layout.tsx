'use client';

import { useState } from 'react';
import './globals.css';
import TodoList from '@/components/TodoList';
import Chat from '@/components/Chat';
import ToastProvider from '@/components/ToastProvider';

export default function RootLayout() {
  const [view, setView] = useState<'chat' | 'todo'>('chat');

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <ToastProvider>
          <main className="flex flex-col items-center justify-center p-4 space-y-6">
            <div className="w-full max-w-4xl">
              {view === 'chat' ? (
                <>
                  <Chat onSwitchView={() => setView('todo')} />
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => setView('todo')}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-medium shadow-md"
                    >
                      {/* ✅ Checklist icon for TODO LIST */}
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7M5 6h14M5 12h14M5 18h14"
                        />
                      </svg>
                      TODO LIST DEMO
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <TodoList />
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => setView('chat')}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-medium shadow-md"
                    >
                      {/* 💬 Chat bubble icon for CHAT */}
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 8h10M7 12h4m1 8a9 9 0 100-18 9 9 0 000 18z"
                        />
                      </svg>
                      LIVE CHAT DEMO
                    </button>
                  </div>
                </>
              )}
            </div>
          </main>
        </ToastProvider>
      </body>
    </html>
  );
}
