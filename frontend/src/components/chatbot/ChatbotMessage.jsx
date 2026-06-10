export default function ChatbotMessage({ message }) {
  const isBot = message.type === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} px-4 py-1.5`}>
      <div
        className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
          isBot
            ? 'bg-white text-text-body rounded-tr-xl rounded-br-xl rounded-bl-xl'
            : 'bg-primary text-text-on-red rounded-tl-xl rounded-bl-xl rounded-br-xl'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
