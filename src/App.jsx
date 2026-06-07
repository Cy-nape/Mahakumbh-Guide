import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import LanguageSplash from './components/LanguageSplash';
import DivineVoiceChat from './components/DivineVoiceChat';

// --- Modals Components ---

const NavigationInfo = () => (
  <div>
    <h2>🗺️ Navigation & Maps</h2>
    <p>The Mahakumbh 2025 grounds are spread across 4,000 hectares.</p>
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
      <div className="glass-panel" style={{ padding: '0.5rem', overflow: 'hidden' }}>
        <h3 style={{ marginLeft: '0.5rem', marginTop: '0.5rem' }}>Live Map (Triveni Sangam)</h3>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115328.6010043818!2d81.785086!3d25.435801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398534b8c66e2c39%3A0xcdaaa82fdd8c3f5e!2sTriveni%20Sangam%2C%20Prayagraj!5e0!3m2!1sen!2sin!4v1700000000000" 
          width="100%" 
          height="250" 
          style={{ border: 0, borderRadius: '8px' }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map Sangam"
        ></iframe>
      </div>

      <div className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
        <h3>Sector Schematic</h3>
        <div style={{ flex: 1, background: '#e3f2fd', borderRadius: '8px', position: 'relative', overflow: 'hidden', minHeight: '200px' }}>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '40%', width: '40px', background: '#90caf9', transform: 'skew(-15deg)' }}></div>
          <div style={{ position: 'absolute', top: '50%', right: 0, left: '40%', height: '40px', background: '#90caf9' }}></div>
          <div style={{ position: 'absolute', top: '45%', left: '42%', width: '20px', height: '20px', background: 'var(--primary-saffron)', borderRadius: '50%', boxShadow: '0 0 10px var(--gold)' }}></div>
          <div style={{ position: 'absolute', top: '10%', left: '10%', background: 'white', padding: '4px', fontSize: '0.7rem', border: '1px solid #ccc' }}>Sector 1-5 (VIP)</div>
          <div style={{ position: 'absolute', top: '70%', left: '10%', background: 'white', padding: '4px', fontSize: '0.7rem', border: '1px solid #ccc' }}>Sector 6-10 (Tents)</div>
          <div style={{ position: 'absolute', top: '20%', right: '10%', background: 'white', padding: '4px', fontSize: '0.7rem', border: '1px solid #ccc' }}>Daraganj</div>
          <div style={{ position: 'absolute', bottom: '10%', right: '10%', background: 'white', padding: '4px', fontSize: '0.7rem', border: '1px solid #ccc' }}>Jhusi Area</div>
        </div>
      </div>
    </div>
  </div>
);

const EmergencySupport = () => (
  <div>
    <h2>🚑 Emergency Support</h2>
    
    <div className="glass-panel" style={{ background: 'var(--danger)', color: 'white', padding: '1.5rem', textAlign: 'center', marginBottom: '1.5rem', cursor: 'pointer' }}>
      <h3 style={{ color: 'white', margin: 0 }}>⚠️ Report a Lost Person (Khoya-Paya)</h3>
      <p style={{ margin: '0.5rem 0 0 0' }}>Central Helpline: <strong>1900</strong> / <strong>+91-XXXX-XXXXXX</strong></p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
      <div className="glass-panel" style={{ padding: '1rem', borderLeft: '4px solid var(--accent-blue)' }}>
        <h3>Police Help & Outposts</h3>
        <p><strong>Emergency:</strong> 112</p>
      </div>
      <div className="glass-panel" style={{ padding: '1rem', borderLeft: '4px solid #e74c3c' }}>
        <h3>Firefighters</h3>
        <p><strong>Fire:</strong> 101</p>
      </div>
      <div className="glass-panel" style={{ padding: '1rem', borderLeft: '4px solid var(--success)' }}>
        <h3>Emergency First Aid</h3>
        <p><strong>Ambulance:</strong> 108</p>
      </div>
      <div className="glass-panel" style={{ padding: '1rem', borderLeft: '4px solid var(--gold)' }}>
        <h3>Private Doctors / Clinics</h3>
        <p><strong>On-Call Doc:</strong> +91-8888-XXXXXX</p>
      </div>
    </div>
  </div>
);

