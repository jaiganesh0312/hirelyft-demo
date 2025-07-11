'use client';

export default function TypingIndicator({ userName }) {
  return (
    <div className="flex items-center gap-1 mb-2">
      <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1.5">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="text-xs text-gray-500">{userName} is typing...</span>
    </div>
  );
}
