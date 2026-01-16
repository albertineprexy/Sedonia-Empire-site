
import React, { useState } from 'react';
import { useCMS } from '../../store';

const Login: React.FC = () => {
  const { config } = useCMS();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate admin login
    if (email === 'admin@sedonia.empire' && password === 'admin123') {
      window.location.hash = '/admin';
    } else {
      alert('Unauthorized. Please provide royal credentials.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-slate-50">
      <div className="max-w-md w-full">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-slate-900 text-gold flex items-center justify-center rounded-2xl mx-auto mb-6 text-3xl font-serif font-bold shadow-inner">
              {config.logo}
            </div>
            <h1 className="text-3xl font-serif font-bold text-slate-900">Royal Access</h1>
            <p className="text-gray-400 text-sm mt-2">Enter your credentials to manage the empire.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Diplomatic Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-gray-200 focus:border-gold outline-none transition-all text-sm"
                placeholder="admin@sedonia.empire"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Security Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-gray-200 focus:border-gold outline-none transition-all text-sm"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-gold hover:text-slate-900 transition-all shadow-lg active:scale-95"
            >
              Authenticate & Enter
            </button>
          </form>
          
          <div className="mt-8 text-center text-xs text-gray-400">
            <a href="#" className="hover:text-gold">Forgot Security Key?</a>
          </div>
        </div>
        <p className="text-center mt-8 text-xs text-gray-400">
          This is a protected sovereign system. Unauthorized access is strictly prohibited.
        </p>
      </div>
    </div>
  );
};

export default Login;
