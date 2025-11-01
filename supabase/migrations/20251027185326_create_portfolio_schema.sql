/*
  # Portfolio Website Database Schema

  1. New Tables
    - `profile`
      - `id` (uuid, primary key)
      - `name` (text)
      - `avatar_url` (text) - Avatar image URL
      - `email` (text)
      - `phone` (text)
      - `linkedin` (text)
      - `github` (text)
      - `location` (text)
      - `bio` (text)
      - `updated_at` (timestamptz)

    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `excerpt` (text)
      - `category` (text) - Academic, Field Studies, Technical Reports
      - `duration` (text)
      - `role` (text)
      - `tools` (text[])
      - `image_url` (text)
      - `publication` (text)
      - `achievements` (text[])
      - `order` (integer)
      - `created_at` (timestamptz)

    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `excerpt` (text)
      - `content` (text)
      - `category` (text) - Engineering, BIM, Project Insights, Career Journey
      - `image_url` (text)
      - `read_time` (integer) - in minutes
      - `published` (boolean)
      - `created_at` (timestamptz)

    - `gallery_images`
      - `id` (uuid, primary key)
      - `image_url` (text)
      - `title` (text)
      - `category` (text)
      - `order` (integer)
      - `created_at` (timestamptz)

    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for profile, projects, blog_posts, gallery_images
    - Authenticated write access for content management
    - Public insert for contact_messages
*/

-- Profile table
CREATE TABLE IF NOT EXISTS profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Cellia',
  avatar_url text,
  email text DEFAULT 'uyenchuong92@gmail.com',
  phone text DEFAULT '+44 (0)7763464065',
  linkedin text DEFAULT 'linkedin.com/in/uyen-chuong',
  github text DEFAULT 'github.com/UyenChuongNguyen',
  location text DEFAULT 'Manchester, UK',
  bio text,
  updated_at timestamptz DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  excerpt text NOT NULL,
  category text NOT NULL,
  duration text NOT NULL,
  role text,
  tools text[] DEFAULT '{}',
  image_url text,
  publication text,
  achievements text[] DEFAULT '{}',
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  image_url text,
  read_time integer DEFAULT 5,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  title text,
  category text,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Profile policies (public read, authenticated write)
CREATE POLICY "Anyone can view profile"
  ON profile FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update profile"
  ON profile FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Projects policies (public read, authenticated write)
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Blog posts policies (public read published posts)
CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authenticated users can manage blog posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Gallery policies (public read, authenticated write)
CREATE POLICY "Anyone can view gallery images"
  ON gallery_images FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage gallery"
  ON gallery_images FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Contact messages policies (public insert, authenticated read)
CREATE POLICY "Anyone can send contact messages"
  ON contact_messages FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

-- Insert default profile
INSERT INTO profile (name, bio) VALUES (
  'Cellia',
  'Passionate Engineering Project Management professional with expertise in construction project management, BIM technologies, and sustainable urban development. Currently pursuing MSc in Engineering Project Management at Manchester Metropolitan University.'
) ON CONFLICT DO NOTHING;

-- Insert initial projects
INSERT INTO projects (title, slug, description, excerpt, category, duration, role, tools, publication, achievements, "order") VALUES
(
  'Health Innovation Campus Development',
  'health-innovation-campus',
  'Led the comprehensive project management of a 7-story WELL-certified Health Innovation Campus. The project encompassed detailed planning, resource allocation, logistics coordination, and timeline management for a 275-day construction period. Successfully coordinated multiple stakeholders including contractors, suppliers, and university representatives to deliver a state-of-the-art facility promoting health and wellbeing.',
  'Managed 7-story WELL-certified building project with 275-day timeline',
  'Academic',
  'September 2023 - April 2024',
  'Construction Project Manager',
  ARRAY['Project Management', 'Construction Planning', 'Logistics Coordination', 'Stakeholder Management', 'WELL Certification'],
  '[P.1] Nguyen, N. U. C. (2024). Health Innovation Campus: Project Management Case Study. University of Huddersfield.',
  ARRAY['Successfully delivered project within 275-day timeline', 'Achieved WELL Building Standard certification', 'Coordinated 15+ stakeholder groups', 'Implemented sustainable construction practices'],
  1
),
(
  'Construction Labor Norms Development',
  'construction-norms-development',
  'Conducted comprehensive research to develop standardized labor norms for panel assembly operations using CKY101 tower cranes. The study involved extensive field data collection, statistical analysis, and time-motion studies to establish optimal work standards. Results contributed to improved productivity estimation and resource planning in construction projects.',
  'Developed standardized labor norms for panel assembly with CKY101 tower crane',
  'Technical Reports',
  'February - May 2022',
  'Research Assistant',
  ARRAY['Data Analysis', 'Statistical Methods', 'Time-Motion Study', 'Construction Engineering', 'Technical Documentation'],
  'Research supervised by Dr. Nguyen Lien Huong, Hanoi University of Civil Engineering',
  ARRAY['Published technical standards adopted by construction firms', 'Improved productivity estimation accuracy by 23%', 'Developed comprehensive data collection methodology'],
  2
),
(
  'Investment Economics Analysis for Villa Development',
  'villa-investment-analysis',
  'Performed detailed economic feasibility analysis for a residential villa development project. Applied advanced financial modeling techniques including NPV, IRR, and sensitivity analysis to evaluate investment viability. The analysis encompassed market research, cost estimation, revenue projections, and risk assessment, resulting in actionable recommendations for project stakeholders.',
  'Economic feasibility study achieving NPV of $172,040M VND and IRR of 20.08%',
  'Technical Reports',
  'February - June 2022',
  'Economic Analyst',
  ARRAY['Financial Modeling', 'NPV Analysis', 'IRR Calculation', 'Sensitivity Analysis', 'Market Research', 'Risk Assessment'],
  'Research supervised by Prof. Nguyen Nhu Phien, Hanoi University of Civil Engineering',
  ARRAY['Identified viable investment opportunity with 20.08% IRR', 'Conducted comprehensive risk analysis', 'Delivered actionable financial recommendations'],
  3
),
(
  'Ecopark Ecological Urban Development Study',
  'ecopark-field-study',
  'Participated in comprehensive field study of Ecopark, a 500-hectare ecological urban development project. Analyzed sustainable urban planning strategies, green infrastructure implementation, and community design principles. The study provided valuable insights into integrated urban development approaches combining residential, commercial, and recreational facilities with environmental conservation.',
  'Field research on 500-hectare ecological urban development project',
  'Field Studies',
  'May 2022',
  'Research Team Member',
  ARRAY['Urban Planning Analysis', 'Sustainable Development', 'Field Research', 'Environmental Assessment', 'Documentation'],
  'Field Study Report, Hanoi University of Civil Engineering',
  ARRAY['Analyzed sustainable urban planning strategies', 'Documented green infrastructure systems', 'Contributed to comprehensive development assessment'],
  4
)
ON CONFLICT (slug) DO NOTHING;