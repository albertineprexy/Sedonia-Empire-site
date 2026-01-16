
import React, { useState } from 'react';
import { useCMS } from '../store';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { config, pages } = useCMS();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <a href="#/" className="flex items-center space-x-2">
                <span className="text-3xl font-serif font-bold tracking-tighter" style={{ color: config.primaryColor }}>
                  {config.siteName}
                </span>
                <div className="w-px h-8 bg-gray-300 hidden sm:block"></div>
                <span className="hidden sm:block text-[10px] uppercase tracking-[0.3em] font-medium text-gray-500">
                  Sovereign Excellence
                </span>
              </a>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {pages.filter(p => p.isActive).sort((a,b) => a.order - b.order).map(page => (
                <a 
                  key={page.id} 
                  href={`#/${page.slug === 'home' ? '' : page.slug}`}
                  className="text-sm font-medium text-gray-700 hover:text-[#D4AF37] transition-colors"
                >
                  {page.title}
                </a>
              ))}
              <a 
                href="#/login" 
                className="px-6 py-2 rounded-full text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
                style={{ backgroundColor: config.primaryColor }}
              >
                Access Portal
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 py-4 px-6 space-y-4">
            {pages.filter(p => p.isActive).map(page => (
              <a 
                key={page.id} 
                href={`#/${page.slug === 'home' ? '' : page.slug}`}
                onClick={() => setIsMenuOpen(false)}
                className="block text-base font-medium text-gray-700"
              >
                {page.title}
              </a>
            ))}
            <a 
              href="#/login" 
              className="block w-full text-center px-6 py-3 rounded-md text-white font-semibold"
              style={{ backgroundColor: config.primaryColor }}
            >
              Access Portal
            </a>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: config.primaryColor }}>{config.siteName}</h2>
              <p className="text-gray-500 max-w-sm text-sm leading-relaxed mb-6">
                A global cultural authority dedicated to the elevation of leadership, heritage, and economic prosperity through structured excellence.
              </p>
              <div className="flex space-x-4">
                {Object.entries(config.socialLinks).map(([platform, link]) => (
                  <a key={platform} href={link} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gold transition-colors">
                    <span className="sr-only">{platform}</span>
                    <i className={`fab fa-${platform}`}></i>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-serif font-bold mb-4 text-gray-900">Empire</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#/about" className="hover:text-gold transition-colors">Origins & Legacy</a></li>
                <li><a href="#/the-queen" className="hover:text-gold transition-colors">The Crown</a></li>
                <li><a href="#/governance" className="hover:text-gold transition-colors">Governance</a></li>
                <li><a href="#/vision" className="hover:text-gold transition-colors">Global Outlook</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold mb-4 text-gray-900">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#/contact" className="hover:text-gold transition-colors">Diplomatic Inquiry</a></li>
                <li><a href="#/business-hub" className="hover:text-gold transition-colors">Business Hub</a></li>
                <li><a href="#/join" className="hover:text-gold transition-colors">Become a Citizen</a></li>
                <li><a href="#/news" className="hover:text-gold transition-colors">Official Gazette</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4 text-center">
            <p>&copy; 2024 The Sedonia Empire. All Sovereignty Reserved.</p>
            <div className="flex space-x-6">
              <a href="#/privacy" className="hover:text-gray-600">Privacy Protocols</a>
              <a href="#/terms" className="hover:text-gray-600">Terms of Allegiance</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
