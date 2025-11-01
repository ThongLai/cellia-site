'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/AnimatedSection';

const placeholderPosts = [
  {
    id: 1,
    title: 'Getting Started with BIM in Construction Projects',
    slug: 'getting-started-bim',
    excerpt:
      'Explore the fundamentals of Building Information Modeling and how it revolutionizes modern construction management.',
    category: 'BIM',
    readTime: 8,
    date: '2024-03-15',
    imageColor: 'from-turquoise-300 to-blue-400',
  },
  {
    id: 2,
    title: 'Essential Project Management Skills for Engineers',
    slug: 'project-management-skills',
    excerpt:
      'Discover the key competencies every engineering project manager needs to successfully deliver complex projects.',
    category: 'Project Insights',
    readTime: 6,
    date: '2024-03-10',
    imageColor: 'from-pink-300 to-rose-400',
  },
  {
    id: 3,
    title: 'Sustainable Construction: Future Trends',
    slug: 'sustainable-construction-trends',
    excerpt:
      'An overview of emerging sustainable practices transforming the construction industry towards a greener future.',
    category: 'Engineering',
    readTime: 10,
    date: '2024-03-05',
    imageColor: 'from-green-300 to-emerald-400',
  },
  {
    id: 4,
    title: 'My Journey to Manchester Metropolitan University',
    slug: 'journey-to-mmu',
    excerpt:
      'Reflections on transitioning from BSc to MSc and what I learned along the way in my academic career.',
    category: 'Career Journey',
    readTime: 5,
    date: '2024-03-01',
    imageColor: 'from-lavender-200 to-purple-400',
  },
  {
    id: 5,
    title: 'Advanced Cost Estimation Techniques',
    slug: 'cost-estimation-techniques',
    excerpt:
      'Deep dive into modern cost estimation methods and tools used in contemporary construction projects.',
    category: 'Project Insights',
    readTime: 12,
    date: '2024-02-25',
    imageColor: 'from-turquoise-300 to-cyan-400',
  },
  {
    id: 6,
    title: 'Risk Management in Large-Scale Projects',
    slug: 'risk-management-projects',
    excerpt:
      'Strategies and frameworks for identifying, assessing, and mitigating risks in complex construction projects.',
    category: 'Project Insights',
    readTime: 9,
    date: '2024-02-20',
    imageColor: 'from-orange-300 to-red-400',
  },
  {
    id: 7,
    title: 'Digital Transformation in Construction',
    slug: 'digital-transformation',
    excerpt:
      'How digital technologies are reshaping traditional construction processes and creating new opportunities.',
    category: 'Engineering',
    readTime: 7,
    date: '2024-02-15',
    imageColor: 'from-blue-300 to-indigo-400',
  },
  {
    id: 8,
    title: 'Lessons from the Health Innovation Campus Project',
    slug: 'health-campus-lessons',
    excerpt:
      'Key takeaways and insights gained from managing a WELL-certified building project.',
    category: 'Project Insights',
    readTime: 11,
    date: '2024-02-10',
    imageColor: 'from-pink-300 to-purple-400',
  },
];

export default function BlogPage() {
  const [filter, setFilter] = useState<string>('All');

  const categories = [
    'All',
    'Engineering',
    'BIM',
    'Project Insights',
    'Career Journey',
  ];

  const filteredPosts =
    filter === 'All'
      ? placeholderPosts
      : placeholderPosts.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-turquoise-200 via-pink-100 to-lavender-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-center mb-6">
              <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto">
              Insights, stories, and knowledge from my journey in engineering
              project management
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setFilter(category)}
                  variant={filter === category ? 'default' : 'outline'}
                  className={`rounded-full ${
                    filter === category
                      ? 'bg-turquoise-500 hover:bg-turquoise-600 text-white'
                      : 'border-2 border-turquoise-200 text-gray-700 hover:bg-turquoise-50'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <AnimatedSection key={post.id} delay={index * 0.1}>
                <Link href={`/blog/${post.slug}`}>
                  <Card className="group overflow-hidden rounded-3xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-turquoise-100 h-full flex flex-col">
                    <div
                      className={`relative h-48 bg-gradient-to-br ${post.imageColor} flex items-center justify-center`}
                    >
                      <BookOpen className="w-16 h-16 text-white opacity-50" />
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-turquoise-50 text-turquoise-600 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-turquoise-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime} min</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No posts found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
