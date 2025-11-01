'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic'; // For loading with options (used on `FloatingParticles`)

import { motion } from 'framer-motion';
import {
  Download,
  ArrowRight,
  Mail,
  Briefcase,
  Code,
  Award,
  Upload,
  Camera,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';


import AnimatedSection from '@/components/AnimatedSection';

const FloatingParticles = dynamic(
  () => import('@/components/FloatingParticles'),
  { ssr: false }  // ← Skip server-side rendering for this component (because the bubble should be rendered only on client side)
);

import { supabase, Profile, Project } from '@/lib/supabase';
import { useDropzone } from 'react-dropzone';

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchProjects();
  }, []);

  const fetchProfile = async () => {
    const { data } = await supabase.from('profile').select('*').single();
    if (data) setProfile(data);
  };

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('order', { ascending: true })
      .limit(3);
    if (data) setProjects(data);
  };

  const onDrop = async (acceptedFiles: File[]) => {
    if (!acceptedFiles.length || !profile) return;

    const file = acceptedFiles[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `avatar-${Date.now()}.${fileExt}`;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;

      const { error } = await supabase
        .from('profile')
        .update({ avatar_url: base64 })
        .eq('id', profile.id);

      if (!error) {
        setProfile({ ...profile, avatar_url: base64 });
        setIsEditingAvatar(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] },
    maxFiles: 1,
  });

  const skills = [
    { name: 'Project Management', icon: Briefcase },
    { name: 'BIM Technologies', icon: Code },
    { name: 'Construction Planning', icon: Award },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-turquoise-200 via-pink-100 to-lavender-200">
        <FloatingParticles />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-block relative"
            onMouseEnter={() => setIsEditingAvatar(true)}
            onMouseLeave={() => setIsEditingAvatar(false)}
          >
            <div className="relative w-48 h-48 mx-auto">
              {profile?.avatar_url ? (
                <Image
                  src={profile.avatar_url}
                  alt="Cellia"
                  fill
                  className="rounded-full object-cover border-4 border-white shadow-2xl"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-turquoise-300 to-pink-300 border-4 border-white shadow-2xl flex items-center justify-center">
                  <span className="text-6xl font-serif text-white">C</span>
                </div>
              )}

              {isEditingAvatar && (
                <div
                  className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center cursor-pointer"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <Upload className="w-12 h-12 text-white" />
                  ) : (
                    <Camera className="w-12 h-12 text-white" />
                  )}
                </div>
              )}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-serif font-bold text-gray-900 mb-4"
          >
            <span className="text-gradient">Cellia</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-xl md:text-2xl text-gray-700 font-medium">
              Engineering Project Management Professional | BIM Specialist
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-turquoise-500 hover:bg-turquoise-600 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/portfolio">
                View Portfolio <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-turquoise-500 text-turquoise-600 hover:bg-turquoise-50 rounded-full px-8 py-6 text-lg"
            >
              <a href="/cv.pdf" download>
                <Download className="mr-2 w-5 h-5" />
                Download CV
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 rounded-full px-8 py-6 text-lg"
            >
              <Link href="/contact">
                <Mail className="mr-2 w-5 h-5" />
                Contact
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4">
              <span className="text-gradient">Featured Projects</span>
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Explore my recent work in engineering project management, construction planning, and sustainable development.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.1}>
                <Link href={`/portfolio/${project.slug}`}>
                  <Card className="group overflow-hidden rounded-3xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-turquoise-100">
                    <div className="relative h-48 bg-gradient-to-br from-turquoise-100 to-pink-100">
                      {project.image_url ? (
                        <Image
                          src={project.image_url}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Briefcase className="w-16 h-16 text-turquoise-300" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-turquoise-600">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-turquoise-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {project.duration}
                      </p>
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {project.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tools.slice(0, 3).map((tool) => (
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

          <AnimatedSection delay={0.4} className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-turquoise-500 text-turquoise-600 hover:bg-turquoise-50 rounded-full px-8"
            >
              <Link href="/portfolio">
                View All Projects <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-turquoise-50 via-pink-50 to-lavender-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">
              <span className="text-gradient">Core Competencies</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <AnimatedSection key={skill.name} delay={index * 0.1}>
                <Card className="p-8 text-center rounded-3xl border-2 border-white bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-2">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-turquoise-300 to-pink-300 flex items-center justify-center">
                    <skill.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {skill.name}
                  </h3>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              <span className="text-gradient">Let's Work Together</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Interested in collaborating on your next project? Get in touch!
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-turquoise-500 to-pink-400 hover:from-turquoise-600 hover:to-pink-500 text-white rounded-full px-12 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/contact">
                Contact Me <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
