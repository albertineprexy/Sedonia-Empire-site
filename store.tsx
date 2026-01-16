
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Page, Post, BusinessListing, Testimonial, SiteConfig, FormSubmission } from './types';

interface CMSContextType {
  pages: Page[];
  posts: Post[];
  businesses: BusinessListing[];
  testimonials: Testimonial[];
  config: SiteConfig;
  submissions: FormSubmission[];
  updateConfig: (config: SiteConfig) => void;
  updatePage: (page: Page) => void;
  deletePage: (id: string) => void;
  updatePost: (post: Post) => void;
  deletePost: (id: string) => void;
  updateBusiness: (biz: BusinessListing) => void;
  deleteBusiness: (id: string) => void;
  addSubmission: (sub: Omit<FormSubmission, 'id' | 'date'>) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pages, setPages] = useState<Page[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [businesses, setBusinesses] = useState<BusinessListing[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [config, setConfig] = useState<SiteConfig>({
    siteName: 'Sedonia',
    primaryColor: '#002366',
    accentColor: '#D4AF37',
    logo: 'S',
    heroHeadline: 'The Sovereign Standard of Excellence',
    heroSubheadline: 'Leading a global legacy of culture, governance, and prosperity for the visionary citizen.',
    showNews: true,
    showBusinesses: true,
    showTestimonials: true,
    contactEmail: 'protocol@sedonia.empire',
    socialLinks: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      linkedin: '#'
    }
  });
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);

  useEffect(() => {
    // Initial Seed Data
    const initialPages: Page[] = [
      { id: '1', title: 'Home', slug: 'home', content: '', metaDescription: 'The gateway to the Sedonia empire.', isActive: true, order: 1 },
      { id: '2', title: 'About Sedonia', slug: 'about', content: 'Sedonia is a noble institution established to uphold the highest standards of human civilization...', metaDescription: 'Learn about our heritage.', isActive: true, order: 2 },
      { id: '3', title: 'Vision & Mission', slug: 'vision', content: 'Our vision is to build an interconnected global community of excellence...', metaDescription: 'Our strategic mission pillars.', isActive: true, order: 3 },
      { id: '4', title: 'The Queen', slug: 'the-queen', content: 'Her Majesty represents the pinnacle of wisdom, authority, and stewardship...', metaDescription: 'Meet the symbol of our leadership.', isActive: true, order: 4 },
      { id: '5', title: 'Governance & Diplomacy', slug: 'governance', content: 'Our governance philosophy is built on structured excellence and international cooperation...', metaDescription: 'Statesmanlike leadership frameworks.', isActive: true, order: 5 },
      { id: '6', title: 'Business Hub', slug: 'business-hub', content: 'Empowering the entrepreneurs of our sovereign platform...', metaDescription: 'Global economic expansion.', isActive: true, order: 6 },
    ];

    const initialPosts: Post[] = [
      { id: '1', title: 'Sedonia Summit 2024 Announced', slug: 'summit-2024', excerpt: 'The world gathers to discuss the future of diplomatic governance.', content: 'Full content here...', image: 'https://picsum.photos/800/400?random=1', date: '2024-05-15', published: true, category: 'Announcements' },
      { id: '2', title: 'Cultural Heritage Initiative Launched', slug: 'heritage-init', excerpt: 'Preserving the timeless traditions of our global community.', content: 'Full content here...', image: 'https://picsum.photos/800/400?random=2', date: '2024-05-10', published: true, category: 'Culture' },
    ];

    const initialBiz: BusinessListing[] = [
      { id: '1', name: 'Aurelian Logistics', category: 'Finance', description: 'Global asset management with royal integrity.', image: 'https://picsum.photos/400/300?random=10', owner: 'Marcus Aurelius', website: 'https://example.com' },
      { id: '2', name: 'Elite Diplomatic Solutions', category: 'Consulting', description: 'Strategic advisory for world-class leaders.', image: 'https://picsum.photos/400/300?random=11', owner: 'Elara Vance', website: 'https://example.com' },
    ];

    const initialTestimonials: Testimonial[] = [
      { id: '1', author: 'Dr. Julian Thorne', role: 'Global Strategist', content: 'Sedonia is more than a platform; it is a standard of being. The order and excellence here are unparalleled.', avatar: 'https://i.pravatar.cc/150?u=1' },
      { id: '2', author: 'Elena Rodriguez', role: 'Entrepreneur', content: 'Through the Business Hub, my enterprise has found a home among like-minded visionaries.', avatar: 'https://i.pravatar.cc/150?u=2' },
    ];

    setPages(initialPages);
    setPosts(initialPosts);
    setBusinesses(initialBiz);
    setTestimonials(initialTestimonials);
  }, []);

  const updateConfig = (newConfig: SiteConfig) => setConfig(newConfig);

  const updatePage = (page: Page) => {
    setPages(prev => {
      const exists = prev.find(p => p.id === page.id);
      if (exists) return prev.map(p => p.id === page.id ? page : p);
      return [...prev, page];
    });
  };

  const deletePage = (id: string) => setPages(prev => prev.filter(p => p.id !== id));

  const updatePost = (post: Post) => {
    setPosts(prev => {
      const exists = prev.find(p => p.id === post.id);
      if (exists) return prev.map(p => p.id === post.id ? post : p);
      return [...prev, post];
    });
  };

  const deletePost = (id: string) => setPosts(prev => prev.filter(p => p.id !== id));

  const updateBusiness = (biz: BusinessListing) => {
    setBusinesses(prev => {
      const exists = prev.find(b => b.id === biz.id);
      if (exists) return prev.map(b => b.id === biz.id ? biz : b);
      return [...prev, biz];
    });
  };

  const deleteBusiness = (id: string) => setBusinesses(prev => prev.filter(b => b.id !== id));

  const addSubmission = (sub: Omit<FormSubmission, 'id' | 'date'>) => {
    setSubmissions(prev => [
      ...prev,
      { ...sub, id: Date.now().toString(), date: new Date().toISOString() }
    ]);
  };

  return (
    <CMSContext.Provider value={{
      pages, posts, businesses, testimonials, config, submissions,
      updateConfig, updatePage, deletePage, updatePost, deletePost,
      updateBusiness, deleteBusiness, addSubmission
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) throw new Error('useCMS must be used within CMSProvider');
  return context;
};
