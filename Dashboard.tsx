
import React, { useState } from 'react';
import { useCMS } from '../../store';
import { Page, Post, BusinessListing } from '../../types';

const AdminDashboard: React.FC = () => {
  const { 
    pages, posts, businesses, submissions, config, 
    updateConfig, updatePage, deletePage, updatePost, deletePost,
    updateBusiness, deleteBusiness
  } = useCMS();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'pages' | 'posts' | 'business' | 'design'>('overview');

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Live Pages', value: pages.length, icon: '📄' },
          { label: 'Announcements', value: posts.length, icon: '📰' },
          { label: 'Citizen Biz', value: businesses.length, icon: '💼' },
          { label: 'Inquiries', value: submissions.length, icon: '✉️' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-serif font-bold text-slate-900">{stat.value}</div>
            <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-serif font-bold">Recent Inquiries</h3>
          <span className="text-xs text-gold font-bold">{submissions.length} Total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-white text-gray-400 uppercase text-[10px] tracking-widest border-b border-gray-100">
                <th className="px-6 py-4">Sender</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-400">No submissions yet.</td>
                </tr>
              ) : submissions.map(sub => (
                <tr key={sub.id}>
                  <td className="px-6 py-4 font-medium">{sub.name}</td>
                  <td className="px-6 py-4 text-gray-500">{sub.subject}</td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{new Date(sub.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <button className="text-gold font-bold text-xs hover:underline">Read Dispatch</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPages = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold">Sovereign Pages</h2>
        <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-gold hover:text-slate-900 transition-colors">
          Create New Page
        </button>
      </div>
      <div className="grid gap-4">
        {pages.sort((a,b) => a.order - b.order).map(page => (
          <div key={page.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm">
            <div>
              <div className="font-bold text-slate-900">{page.title}</div>
              <div className="text-xs text-gray-400">/{page.slug}</div>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-slate-50 text-gray-600 rounded-md text-xs font-bold hover:bg-gray-100">Edit</button>
              <button onClick={() => deletePage(page.id)} className="px-3 py-1 bg-red-50 text-red-600 rounded-md text-xs font-bold hover:bg-red-100">Archive</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDesign = () => (
    <div className="max-w-2xl space-y-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
      <h2 className="text-2xl font-serif font-bold mb-6">Identity & Aesthetics</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Imperial Blue</label>
          <div className="flex items-center space-x-3">
             <input 
              type="color" 
              value={config.primaryColor}
              onChange={(e) => updateConfig({...config, primaryColor: e.target.value})}
              className="h-10 w-10 border-0 p-0 overflow-hidden rounded-md cursor-pointer"
            />
            <span className="text-sm font-mono text-gray-500">{config.primaryColor}</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Sovereign Gold</label>
           <div className="flex items-center space-x-3">
             <input 
              type="color" 
              value={config.accentColor}
              onChange={(e) => updateConfig({...config, accentColor: e.target.value})}
              className="h-10 w-10 border-0 p-0 overflow-hidden rounded-md cursor-pointer"
            />
            <span className="text-sm font-mono text-gray-500">{config.accentColor}</span>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Platform Name</label>
        <input 
          type="text" 
          value={config.siteName}
          onChange={(e) => updateConfig({...config, siteName: e.target.value})}
          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 outline-none text-sm"
        />
      </div>

      <div className="space-y-4">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Module Visibility</label>
        <div className="flex items-center justify-between py-3 border-b border-gray-50">
          <span className="text-sm font-medium text-gray-700">Official Gazette (News)</span>
          <button 
            onClick={() => updateConfig({...config, showNews: !config.showNews})}
            className={`w-12 h-6 rounded-full transition-colors relative ${config.showNews ? 'bg-slate-900' : 'bg-gray-200'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${config.showNews ? 'left-7' : 'left-1'}`}></div>
          </button>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-gray-50">
          <span className="text-sm font-medium text-gray-700">Business Hub Spotlight</span>
          <button 
            onClick={() => updateConfig({...config, showBusinesses: !config.showBusinesses})}
            className={`w-12 h-6 rounded-full transition-colors relative ${config.showBusinesses ? 'bg-slate-900' : 'bg-gray-200'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${config.showBusinesses ? 'left-7' : 'left-1'}`}></div>
          </button>
        </div>
      </div>

      <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-gold hover:text-slate-900 transition-all">
        Save Royal Configuration
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 space-y-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gold text-slate-900 flex items-center justify-center rounded-lg text-xl font-serif font-bold">
            {config.logo}
          </div>
          <span className="font-serif font-bold text-lg tracking-tight">Imperial Admin</span>
        </div>
        
        <nav className="flex-grow space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: '🏠' },
            { id: 'pages', label: 'Pages', icon: '📄' },
            { id: 'posts', label: 'Gazette', icon: '📰' },
            { id: 'business', label: 'Businesses', icon: '💼' },
            { id: 'design', label: 'Identity', icon: '🎨' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-white/10 text-gold font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <span>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/10">
          <a href="#/" className="block text-xs text-slate-500 hover:text-white mb-4">View Live Site &rarr;</a>
          <button onClick={() => window.location.hash = '/login'} className="w-full py-2 bg-red-500/10 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition-all">
            Lock Portal
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 overflow-y-auto">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-900 capitalize">{activeTab} Management</h1>
            <p className="text-sm text-gray-400">Managing the official assets of the Sedonia Empire.</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-400 italic">Connected: High Priest Protocol</span>
            <div className="w-10 h-10 bg-slate-200 rounded-full border-2 border-white shadow-sm overflow-hidden">
               <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" />
            </div>
          </div>
        </header>

        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'pages' && renderPages()}
        {activeTab === 'design' && renderDesign()}
        {(activeTab === 'posts' || activeTab === 'business') && (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center">
             <div className="text-5xl mb-4">⚙️</div>
             <h3 className="text-xl font-serif font-bold mb-2">Module in Preparation</h3>
             <p className="text-gray-400 text-sm">The {activeTab} protocol is being calibrated for supreme efficiency.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
