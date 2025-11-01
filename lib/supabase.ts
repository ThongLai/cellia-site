import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  name: string;
  avatar_url: string | null;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
  bio: string | null;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  category: string;
  duration: string;
  role: string | null;
  tools: string[];
  image_url: string | null;
  publication: string | null;
  achievements: string[];
  order: number;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string | null;
  read_time: number;
  published: boolean;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  title: string | null;
  category: string | null;
  order: number;
  created_at: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
