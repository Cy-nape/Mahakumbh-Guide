import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const DivineVoiceChat = ({ onClose }) => {
  const [state, setState] = useState('idle'); // 'idle', 'speaking', 'listening', 'thinking'
  const [hasAwakened, setHasAwakened] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [responseMsg, setResponseMsg] = useState('...');
  
  const recognitionRef = useRef(null);
  const synthRef = window.speechSynthesis;
  const utteranceRef = useRef(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // Extract current language from Google Translate Cookie
  const getLangFromCookie = () => {
    const match = document.cookie.match(/googtrans=\/[^\/]+\/([^;]+)/);
    return match ? match[1] : 'en';
  };
  const currentLangCode = getLangFromCookie();

  const langLocaleMap = {
    hi: 'hi-IN', en: 'en-IN', mr: 'mr-IN', bn: 'bn-IN', 
    te: 'te-IN', ta: 'ta-IN', gu: 'gu-IN', kn: 'kn-IN', 
    ml: 'ml-IN', ur: 'ur-IN', pa: 'pa-IN'
  };
  const currentLocale = langLocaleMap[currentLangCode] || 'hi-IN';

  const greetings = {
    hi: "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?",
    mr: "नमस्कार! मी तुम्हाला कशी मदत करू शकतो?",
    bn: "নমস্কার! আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
    te: "నమస్కారం! నేను మీకు ఎలా సహాయం చేయగలను?",
    en: "Namaste! How may I guide your journey today?"
  };

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = currentLocale; // Set recognition language dynamically
      
      recognitionRef.current.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        handleUserSpeech(text);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        if (event.error === 'not-allowed') {
          setResponseMsg("❌ Microphone Blocked! Please allow mic access in your browser URL bar.");
          setState('idle');
        } else if (event.error === 'network') {
          setResponseMsg("❌ Network error. Speech recognition requires internet.");
          setState('idle');
        } else if (event.error !== 'no-speech') {
          setResponseMsg(`❌ Mic Error: ${event.error}`);
          setState('idle');
        }
      };

      recognitionRef.current.onend = () => {
        setState(prev => {
          if (prev === 'listening') return 'idle';
          return prev;
        });
      };
    }

    return () => {
      synthRef.cancel();
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, [currentLocale]);

  const awaken = () => {
    setHasAwakened(true);
    speakText(greetings[currentLangCode] || greetings['hi']);
  };

  const speakText = (text) => {
    if (synthRef.speaking) synthRef.cancel();

    setState('speaking');
    setResponseMsg(text);

    utteranceRef.current = new SpeechSynthesisUtterance(text);
    
    // Dynamically find a voice that matches the selected language
    const voices = synthRef.getVoices();
    const dynamicVoice = voices.find(v => v.lang === currentLocale) 
                      || voices.find(v => v.lang.startsWith(currentLangCode)) 
                      || voices.find(v => v.lang === 'hi-IN');
                      
    if (dynamicVoice) utteranceRef.current.voice = dynamicVoice;
    
    utteranceRef.current.pitch = 0.9;
    utteranceRef.current.rate = 0.9;

    utteranceRef.current.onend = () => {
      startListening();
    };

    synthRef.speak(utteranceRef.current);

    // Bulletproof Deadlock Fix: If the browser refuses to play audio (no onend event), 
    // force the state back to idle after 4 seconds so the user isn't stuck.
    setTimeout(() => {
      setState(prev => {
        if (prev === 'speaking') {
          return 'idle';
        }
        return prev;
      });
    }, 4000);
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setState(prev => {
        if (prev !== 'listening') {
          try {
            recognitionRef.current.start();
          } catch (err) {
            console.error("Recognition already started", err);
          }
        }
        return 'listening';
      });
      setTranscript('...');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {}
    }
    setState('idle');
  };

  const handleUserSpeech = async (text) => {
    setState('thinking');
    setResponseMsg('...');

    if (!apiKey || apiKey === 'your_api_key_here') {
      speakText("I am currently disconnected from the divine network because the API key is missing.");
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const systemPrompt = `You are a divine AI Sahayak (a cartoon god avatar) speaking to a pilgrim at the Mahakumbh Mela 2025.
Your ONLY purpose is to answer questions related to the Mahakumbh Mela.
Since you are speaking out loud, keep your answers EXTREMELY short, conversational, and direct (maximum 2 sentences).
Do not use bullet points or formatting. Just natural spoken text.
CRITICAL: You MUST reply entirely in the language associated with this language code: ${currentLangCode} (${currentLocale}).`;

      const prompt = `${systemPrompt}\n\nPilgrim asks: ${text}\nYour spoken reply:`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let aiResponseText = response.text().replace(/\*/g, '');

      speakText(aiResponseText);
    } catch (error) {
      console.error(error);
      speakText("I am experiencing a divine network issue.");
    }
  };

  return (
    <div className="divine-overlay animate-fade-in" translate="no">
      <button 
        onClick={() => {
          synthRef.cancel();
          if (recognitionRef.current) recognitionRef.current.stop();
          onClose();
        }}
        style={{
          position: 'absolute', top: '2rem', right: '2rem',
          background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white',
          fontSize: '2rem', cursor: 'pointer', borderRadius: '50%', width: '50px', height: '50px'
        }}
      >
        ✕
      </button>

      {/* The Avatar */}
      <div 
        style={{
          width: '300px', height: '300px',
          borderRadius: '50%',
          overflow: 'hidden',
          marginBottom: '2rem',
          border: '5px solid var(--gold)',
          transition: 'all 0.3s ease'
        }}
        className={state === 'speaking' ? 'avatar-speaking' : 'avatar-idle'}
      >
        <img src="/avatar.png" alt="Divine AI" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: hasAwakened ? 1 : 0.5 }} />
      </div>

      {/* Subtitles / Captions */}
      <div style={{ textAlign: 'center', maxWidth: '800px', padding: '0 2rem' }}>
        
        {!hasAwakened ? (
          <div>
            <h2 style={{ color: 'var(--gold)', fontSize: '2rem', marginBottom: '2rem' }}>The Divine Sahayak Awaits</h2>
            <button className="btn btn-primary" onClick={awaken} style={{ fontSize: '1.5rem', padding: '1rem 3rem', animation: 'pulseGlow 2s infinite' }}>
              Click to Awaken Sahayak 👁️
            </button>
          </div>
        ) : (
          <>
            <h2 style={{ color: 'var(--gold)', fontSize: '2.5rem', marginBottom: '1rem', minHeight: '80px' }}>
              {state === 'listening' ? <span style={{ color: 'var(--danger)' }}>" {transcript} "</span> : responseMsg}
            </h2>

            {/* Status Indicators */}
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
              {state === 'idle' && (
                <button className="btn btn-primary" onClick={startListening} style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
                  Tap to Speak 🎤
                </button>
              )}
              {state === 'listening' && (
                <div style={{ color: 'var(--danger)', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  🔴 Listening... Speak now
                </div>
              )}
              {state === 'thinking' && (
                <div style={{ color: 'var(--gold)', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  ✨ Thinking...
                </div>
              )}
              {state === 'speaking' && (
                <div style={{ color: 'var(--success)', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  🔊 Speaking...
                </div>
              )}
            </div>

            {/* Bulletproof Text Fallback if Mic is broken */}
            {(state === 'idle' || state === 'speaking') && (
              <form 
                style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}
                onSubmit={(e) => {
                  e.preventDefault();
                  const val = e.target.elements.fallbackInput.value;
                  if (val.trim()) {
                    setTranscript(val);
                    handleUserSpeech(val);
                    e.target.reset();
                  }
                }}
              >
                <input 
                  name="fallbackInput"
                  type="text" 
                  placeholder="Or type your question here..." 
                  style={{ padding: '0.8rem 1.5rem', borderRadius: '30px', border: '1px solid var(--gold)', width: '300px', background: 'rgba(255,255,255,0.9)', color: 'black' }}
                />
                <button type="submit" className="btn btn-primary" style={{ borderRadius: '30px', padding: '0 1.5rem' }}>Send</button>
              </form>
            )}

          </>
        )}
      </div>
    </div>
  );
};

export default DivineVoiceChat;