const EventInfo = () => {
  const [openEvent, setOpenEvent] = useState(null);
  const events = [
    { name: 'Paush Purnima', date: 'Jan 13, 2025', desc: 'Marks the official beginning of the Kalpavas (month-long penance).' },
    { name: 'Makar Sankranti', date: 'Jan 14, 2025', desc: 'First Shahi Snan (Royal Bath). The sun enters Capricorn.' },
    { name: 'Mauni Amavasya', date: 'Jan 29, 2025', desc: 'The most sacred and crowded day. It is the day of silence and the Main Royal Bath.' },
    { name: 'Basant Panchami', date: 'Feb 3, 2025', desc: 'Third Shahi Snan. Celebrates the arrival of spring and Goddess Saraswati.' },
    { name: 'Maghi Purnima', date: 'Feb 12, 2025', desc: 'Conclusion of Kalpavas. Devotees believe that a bath on this day guides them to the heavenly realm.' },
    { name: 'Maha Shivaratri', date: 'Feb 26, 2025', desc: 'Conclusion of the Mela. Dedicated to Lord Shiva.' },
  ];

  return (
    <div>
      <h2>📅 Event Information</h2>
      <div style={{ marginTop: '1rem' }}>
        {events.map((evt, idx) => (
          <div key={idx} className="accordion-item">
            <div className="accordion-header" onClick={() => setOpenEvent(openEvent === idx ? null : idx)}>
              <span>{evt.name} <span style={{ fontWeight: 'normal', color: 'var(--text-muted)', marginLeft: '1rem' }}>{evt.date}</span></span>
              <span>{openEvent === idx ? '▲' : '▼'}</span>
            </div>
            {openEvent === idx && (
              <div className="accordion-content">{evt.desc}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Accommodation = () => (
  <div>
    <h2>⛺ Accommodation</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80" alt="Hotel" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
        <div style={{ padding: '1rem' }}>
          <h3 style={{ margin: 0 }}>Treebo Premium Gateway</h3>
          <p style={{ color: 'var(--success)', margin: '0.2rem 0' }}>★ 8.2/10</p>
          <p><strong>₹2,500 - ₹4,000/night</strong></p>
        </div>
      </div>
      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80" alt="Hotel" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
        <div style={{ padding: '1rem' }}>
          <h3 style={{ margin: 0 }}>Super OYO Townhouse</h3>
          <p style={{ color: 'var(--success)', margin: '0.2rem 0' }}>★ 9.1/10</p>
          <p><strong>₹1,500 - ₹2,500/night</strong></p>
        </div>
      </div>
      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1542314831-c6a4d14d8373?auto=format&fit=crop&w=600&q=80" alt="Hotel" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
        <div style={{ padding: '1rem' }}>
          <h3 style={{ margin: 0 }}>Ojas Royale</h3>
          <p style={{ color: 'var(--success)', margin: '0.2rem 0' }}>★ 9.0/10</p>
          <p><strong>₹3,000+/night</strong></p>
        </div>
      </div>
      <div className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
        <h3 style={{ color: 'var(--gold)' }}>Budget Ashrams</h3>
        <p><strong>₹400 - ₹900/night</strong></p>
      </div>
    </div>
  </div>
);

const LocalServices = () => (
  <div>
    <h2>🍲 Local Restaurants</h2>
    <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
      <div className="glass-panel" style={{ padding: '1rem' }}>
        <h3 style={{ color: 'var(--maroon)' }}>Popular Local Restaurants</h3>
        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Hot Stuff (Civil Lines):</strong> Famous for multi-cuisine and fast food.</li>
          <li><strong>Amber Family Restaurant:</strong> Highly rated North Indian and Mughlai.</li>
          <li><strong>Sangam Satvik Rasoi (Naini):</strong> Pure veg (No Onion/No Garlic) meals.</li>
        </ul>
      </div>
      <div className="glass-panel" style={{ padding: '1rem', background: 'linear-gradient(to right, rgba(255,153,51,0.1), rgba(255,255,255,1))' }}>
        <h3 style={{ color: 'var(--deep-orange)' }}>Food Delivery Platforms</h3>
        <p>Use Swiggy, EatSure, or Zoop India (Train Delivery).</p>
      </div>
    </div>
  </div>
);


// --- Main App Component ---

function App() {
  const [hasLanguage, setHasLanguage] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [showDivineChat, setShowDivineChat] = useState(false);

  useEffect(() => {
    if (document.cookie.includes('googtrans=')) {
      setHasLanguage(true);
    }
  }, []);

  // Splash Screen Gate
  if (!hasLanguage) {
    return <LanguageSplash />;
  }

  const services = [
    { id: 'nav', title: "Navigation & Maps", icon: '🗺️', component: <NavigationInfo /> },
    { id: 'emergency', title: "Emergency Support", icon: '🚑', component: <EmergencySupport /> },
    { id: 'events', title: "Event Information", icon: '📅', component: <EventInfo /> },
    { id: 'stay', title: "Accommodation", icon: '⛺', component: <Accommodation /> },
    { id: 'services', title: "Local Restaurants", icon: '🍲', component: <LocalServices /> },
  ];

  return (
    <div className="app-wrapper">
      <Header />
      
      <main className="main-content">
        <section 
          style={{ 
            background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1600085444695-1f6e2f4f2244?auto=format&fit=crop&q=80")', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            padding: '5rem 1rem 3rem 1rem',
            textAlign: 'center',
            color: 'white',
            position: 'relative'
          }}
        >
          <div className="container animate-fade-in">
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--gold)', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              Welcome to the Sacred Sangam
            </h2>
            <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', marginBottom: '2rem' }}>
              Your comprehensive digital guide for the Maha Kumbh Mela 2025. Experience spiritual liberation with ease.
            </p>
            <button 
              className="btn btn-primary" 
              style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
              onClick={() => setActiveModal(services[2])}
            >
              View Important Dates
            </button>
          </div>
        </section>

        {/* Dedicated Divine AI Banner */}
        <section style={{ background: 'linear-gradient(135deg, var(--maroon) 0%, #4a0000 100%)', color: 'white', padding: '1.5rem', textAlign: 'center', borderBottom: '4px solid var(--primary-saffron)' }}>
          <div className="container flex justify-between items-center" style={{ maxWidth: '800px', margin: '0 auto', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ margin: 0, color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>✨</span> Divine Voice Sahayak
              </h3>
              <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>Talk to our animated God Avatar for immediate, context-aware help.</p>
            </div>
            <button className="btn" style={{ background: 'white', color: 'var(--maroon)', fontWeight: 'bold' }} onClick={() => setShowDivineChat(true)}>
              Summon Avatar 🎤
            </button>
          </div>
        </section>

        <section className="container p-8" style={{ position: 'relative', zIndex: 10 }}>
          <div className="text-center" style={{ marginBottom: '2rem' }}>
            <h2 className="text-maroon" style={{ fontSize: '2rem', background: 'var(--bg-light)', display: 'inline-block', padding: '0.5rem 2rem', borderRadius: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', margin: 0 }}>
              Pilgrim Services
            </h2>
          </div>

          <div className="grid-cards">
            {services.map((service) => (
              <div key={service.id} className="service-card" onClick={() => setActiveModal(service)}>
                <div className="service-icon">{service.icon}</div>
                <h3 style={{ margin: 0, color: 'var(--text-main)' }}>{service.title}</h3>
                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Click to view details
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <ChatAssistant />

      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>✕</button>
            {activeModal.component}
          </div>
        </div>
      )}

      {showDivineChat && (
        <DivineVoiceChat onClose={() => setShowDivineChat(false)} />
      )}
    </div>
  );
}

export default App;
