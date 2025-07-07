'use client';
import { EmojiPickerProps } from "@/app/lib/types";


const emojiList = ['😀', '😂', '😍', '🤔', '😎', '😭', '😅', '👍', '🎉', '🔥'];

const EmojiPicker = ({ onSelect }: EmojiPickerProps) => {
  return (
    <div className="absolute bottom-14 left-0 bg-white border border-gray-300 shadow-lg rounded p-2 grid grid-cols-5 gap-2 z-10">
      {emojiList.map(emoji => (
        <button
          key={emoji}
          onClick={() => onSelect(emoji)}
          className="text-xl hover:scale-110 transition"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojiPicker;
