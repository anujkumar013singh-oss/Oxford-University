import { useChatbot } from './useChatbot';
import ChatbotHeader from './ChatbotHeader';
import ChatbotMessages from './ChatbotMessages';
import ChatbotInput from './ChatbotInput';
import { MessageCircle } from 'lucide-react';

export default function ChatbotWidget() {
  const { state, dispatch, handleUserInput } = useChatbot();

  if (!state.isOpen) {
    return (
      <button
        onClick={() => dispatch({ type: 'TOGGLE_CHAT' })}
        className="fixed bottom-6 left-6 z-[9999] w-14 h-14 rounded-full bg-blue-primary text-white flex items-center justify-center shadow-lg hover:bg-blue-dark hover:scale-110 transition-all duration-300"
        aria-label="Open chat"
      >
        <MessageCircle size={24} strokeWidth={1.5} />
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-6 left-6 z-[9999] w-[360px] max-w-[calc(100vw-2rem)] h-[480px] max-h-[calc(100vh-2rem)] bg-white border border-blue-border shadow-xl flex flex-col rounded-xl overflow-hidden"
    >
      <ChatbotHeader onMinimize={() => dispatch({ type: 'MINIMIZE' })} />
      <ChatbotMessages state={state} />
      <ChatbotInput state={state} onSend={handleUserInput} />
    </div>
  );
}
