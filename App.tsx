
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CMSProvider } from './store';
// import Layout from './components/Layout';
// import Home from './pages/Public/Home';
// import Login from './pages/Public/Login';
// import AdminDashboard from './pages/Admin/Dashboard';

// Page placeholder for unimplemented routes
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white px-4 text-center">
    <div className="w-20 h-1 bg-gold mb-8"></div>
    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">{title}</h1>
    <p className="text-gray-500 max-w-2xl text-lg leading-relaxed font-light mb-10">
      This area of the empire is currently under diplomatic reservation. Content will be manifested in accordance with sovereign schedules.
    </p>
    <a href="#/" className="text-xs uppercase tracking-widest font-bold text-gold border-b border-gold/30 pb-1">Return to Sovereignty</a>
  </div>
);

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (isAdmin) {
    return (
      <Routes>
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/about" element={<PlaceholderPage title="About the Empire" />} />
        <Route path="/vision" element={<PlaceholderPage title="Vision & Mission" />} />
        <Route path="/the-queen" element={<PlaceholderPage title="Her Majesty" />} />
        <Route path="/governance" element={<PlaceholderPage title="Governance & Diplomacy" />} />
        <Route path="/business-hub" element={<PlaceholderPage title="Sovereign Business Hub" />} />
        <Route path="/news" element={<PlaceholderPage title="Official Gazette" />} />
        <Route path="/join" element={<PlaceholderPage title="Apply for Citizenship" />} />
        <Route path="/contact" element={<PlaceholderPage title="Contact Protocol" />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="*" element={<PlaceholderPage title="404 - Sovereign Domain Not Found" />} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <CMSProvider>
      <Router>
        <AppRoutes />
      </Router>
    </CMSProvider>
  );
};

export default App;
