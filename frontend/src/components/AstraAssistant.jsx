import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, HelpCircle } from 'lucide-react';

export default function AstraAssistant({ isOpen, onClose, activeCaseId }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Greetings! I am your AstraGuard Investigation Assistant. I ground all answers directly in verified evidence and active case telemetry. How can I assist your investigation today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          investigation_id: activeCaseId,
          message: userMsg
        })
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Apologies, AstraGuard Assistant encountered a network telemetry issue.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    'Why did you flag this?',
    'Which source contradicts the claim?',
    'What evidence should I preserve?',
    'How do I report cybercrime?'
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[90vw] bg-[#FFFFFF] border border-[#D4CEC2] rounded-2xl shadow-xl overflow-hidden flex flex-col h-[520px] animate-in fade-in slide-in-from-bottom duration-200">
      
      {/* Header */}
      <div className="p-3.5 bg-[#FAF8F4] border-b border-[#D4CEC2] flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-md bg-[#FBEDEA] border border-[#F5D8D2] flex items-center justify-center">
            <Bot className="w-4 h-4 text-[#C74634]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#1C1C1A] font-mono flex items-center gap-1.5">
              <span>AstraGuard Assistant</span>
              <Sparkles className="w-3 h-3 text-[#C74634]" />
            </h4>
            <p className="text-[10px] text-[#858078] font-mono">
              {activeCaseId ? `Active Case #${activeCaseId}` : 'Grounded AI Safety Assistant'}
            </p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 text-[#858078] hover:text-[#1C1C1A] rounded cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F5F1E8] text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-3 ${
                m.sender === 'user'
                  ? 'bg-[#FBEDEA] text-[#C74634] border border-[#F5D8D2] font-medium'
                  : 'bg-[#FFFFFF] text-[#1C1C1A] border border-[#D4CEC2] shadow-sm'
              }`}
            >
              <p className="whitespace-pre-line leading-relaxed font-sans">{m.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center space-x-2 text-[#C74634] text-xs font-mono p-2">
            <Bot className="w-3.5 h-3.5 animate-spin" />
            <span>Consulting Evidence Graph...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="px-3 py-2 bg-[#FAF8F4] border-t border-[#D4CEC2] flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono scrollbar-none">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => setInput(q)}
            className="whitespace-nowrap px-2 py-1 rounded-md bg-[#FFFFFF] hover:bg-[#FBEDEA] hover:text-[#C74634] text-[#5E5B55] border border-[#D4CEC2] transition-colors cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 bg-[#FFFFFF] border-t border-[#D4CEC2] flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about this investigation..."
          className="flex-1 bg-[#FAF8F4] border border-[#D4CEC2] rounded-md px-3 py-2 text-xs text-[#1C1C1A] placeholder-[#858078] focus:outline-none focus:border-[#C74634] font-mono"
        />
        <button
          type="submit"
          disabled={loading}
          className="p-2 bg-[#C74634] hover:bg-[#9F2F24] text-[#FFFFFF] rounded-md transition-all cursor-pointer shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
