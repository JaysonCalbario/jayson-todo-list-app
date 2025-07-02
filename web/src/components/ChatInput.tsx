'use client';

import { useState, useRef } from 'react';
import { ChatMessage } from './useChatSocket';

interface ChatInputProps {
  clientId: string;
  onMessageSent: (msg: ChatMessage) => void;
}

const emojiList = ['😀', '😂', '😍', '🤔', '😎', '😭', '😅', '👍', '🎉', '🔥'];

const ChatInput = ({ clientId, onMessageSent }: ChatInputProps) => {
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const message = { senderId: clientId, message: trimmed };

    try {
      setIsSending(true);
      await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      });

      onMessageSent(message);
      setInput('');
    } catch (err) {
      console.error('Failed to send:', err);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const insertEmoji = (emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = input.slice(0, start) + emoji + input.slice(end);
    setInput(newValue);

    // Move cursor after emoji
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
    });

    setShowEmojis(false);
  };

  return (
    <div className="relative flex flex-col space-y-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowEmojis((prev) => !prev)}
          className="text-xl px-2 py-1 rounded hover:bg-blue-100 transition"
          title="Emoji"
        >
          😊
        </button>
        <textarea
          ref={textareaRef}
          className="flex-1 border p-2 rounded resize-y min-h-[3rem] max-h-48 overflow-y-auto text-sm sm:text-base"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here... (Shift + Enter for new line)"
          disabled={isSending}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm sm:text-base"
          onClick={handleSend}
          disabled={isSending}
        >
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </div>

      {/* Emoji Picker Dropdown */}
      {showEmojis && (
        <div className="absolute bottom-14 left-0 bg-white border border-gray-300 shadow-lg rounded p-2 grid grid-cols-5 gap-2 z-10">
          {emojiList.map((emoji) => (
            <button
              key={emoji}
              onClick={() => insertEmoji(emoji)}
              className="text-xl hover:scale-110 transition"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatInput;
