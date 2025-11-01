'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/AnimatedSection';
import { supabase, Project } from '@/lib/supabase';

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('order', { ascending: true });
    if (data) setProjects(data);
  };

  const categories = ['All', 'Academic', 'Field Studies', 'Technical Reports'];

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-turquoise-200 via-pink-100 to-lavender-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-center mb-6">
              <span className="text-gradient">Portfolio</span>
            </h1>
            <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto">
              A collection of academic projects, field studies, and technical reports showcasing my expertise in engineering project management
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.1}>
                <Link href={`/portfolio/${project.slug}`}>
                  <Card className="group overflow-hidden rounded-3xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-turquoise-100 h-full">
                    <div className="relative h-64 bg-gradient-to-br from-turquoise-100 to-pink-100">
                      {project.image_url ? (
                        <Image
                          src={project.image_url}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Briefcase className="w-20 h-20 text-turquoise-300" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-turquoise-600 shadow-md">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold mb-2 text-gray-900 group-hover:text-turquoise-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {project.duration}
                      </p>
                      {project.role && (
                        <p className="text-sm text-turquoise-600 font-medium mb-3">
                          {project.role}
                        </p>
                      )}
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {project.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tools.slice(0, 4).map((tool) => (
                          <span
                            key={tool}
                            className="px-3 py-1 bg-turquoise-50 text-turquoise-600 rounded-full text-xs"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
