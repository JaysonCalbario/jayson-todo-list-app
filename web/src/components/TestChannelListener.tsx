'use client';

import { useEffect } from 'react';
import '../utils/echo';

interface TestEventPayload {
  message: string;
}

export default function TestChannelListener() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Echo) {
      window.Echo.channel('test-channel')
        .listen('.test-event', (e: TestEventPayload) => {
          console.info('📡 Received from Soketi:', e.message);
          
          // Replace with toast/notification library for better UX
          alert(`📢 ${e.message}`);
        });
    }

    return () => {
      if (window.Echo) {
        window.Echo.leave('test-channel');
      }
    };
  }, []);

  return null;
}
