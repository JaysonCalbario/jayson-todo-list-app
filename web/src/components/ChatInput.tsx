'use client';

import { useState, useRef, useCallback } from 'react';
import { ChatInputProps } from '@/app/lib/types';
import EmojiPicker from '../utils/emoji/EmojiPicker';

const ChatInput = ({ clientId, onMessageSent }: ChatInputProps) => {
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleEmojiToggle = () => setShowEmojis(prev => !prev);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSend = useCallback(async () => {
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
  }, [input, clientId, onMessageSent]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const insertEmoji = (emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = input.slice(0, start) + emoji + input.slice(end);
    setInput(newValue);

    requestAnimationFrame(() => {
      textarea.focus();
      const newPos = start + emoji.length;
      textarea.setSelectionRange(newPos, newPos);
    });

    setShowEmojis(false);
  };

  return (
    <div className="relative flex flex-col space-y-2">
      <div className="flex items-center gap-2">
        <button
          onClick={handleEmojiToggle}
          className="text-xl px-2 py-1 rounded hover:bg-blue-100 transition"
          title="Emoji"
        >
          😊
        </button>

        <textarea
          ref={textareaRef}
          className="flex-1 border p-2 rounded resize-y min-h-[3rem] max-h-48 overflow-y-auto text-sm sm:text-base"
          value={input}
          onChange={handleInputChange}
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

      {showEmojis && <EmojiPicker onSelect={insertEmoji} />}
    </div>
  );
};

export default ChatInput;
