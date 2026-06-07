import React from 'react';

const Header = () => {
  return (
    <header className="glass-header" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100 }}>
      <div className="container flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%', 
            background: 'linear-gradient(135deg, var(--gold), var(--deep-orange))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 'bold', fontSize: '1.2rem'
          }}>
            ॐ
          </div>
          <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
            Mahakumbh Guide
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Custom language reset button */}
          <button 
            onClick={() => {
              document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
              document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
              window.location.reload();
            }}
            style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.5)', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}
          >
            Change Language
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
