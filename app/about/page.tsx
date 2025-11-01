'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Award, GraduationCap, Briefcase, Code2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import AnimatedSection from '@/components/AnimatedSection';
import { supabase, Profile } from '@/lib/supabase';

const education = [
  {
    school: 'Manchester Metropolitan University',
    degree: 'MSc Engineering Project Management',
    period: '2025 - Present',
    status: 'Current',
    location: 'Manchester, UK',
  },
  {
    school: 'University of Huddersfield',
    degree: 'BSc(Hons) Construction Project Management',
    period: '2023 - 2025',
    location: 'Huddersfield, UK',
  },
  {
    school: 'Hanoi University of Civil Engineering',
    degree: 'Economic Construction',
    period: '2019 - 2023',
    location: 'Hanoi, Vietnam',
    gpa: '7.45/10',
  },
];

const awards = [
  {
    title: 'Student with 5 Merits',
    level: 'Province Level',
    year: '2021',
    icon: Award,
  },
  {
    title: 'Debate Competition',
    level: 'Third Place',
    year: '2022-2023',
    icon: Award,
  },
  {
    title: 'Outstanding Individual',
    level: 'Recognition',
    year: 'January 2023',
    icon: Award,
  },
  {
    title: 'Professional Certifications',
    level: 'Multiple Qualifications',
    year: '2023',
    icon: Award,
  },
];

const skills = {
  software: [
    'Microsoft Project',
    'Primavera P6',
    'AutoCAD',
    'Revit',
    'BIM 360',
    'Navisworks',
  ],
  projectManagement: [
    'PMBOK',
    'Agile',
    'Risk Management',
    'Cost Estimation',
    'Scheduling',
    'Stakeholder Management',
  ],
  technical: [
    'Construction Planning',
    'Quality Control',
    'Contract Management',
    'Health & Safety',
    'Sustainable Design',
    'Value Engineering',
  ],
};

export default function AboutPage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data } = await supabase.from('profile').select('*').single();
    if (data) setProfile(data);
  };

  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-turquoise-200 via-pink-100 to-lavender-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-center mb-6">
              <span className="text-gradient">About Me</span>
            </h1>
            <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto">
              Passionate about transforming the built environment through innovative project management and sustainable practices
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                {profile?.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt="Cellia"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-turquoise-300 via-pink-300 to-lavender-300 flex items-center justify-center">
                    <span className="text-9xl font-serif text-white">C</span>
                  </div>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="text-4xl font-serif font-bold mb-6 text-gradient">
                Professional Journey
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  {profile?.bio ||
                    'Passionate Engineering Project Management professional with expertise in construction project management, BIM technologies, and sustainable urban development.'}
                </p>
                <p>
                  Currently pursuing an MSc in Engineering Project Management at Manchester Metropolitan University, I bring a strong foundation in construction management from my BSc(Hons) degree at the University of Huddersfield and extensive experience in economic construction from Hanoi University.
                </p>
                <p>
                  My expertise spans project planning, BIM technologies, construction economics, and sustainable development. I'm committed to delivering innovative solutions that balance technical excellence, environmental responsibility, and stakeholder value.
                </p>
                <p>
                  Throughout my academic and professional journey, I've developed a deep understanding of modern construction practices, project delivery methods, and the integration of digital technologies in the built environment.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-turquoise-50 via-pink-50 to-lavender-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">
              <span className="text-gradient">Education</span>
            </h2>
          </AnimatedSection>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <Card className="p-6 rounded-3xl border-2 border-white bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-turquoise-300 to-pink-300 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {edu.school}
                        </h3>
                        {edu.status && (
                          <span className="inline-block px-3 py-1 bg-turquoise-100 text-turquoise-600 rounded-full text-sm font-medium mt-2 md:mt-0">
                            {edu.status}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 font-medium mb-1">
                        {edu.degree}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>{edu.period}</span>
                        <span>•</span>
                        <span>{edu.location}</span>
                        {edu.gpa && (
                          <>
                            <span>•</span>
                            <span>GPA: {edu.gpa}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">
              <span className="text-gradient">Skills & Expertise</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <Card className="p-6 rounded-3xl border-2 border-turquoise-100 hover:shadow-xl transition-all h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Code2 className="w-8 h-8 text-turquoise-500" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Software & Tools
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.software.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-turquoise-50 text-turquoise-600 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <Card className="p-6 rounded-3xl border-2 border-pink-100 hover:shadow-xl transition-all h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="w-8 h-8 text-pink-400" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Project Management
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.projectManagement.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <Card className="p-6 rounded-3xl border-2 border-lavender-100 hover:shadow-xl transition-all h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-8 h-8 text-lavender-300" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Technical Skills
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.technical.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-lavender-50 text-lavender-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-turquoise-50 via-pink-50 to-lavender-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">
              <span className="text-gradient">Honours & Awards</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <Card className="p-6 text-center rounded-3xl border-2 border-white bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-2 h-full">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-turquoise-300 to-pink-300 flex items-center justify-center">
                    <award.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {award.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">{award.level}</p>
                  <p className="text-xs text-gray-500">{award.year}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
