export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 px-4 py-2">
      <div className="bg-blue-light border border-blue-border rounded-tr-xl rounded-br-xl rounded-bl-xl px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-primary/50 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-blue-primary/50 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-blue-primary/50 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
