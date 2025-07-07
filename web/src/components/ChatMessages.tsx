'use client';

import { useEffect, useRef } from 'react';
import { ChatMessagesProps } from '@/app/lib/types';
import MessageItem from './MessageItem';


const ChatMessages = ({ messages, clientId }: ChatMessagesProps) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="w-full h-full overflow-y-auto p-4 space-y-4 bg-white/60 backdrop-blur-md rounded border border-blue-100/40">
      {messages.map((msg, idx) => (
        <MessageItem key={idx} msg={msg} clientId={clientId} index={idx} />
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default ChatMessages;
