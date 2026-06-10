import { UNIVERSITY_NAME } from '../../constants/content';
import { Minus } from 'lucide-react';

export default function ChatbotHeader({ onMinimize }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between bg-blue-primary border-b border-blue-dark">
      <div className="flex items-center gap-2">
        <img src="https://png.pngtree.com/png-clipart/20230403/original/pngtree-education-and-college-logo-design-template-png-image_9022986.png" alt="Oxford" className="h-7 w-7 rounded-full object-cover" />
        <span className="font-logo text-white text-base leading-none">{UNIVERSITY_NAME}</span>
      </div>
      <button
        onClick={onMinimize}
        className="text-white/70 hover:text-white transition-colors p-1"
        aria-label="Minimize chat"
      >
        <Minus size={18} strokeWidth={1.5} />
      </button>
    </div>
  );
}
