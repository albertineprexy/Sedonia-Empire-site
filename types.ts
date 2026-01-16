
export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaDescription: string;
  isActive: boolean;
  order: number;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  published: boolean;
  category: string;
}

export interface BusinessListing {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  owner: string;
  website: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  avatar: string;
}

export interface SiteConfig {
  siteName: string;
  primaryColor: string;
  accentColor: string;
  logo: string;
  heroHeadline: string;
  heroSubheadline: string;
  showNews: boolean;
  showBusinesses: boolean;
  showTestimonials: boolean;
  contactEmail: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
}

export interface FormSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export type ViewType = 'public' | 'admin';
