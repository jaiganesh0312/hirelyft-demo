'use client';

import { useState, useRef, useEffect } from 'react';
import { Input, Button } from '@heroui/react';
import { Icon } from '@iconify/react';

export default function MessageInput({ onSend, onTyping, isSending = false }) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    onSend(message);
    setMessage('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
    onTyping();
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <Input
            ref={textareaRef}
            as="textarea"
            variant="flat"
            placeholder="Type a message..."
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            classNames={{
              input: 'max-h-[200px] min-h-[40px] py-2 resize-none',
              inputWrapper: 'h-auto',
            }}
            minRows={1}
            maxRows={6}
          />
        </div>
        <Button
          isIconOnly
          color="primary"
          type="submit"
          isLoading={isSending}
          isDisabled={!message.trim()}
          className="h-[44px] min-w-[44px]"
        >
          {!isSending && <Icon icon="mdi:send" className="text-lg" />}
        </Button>
      </div>
    </form>
  );
}
