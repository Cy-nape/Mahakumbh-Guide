import React from 'react';

const languages = [
  { code: 'hi', name: 'हिन्दी', label: 'Hindi' },
  { code: 'en', name: 'English', label: 'English' },
  { code: 'bn', name: 'বাংলা', label: 'Bengali' },
  { code: 'te', name: 'తెలుగు', label: 'Telugu' },
  { code: 'mr', name: 'मराठी', label: 'Marathi' },
  { code: 'ta', name: 'தமிழ்', label: 'Tamil' },
  { code: 'ur', name: 'اردو', label: 'Urdu' },
  { code: 'gu', name: 'ગુજરાતી', label: 'Gujarati' },
  { code: 'kn', name: 'ಕನ್ನಡ', label: 'Kannada' },
  { code: 'or', name: 'ଓଡ଼ିଆ', label: 'Odia' },
  { code: 'ml', name: 'മലയാളം', label: 'Malayalam' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', label: 'Punjabi' },
  { code: 'as', name: 'অসমীয়া', label: 'Assamese' },
  { code: 'mai', name: 'मैथिली', label: 'Maithili' },
  { code: 'sat', name: 'ᱥᱟᱱᱛᱟᱲᱤ', label: 'Santali' },
  { code: 'ks', name: 'कॉशुर / كأشُر', label: 'Kashmiri' },
  { code: 'ne', name: 'नेपाली', label: 'Nepali' },
  { code: 'sd', name: 'सिन्धी / سنڌي', label: 'Sindhi' },
  { code: 'doi', name: 'डोगरी', label: 'Dogri' },
  { code: 'sa', name: 'संस्कृतम्', label: 'Sanskrit' }
];

const LanguageSplash = () => {
  const selectLanguage = (lang) => {
    // Set Google Translate cookie
    document.cookie = `googtrans=/en/${lang.code}; path=/`;
    document.cookie = `googtrans=/en/${lang.code}; domain=${window.location.hostname}; path=/`;
    
    // Reload the page to let Google Translate script pick up the cookie and translate the DOM
    window.location.reload();
  };

  return (
    <div className="splash-screen">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--deep-orange)' }}>ॐ</div>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--maroon)' }}>Welcome to Mahakumbh</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Please select your preferred language to continue</p>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>कृपया आगे बढ़ने के लिए अपनी पसंदीदा भाषा चुनें</p>
      </div>

      <div className="lang-grid">
        {languages.map((lang) => (
          <div 
            key={lang.code} 
            className="lang-box" 
            onClick={() => selectLanguage(lang)}
          >
            <div style={{ fontSize: '1.2rem' }}>{lang.name}</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{lang.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSplash;
