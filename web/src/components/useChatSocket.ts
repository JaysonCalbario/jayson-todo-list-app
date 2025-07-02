'use client';

import { useEffect, useRef, useState } from 'react';

export interface ChatMessage {
  senderId: string;
  message: string;
}

export function useChatSocket() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [clientId, setClientId] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const id = sessionStorage.getItem('clientId') || crypto.randomUUID();
    sessionStorage.setItem('clientId', id);
    setClientId(id);

    const socket = new WebSocket(
      'ws://192.168.68.130:6001/app/app-key?protocol=7&client=js&version=4.3.1'
    );
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
