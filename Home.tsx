
import React from 'react';
import { useCMS } from '../../store';

const Home: React.FC = () => {
  const { config, testimonials, businesses, posts } = useCMS();

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          <img 
            src="https://picsum.photos/1920/1080?random=1" 
            alt="Palace Backdrop" 
            className="w-full h-full object-cover opacity-50 grayscale"
          />
          <div className="absolute inset-0 royal-gradient opacity-60"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 bg-gold/20 border border-gold/30 rounded-full text-[10px] tracking-[0.4em] uppercase font-bold text-[#D4AF37] mb-6">
              Noble Institution
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
              {config.heroHeadline}
            </h1>
            <p className="text-xl text-slate-200 mb-10 leading-relaxed font-light">
              {config.heroSubheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#/join" className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-gold transition-all text-center">
                Join the Platform
              </a>
              <a href="#/about" className="px-8 py-4 border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all text-center">
                Explore Our Legacy
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Global Citizens', value: '12K+' },
              { label: 'Diplomatic Pillars', value: '45' },
              { label: 'Citizen Businesses', value: '850+' },
              { label: 'Cultural Assets', value: '2.4B' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-serif font-bold mb-1" style={{ color: config.primaryColor }}>{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Pillars */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4" style={{ color: config.primaryColor }}>The Pillars of Sedonia</h2>
            <div className="w-16 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-500">We anchor our community in five strategic disciplines that define sovereign prosperity and international leadership.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Governance', desc: 'A structured leadership framework prioritizing order, ethics, and strategic foresight.', icon: '🏛️' },
              { title: 'Diplomacy', desc: 'Building bridges of high-level engagement and mutual global prosperity.', icon: '🤝' },
              { title: 'Culture', desc: 'Preserving heritage while fostering an environment of contemporary excellence.', icon: '🎭' },
              { title: 'Prosperity', desc: 'Dedicated to economic empowerment through strategic enterprise and capital growth.', icon: '⚖️' },
              { title: 'Enterprise', desc: 'A hub for citizen-owned businesses to thrive in a protected, noble ecosystem.', icon: '🏢' },
              { title: 'Leadership', desc: 'Mentoring the next generation of global stewards with wisdom and integrity.', icon: '👑' },
            ].map((pillar, i) => (
              <div key={i} className="bg-white p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition-all group">
                <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{pillar.icon}</div>
                <h3 className="text-xl font-serif font-bold mb-3">{pillar.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Citizens Spotlight (Business) */}
      {config.showBusinesses && (
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-4xl font-serif font-bold mb-2" style={{ color: config.primaryColor }}>Citizen Enterprises</h2>
                <p className="text-gray-500">The driving economic force of the Sedonia platform.</p>
              </div>
              <a href="#/business-hub" className="text-sm font-bold text-gold hover:text-[#B8860B] border-b border-gold/30 pb-1">
                View Full Directory &rarr;
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {businesses.slice(0, 3).map((biz) => (
                <div key={biz.id} className="group relative bg-slate-50 rounded-2xl overflow-hidden border border-gray-100">
                  <div className="h-56 overflow-hidden">
                    <img src={biz.image} alt={biz.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <div className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">{biz.category}</div>
                    <h3 className="text-xl font-serif font-bold mb-2">{biz.name}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{biz.description}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <span className="text-xs font-semibold text-gray-400">By {biz.owner}</span>
                      <a href={biz.website} target="_blank" className="text-xs font-bold text-slate-900 group-hover:text-gold">Visit Asset &rarr;</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured News */}
      {config.showNews && (
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold mb-4" style={{ color: config.primaryColor }}>The Official Gazette</h2>
              <p className="text-gray-500">Updates, announcements, and insights from the crown.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {posts.slice(0, 2).map(post => (
                <article key={post.id} className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="sm:w-1/2 aspect-video sm:aspect-square rounded-2xl overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="sm:w-1/2 flex flex-col justify-center">
                    <time className="text-xs text-gray-400 mb-2">{post.date}</time>
                    <h3 className="text-2xl font-serif font-bold mb-3 hover:text-gold transition-colors">
                      <a href={`#/news/${post.slug}`}>{post.title}</a>
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    <a href={`#/news/${post.slug}`} className="text-xs font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                      Read Dispatch <span className="text-gold">→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Block */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12" style={{ color: config.primaryColor }}>Frequent Diplomatic Inquiries</h2>
          <div className="space-y-6">
            {[
              { q: 'How does one gain citizenship on the Sedonia platform?', a: 'Citizenship is an invitation-based or application-reviewed process for individuals who demonstrate excellence in their respective fields.' },
              { q: 'What are the benefits of the Business Hub?', a: 'The Hub provides premium visibility, strategic networking with global leaders, and access to the sovereign economic network.' },
              { q: 'Is Sedonia a political entity?', a: 'Sedonia is a cultural and institutional authority focused on governance philosophies and socio-economic empowerment, transcending traditional political boundaries.' }
            ].map((faq, i) => (
              <div key={i} className="border-b border-gray-100 pb-6">
                <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 royal-gradient opacity-90"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">Ascend to the Sovereign Standard</h2>
          <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto font-light">
            Become part of a structured community that values heritage, integrity, and the strategic expansion of prosperity.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#/join" className="px-10 py-5 bg-gold text-slate-900 font-bold rounded-full hover:bg-white transition-all shadow-lg">
              Apply for Citizenship
            </a>
            <a href="#/contact" className="px-10 py-5 border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all">
              Diplomatic Contact
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
