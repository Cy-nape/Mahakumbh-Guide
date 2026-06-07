import React, { useState } from 'react';

const Footer = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "How do I find a lost person?",
      a: "Immediately contact the 'Khoya-Paya' (Lost and Found) center available at the entrance of every sector, or call the Central Helpline at 1900. Provide them with a recent photo and description. Announcements are made across the grounds constantly."
    },
    {
      q: "How do I find a lost thing / item?",
      a: "Lost items should be reported to the nearest Police Outpost or the Khoya-Paya centers. If someone hands over a found item, it is logged in the digital database accessible at any help desk."
    },
    {
      q: "Where to report if someone abuses/harasses me?",
      a: "Your safety is paramount. Dial 112 immediately, or approach any of the Jal Police / specialized crowd management personnel stationed every 2km. There are also dedicated Women Help Desks in major sectors."
    },
    {
      q: "Where to get immediate physical or medical help?",
      a: "Dial 108 for an ambulance. There are over 100 temporary first-aid centers and hospitals spread across all sectors. In Sector 4, there is a large multi-specialty medical camp for severe emergencies."
    },
    {
      q: "What is the Kumbh Mela and why is it in Prayagraj?",
      a: "It is the world's largest peaceful religious gathering, rooted in Hindu mythology, where pilgrims bathe in holy rivers. Prayagraj is the convergence (Sangam) of the Ganges, Yamuna, and Saraswati rivers, making it highly auspicious."
    }
  ];

  return (
    <footer style={{ background: 'var(--text-main)', color: 'white', marginTop: 'auto' }}>
      <div className="container p-8">
        <h3 className="text-center text-saffron" style={{ marginBottom: '2rem' }}>Frequently Asked Questions & Help</h3>
        
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} style={{ 
              marginBottom: '1rem', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <div 
                style={{ 
                  padding: '1rem', 
                  background: 'rgba(255,255,255,0.05)', 
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontWeight: 'bold'
                }}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                {faq.q}
                <span style={{ color: 'var(--primary-saffron)' }}>{openFaq === idx ? '−' : '+'}</span>
              </div>
              {openFaq === idx && (
                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', color: '#ddd' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <p>© 2025 Mahakumbh Pilgrim Assistant. Created for the AI-Assisted Product Build Challenge.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
