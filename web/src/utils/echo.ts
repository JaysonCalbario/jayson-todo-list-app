import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import type { Broadcaster } from 'laravel-echo';

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo<keyof Broadcaster>;
  }
}

if (typeof window !== 'undefined') {
  const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
  const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;
  const wsHost = process.env.NEXT_PUBLIC_SOCKET_HOST;
  const wsPort = process.env.NEXT_PUBLIC_SOCKET_PORT;

  if (!key || !cluster || !wsHost || !wsPort) {
    console.error('❌ Missing Echo/Pusher environment variables');
  } else {
    window.Pusher = Pusher;

    window.Echo = new Echo<keyof Broadcaster>({
      broadcaster: 'pusher',
      key,
      cluster,
      wsHost,
      wsPort: Number(wsPort),
      forceTLS: false,
      disableStats: true,
      enabledTransports: ['ws'],
    });
  }
}