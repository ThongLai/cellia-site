'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User, CheckCircle2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AnimatedSection from '@/components/AnimatedSection';
import { supabase, Project } from '@/lib/supabase';

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      fetchProject(params.slug as string);
    }
  }, [params.slug]);

  const fetchProject = async (slug: string) => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();
    if (data) setProject(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-turquoise-500"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Project not found</h1>
          <Button asChild>
            <Link href="/portfolio">Back to Portfolio</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative py-12 bg-gradient-to-br from-turquoise-200 via-pink-100 to-lavender-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Button
              asChild
              variant="ghost"
              className="mb-6 hover:bg-white/50"
            >
              <Link href="/portfolio">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Link>
            </Button>

            <div className="mb-6">
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-turquoise-600 shadow-md">
                {project.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              <span className="text-gradient">{project.title}</span>
            </h1>

            <div className="flex flex-wrap gap-6 text-gray-700">
              {project.role && (
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-turquoise-500" />
                  <span>{project.role}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-turquoise-500" />
                <span>{project.duration}</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <AnimatedSection>
                <Card className="p-8 rounded-3xl border-2 border-turquoise-100">
                  <h2 className="text-2xl font-semibold mb-4 text-gradient">
                    Project Overview
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {project.description}
                  </p>
                </Card>
              </AnimatedSection>

              {project.achievements && project.achievements.length > 0 && (
                <AnimatedSection delay={0.1}>
                  <Card className="p-8 rounded-3xl border-2 border-turquoise-100">
                    <h2 className="text-2xl font-semibold mb-6 text-gradient">
                      Key Achievements
                    </h2>
                    <ul className="space-y-4">
                      {project.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-turquoise-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </AnimatedSection>
              )}

              {project.publication && (
                <AnimatedSection delay={0.2}>
                  <Card className="p-8 rounded-3xl border-2 border-pink-100 bg-pink-50/50">
                    <div className="flex items-start gap-4">
                      <FileText className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Publication / Citation
                        </h3>
                        <p className="text-gray-700 text-sm italic">
                          {project.publication}
                        </p>
                      </div>
                    </div>
                  </Card>
                </AnimatedSection>
              )}
            </div>

            <div className="space-y-6">
              <AnimatedSection delay={0.1}>
                <Card className="p-6 rounded-3xl border-2 border-turquoise-100 sticky top-24">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Tools & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-2 bg-turquoise-50 text-turquoise-600 rounded-full text-sm font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
