'use client';

import { useEffect, useRef } from 'react';
import { ChatMessage } from './useChatSocket';

interface ChatMessagesProps {
  messages: ChatMessage[];
  clientId: string;
}

const ChatMessages = ({ messages, clientId }: ChatMessagesProps) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="w-full h-full overflow-y-auto p-4 space-y-4 bg-white/60 backdrop-blur-md rounded border border-blue-100/40">
      {messages.map((msg, idx) => {
        const isOwn = msg.senderId === clientId;
        const shortId = isOwn ? 'You' : msg.senderId.slice(0, 8);

        return (
          <div
            key={idx}
            className={`flex items-end ${isOwn ? 'justify-end' : 'justify-start'}`}
          >
            {/* Left Avatar */}
            {!isOwn && (
              <div className="flex-shrink-0 mr-2">
                <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold shadow">
                <svg
                className="w-8 h-8 text-blue-500 bg-blue-100 rounded-full p-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A11.954 11.954 0 0012 20c2.386 0 4.597-.703 6.46-1.903A7.978 7.978 0 0016 13H8a7.978 7.978 0 00-2.879 4.804zM12 12a5 5 0 100-10 5 5 0 000 10z" />
                </svg>
                </div>
              </div>
            )}

            {/* Message Container */}
            <div className="flex flex-col max-w-[80%]">
              {/* Sender ID */}
              <div
                className={`text-xs mb-1 font-medium ${
                  isOwn ? 'text-right text-gray-400' : 'text-left text-gray-500'
                }`}
              >
                {shortId}
              </div>

              {/* Message Bubble */}
              <div className="relative">
                <div
                  className={`px-4 py-2 rounded-lg text-sm whitespace-pre-wrap break-words shadow-md
                  ${isOwn
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border rounded-bl-none'
                  }`}
                >
                  {msg.message}
                </div>

                {/* Bubble Tail */}
                <div
                  className={`
                    absolute bottom-0 w-0 h-0
                    ${isOwn
                      ? 'right-0 translate-x-full border-l-[6px] border-t-[6px] border-l-blue-500 border-t-transparent'
                      : 'left-0 -translate-x-full border-r-[6px] border-t-[6px] border-r-white border-t-transparent'
                    }
                  `}
                />
              </div>
            </div>

            {/* Right Avatar */}
            {isOwn && (
              <div className="flex-shrink-0 ml-2">
                <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold shadow">
                  💻
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div ref={endRef} />
    </div>
  );
};

export default ChatMessages;
