import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ChatbotInput({ state, onSend }) {
  const [value, setValue] = useState('');
  const currentState = state.currentStep;

  if (currentState === 'COMPLETE') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentState === 'COURSE') {
      if (!value.trim()) return;
      onSend(value.trim());
      setValue('');
    } else {
      if (!value.trim()) return;
      onSend(value.trim());
      setValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  const hasSkip = currentState === 'PHONE' || currentState === 'PHONE_CONVINCE';

  if (currentState === 'COURSE') {
    return (
      <div className="p-3 border-t border-blue-border bg-white">
        <div className="grid grid-cols-1 gap-2">
          {[
            'B.Tech / Engineering',
            'MBBS / Medicine',
            'MBA / Business',
            'B.A. / Arts & Humanities',
            'B.Sc. / Science',
            'LLB / Law',
            'BCA / Computer Applications',
            'Other / Not Sure Yet',
          ].map((option) => (
            <button
              key={option}
              onClick={() => onSend(option)}
              className="w-full text-left px-3 py-2 text-sm rounded-lg border border-blue-border bg-white text-[#0F172A] hover:bg-blue-light hover:border-blue-primary transition-colors font-body"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t border-blue-border flex flex-col gap-2 bg-white">
      <div className="flex gap-2">
        <input
          type={
            currentState === 'PHONE' || currentState === 'PHONE_CONVINCE'
              ? 'tel'
              : currentState === 'EMAIL'
                ? 'email'
                : 'text'
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={(() => {
            if (currentState === 'GREETING') return 'Enter your full name...';
            if (currentState === 'PHONE' || currentState === 'PHONE_CONVINCE')
              return 'e.g., +91 98765 43210';
            if (currentState === 'EMAIL') return 'your.email@example.com';
            return '';
          })()}
          className="flex-1 px-3 py-2.5 text-sm rounded-lg font-body border border-blue-border bg-white text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-blue-primary/30 focus:border-blue-primary transition-all"
          autoFocus
        />
        <button
          type="submit"
          className="px-4 py-2.5 bg-blue-primary text-white font-body font-semibold rounded-lg hover:bg-blue-dark transition-colors text-sm"
        >
          <Send size={16} strokeWidth={1.5} />
        </button>
      </div>
      {hasSkip && (
        <button
          type="button"
          onClick={() => onSend('')}
          className="self-center text-xs text-[#64748B] hover:text-blue-primary transition-colors font-body"
        >
          Skip this step →
        </button>
      )}
    </form>
  );
}
