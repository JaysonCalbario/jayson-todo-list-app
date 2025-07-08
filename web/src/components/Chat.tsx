'use client';

import React from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useChatSocket } from '../hooks/useChatSocket';
import { ChatProps } from '@/app/lib/types'; 

const Chat = ({}: ChatProps) => {
  const { messages, clientId, setMessages } = useChatSocket();

  if (!clientId) return <div className="p-4">Loading chat...</div>;

  return (
    <div className="py-8 px-4 sm:px-6">
      {/* 💬 Chat Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 mb-4">
          <div className="flex-grow border-t-2 border-gray-400 w-full sm:w-auto" />
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight px-2 sm:px-6 whitespace-nowrap">
            💬 Let’s Chat
          </h2>
          <div className="flex-grow border-t-2 border-gray-400 w-full sm:w-auto" />
        </div>
        <p className="text-center text-base sm:text-lg font-medium text-gray-600 tracking-wide leading-snug">
          Need help or want to talk it out?{' '}
          <span className="text-[#b83f45] font-semibold">We’re here for you!</span>
        </p>
      </div>

      {/* 💬 Chat Box */}
      <div className="max-w-4xl mx-auto h-[75vh] rounded-xl shadow-2xl bg-gradient-to-tr from-white via-sky-100 to-blue-50 border border-blue-100 flex flex-col">
  <div className="px-6 py-4 bg-white/50 border-b border-blue-200/60 text-center backdrop-blur">
    <h2 className="text-xl font-bold text-sky-800">🟢 Chat Window </h2>
    <div className="text-sm text-sky-600">
      Your ID: <code className="bg-sky-100 text-sky-900 px-2 py-0.5 rounded font-mono">{clientId.slice(0, 8)}</code>
    </div>
  </div>

  <div className="flex-1 overflow-y-auto p-6 bg-blue/20 backdrop-blur-md">
    <ChatMessages messages={messages} clientId={clientId} />
  </div>

  <div className="p-4 border-t border-sky-100 bg-white/50 backdrop-blur-md">
    <ChatInput clientId={clientId} onMessageSent={(msg) => setMessages((prev) => [...prev, msg])} />
  </div>
</div>

    </div>
  );
};

export default Chat;
