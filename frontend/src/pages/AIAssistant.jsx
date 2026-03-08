import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ChatBubble from '../components/ChatBubble';
import { FiSend, FiMic, FiHelpCircle } from 'react-icons/fi';

const suggestedQuestions = [
    "How do I submit my life certificate?",
    "Why has my pension stopped?",
    "How do I update bank details?",
    "What is my pension amount?",
    "How to apply for pension correction?",
    "What healthcare benefits do I get?",
];

export default function AIAssistant() {
    const { API } = useAuth();
    const [messages, setMessages] = useState([
        {
            text: `🙏 **Namaste! Welcome to RetireAssist AI Assistant.**\n\nI'm here to help you with all pension and retirement-related queries. You can ask me about:\n\n- 📋 How to submit your **Life Certificate**\n- 💰 Why your **pension has stopped**\n- 🏦 How to **update bank details**\n- 📄 How to apply for **pension correction**\n- 🏥 **Healthcare benefits** for pensioners\n\nJust type your question below or tap a suggested question! 😊`,
            isBot: true,
            timestamp: new Date().toISOString()
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        const userMsg = { text, isBot: false, timestamp: new Date().toISOString() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const res = await API.post('/chat', { message: text });
            setMessages(prev => [...prev, {
                text: res.data.message,
                isBot: true,
                timestamp: res.data.timestamp
            }]);
        } catch {
            setMessages(prev => [...prev, {
                text: "I'm sorry, I couldn't process your question right now. Please try again or call the Pension Helpline: 1800-11-1960",
                isBot: true,
                timestamp: new Date().toISOString()
            }]);
        } finally {
            setLoading(false);
            inputRef.current?.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(input);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="heading-page flex items-center gap-3">
                        <span className="text-3xl">🤖</span> AI Assistant
                    </h1>
                    <p className="text-text-light text-lg">Ask me anything about pension and retirement services</p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto bg-bg rounded-3xl p-6 mb-4 space-y-2">
                {messages.map((msg, i) => (
                    <ChatBubble
                        key={i}
                        message={msg.text}
                        isBot={msg.isBot}
                        timestamp={msg.timestamp}
                    />
                ))}
                {loading && (
                    <div className="flex gap-3 mb-4 animate-fade-in">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                            🤖
                        </div>
                        <div className="chat-bot">
                            <div className="flex gap-1.5">
                                <span className="w-2.5 h-2.5 bg-text-light rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2.5 h-2.5 bg-text-light rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2.5 h-2.5 bg-text-light rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-3 scrollbar-thin">
                {suggestedQuestions.map((q, i) => (
                    <button
                        key={i}
                        onClick={() => sendMessage(q)}
                        disabled={loading}
                        className="flex-shrink-0 px-5 py-3 bg-white border-2 border-border rounded-2xl text-sm font-medium text-text hover:border-accent hover:text-accent transition-all cursor-pointer disabled:opacity-50"
                    >
                        <FiHelpCircle className="inline mr-1" size={14} /> {q}
                    </button>
                ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                    ref={inputRef}
                    type="text"
                    className="input-senior flex-1"
                    placeholder="Type your question here..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="btn-primary px-8 disabled:opacity-50"
                >
                    <FiSend size={22} />
                </button>
            </form>
        </div>
    );
}
