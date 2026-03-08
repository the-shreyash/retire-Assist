import { FiUser, FiCpu } from 'react-icons/fi';

export default function ChatBubble({ message, isBot, timestamp }) {
    // Simple markdown-like rendering for bold text
    const renderText = (text) => {
        if (!text) return '';
        return text.split('\n').map((line, i) => {
            // Bold
            let rendered = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            return <p key={i} className={i > 0 ? 'mt-1' : ''} dangerouslySetInnerHTML={{ __html: rendered }} />;
        });
    };

    return (
        <div className={`flex gap-3 mb-4 animate-fade-in ${isBot ? '' : 'flex-row-reverse'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isBot ? 'bg-primary text-white' : 'bg-accent text-white'}`}>
                {isBot ? <FiCpu size={20} /> : <FiUser size={20} />}
            </div>
            <div className={isBot ? 'chat-bot' : 'chat-user'}>
                <div className="text-base leading-relaxed whitespace-pre-wrap">{renderText(message)}</div>
                {timestamp && (
                    <p className={`text-xs mt-2 ${isBot ? 'text-text-light' : 'text-white/70'}`}>
                        {new Date(timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                )}
            </div>
        </div>
    );
}
