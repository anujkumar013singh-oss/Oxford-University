import { useEffect, useRef } from 'react';
import TypingIndicator from './TypingIndicator';

function ChatbotMessage({ message }) {
  const isBot = message.type === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} px-4 py-1.5`}>
      <div
        className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed font-body ${
          isBot
            ? 'bg-blue-light text-[#0F172A] rounded-tr-xl rounded-br-xl rounded-bl-xl'
            : 'bg-blue-primary text-white rounded-tl-xl rounded-bl-xl rounded-br-xl'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}

export default function ChatbotMessages({ state }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages, state.isTyping]);

  return (
    <div className="flex-1 overflow-y-auto py-3 space-y-1 bg-white">
      {state.messages.map((msg) => (
        <ChatbotMessage key={msg.id} message={msg} />
      ))}
      {state.isTyping && <TypingIndicator />}
      {state.error && (
        <div className="px-4 py-1.5">
          <p className="text-red-500 text-xs font-body">{state.error}</p>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
