'use client';

import { useEffect, useRef, useState } from 'react';
import { ChatMessage } from '@/app/lib/types'; 


// ✅ UUID fallback if crypto.randomUUID is not supported
const generateUUID = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback UUID v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function useChatSocket() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [clientId, setClientId] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return; 

    const id = sessionStorage.getItem('clientId') || generateUUID();
    sessionStorage.setItem('clientId', id);
    setClientId(id);

    const host = process.env.NEXT_PUBLIC_SOCKET_HOST;
    const port = process.env.NEXT_PUBLIC_SOCKET_PORT;
    const key = process.env.NEXT_PUBLIC_PUSHER_KEY;

    if (!host || !port || !key) {
      console.error('❌ Missing WebSocket environment variables.');
      return;
    }

    const socketUrl = `ws://${host}:${port}/app/${key}?protocol=7&client=js&version=4.3.1`;
    const socket = new WebSocket(socketUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('🔌 WebSocket connected');
      socket.send(
        JSON.stringify({
          event: 'pusher:subscribe',
          data: { channel: 'chat-channel' },
        })
      );
    };

    socket.onmessage = (event) => {
      const parsed = JSON.parse(event.data);

      if (parsed.event === 'new-message') {
        const { senderId, message } = JSON.parse(parsed.data);

        if (senderId === id) return;

        setMessages((prev) => [...prev, { senderId, message }]);
      }
    };

    socket.onclose = () => console.log('❌ WebSocket closed');
    socket.onerror = (err) => console.error('WebSocket error:', err);

    return () => socket.close();
  }, []);

  return { messages, clientId, setMessages };
}
