import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ChatBubble from '../components/ChatBubble';
import { FiSend, FiHelpCircle } from 'react-icons/fi';

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
        <div className="flex flex-col h-[calc(100vh-100px)]">
            {/* Header */}
            <div className="mb-3">
                <h1 className="heading-page flex items-center gap-2">
                    <span className="text-2xl">🤖</span> AI Assistant
                </h1>
                <p className="text-text-light text-sm">Ask me anything about pension and retirement services</p>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto bg-bg rounded-xl p-4 mb-3 space-y-1 border border-border">
                {messages.map((msg, i) => (
                    <ChatBubble
                        key={i}
                        message={msg.text}
                        isBot={msg.isBot}
                        timestamp={msg.timestamp}
                    />
                ))}
                {loading && (
                    <div className="flex gap-2.5 mb-3 animate-fade-in">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-sm">
                            🤖
                        </div>
                        <div className="chat-bot">
                            <div className="flex gap-1.5">
                                <span className="w-2 h-2 bg-text-light rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-text-light rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-text-light rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
                {suggestedQuestions.map((q, i) => (
                    <button
                        key={i}
                        onClick={() => sendMessage(q)}
                        disabled={loading}
                        className="flex-shrink-0 px-3 py-1.5 bg-white border border-border rounded-lg text-xs font-medium text-text-light hover:border-primary hover:text-primary transition-all cursor-pointer disabled:opacity-50"
                    >
                        <FiHelpCircle className="inline mr-1" size={11} /> {q}
                    </button>
                ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-2">
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
                    className="btn-primary px-5 disabled:opacity-50"
                >
                    <FiSend size={18} />
                </button>
            </form>
        </div>
    );
}
