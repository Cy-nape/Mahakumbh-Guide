import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Custom hook for speech recognition
const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current][0].transcript;
        setTranscript(result);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript('');
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      alert("Voice recognition is not supported in this browser.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return { isListening, transcript, startListening, stopListening, setTranscript };
};

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { text: "Namaste! 🙏 I am your AI Pilgrim Assistant. I can help you with Mahakumbh 2025 information, navigation, dates, and emergencies. How can I assist you today?", sender: "ai" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const { isListening, transcript, startListening, stopListening, setTranscript } = useSpeechRecognition();

  // Listen for custom event to open chat from anywhere
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenChat);
  }, []);

  // Update input when voice transcript comes in
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
      // Optional: automatically send when voice stops
      // handleSendWithText(transcript); 
    }
  }, [transcript]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const handleSend = async (e) => {
    e.preventDefault();
    handleSendWithText(input);
  };

  const handleSendWithText = async (text) => {
    if (!text.trim()) return;

    const userMsg = text.trim();
    setMessages(prev => [...prev, { text: userMsg, sender: "user" }]);
    setInput('');
    setTranscript(''); // Clear transcript
    setIsTyping(true);

    if (!apiKey || apiKey === 'your_api_key_here') {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "I am currently disconnected from the Gemini AI network because the API key is missing. Please add your Gemini API Key to the .env file.", 
          sender: "ai" 
        }]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // Construct strict context prompt
      const systemPrompt = `You are the 'Mahakumbh AI Sahayak', a helpful, polite, and knowledgeable assistant for pilgrims attending the Mahakumbh Mela 2025 in Prayagraj.
Your ONLY purpose is to answer questions related to the Mahakumbh Mela (dates, accommodation, navigation, lost and found, emergency services, food, history). 
If the user asks about anything completely unrelated, politely refuse to answer and guide them back to Mahakumbh topics.
Keep your answers very concise (2-3 sentences max) because you are in a small chat window. Be polite and use Namaste where appropriate.`;

      const prompt = `${systemPrompt}\n\nUser Question: ${userMsg}\nAnswer:`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiResponseText = response.text();

      setMessages(prev => [...prev, { text: aiResponseText, sender: "ai" }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { text: "I'm sorry, I am experiencing a divine network issue. Please try again.", sender: "ai" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-widget" translate="no">
      {isOpen && (
        <div className="chat-window" translate="yes">
          <div className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🤖</span>
              <strong>AI Sahayak (Gemini)</strong>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
            >
              ✕
            </button>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender === 'ai' ? 'message-ai' : 'message-user'}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="chat-message message-ai" style={{ opacity: 0.7 }}>
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleSend}>
            <button 
              type="button"
              onClick={isListening ? stopListening : startListening}
              style={{
                background: isListening ? 'var(--danger)' : '#eee',
                color: isListening ? 'white' : '#333',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                marginRight: '0.5rem'
              }}
              title="Voice Input"
            >
              🎤
            </button>
            <input 
              type="text" 
              placeholder={isListening ? "Listening..." : "Ask me anything..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}

      {!isOpen && (
        <button className="chat-toggle" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
};

export default ChatAssistant;
