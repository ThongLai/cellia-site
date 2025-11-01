'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import AnimatedSection from '@/components/AnimatedSection';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'Message sent!',
          description: 'Thank you for reaching out. I will get back to you soon.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'uyenchuong92@gmail.com',
      href: 'mailto:uyenchuong92@gmail.com',
      color: 'from-turquoise-300 to-turquoise-400',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+44 (0)7763464065',
      href: 'tel:+447763464065',
      color: 'from-pink-300 to-pink-400',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Manchester, UK',
      color: 'from-lavender-300 to-purple-400',
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'linkedin.com/in/uyen-chuong',
      href: 'https://linkedin.com/in/uyen-chuong',
      color: 'from-blue-300 to-blue-400',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-turquoise-200 via-pink-100 to-lavender-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-center mb-6">
              <span className="text-gradient">Get In Touch</span>
            </h1>
            <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <Card className="p-8 rounded-3xl border-2 border-turquoise-100">
                <h2 className="text-3xl font-serif font-bold mb-6 text-gradient">
                  Send a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-2 rounded-xl border-2 border-turquoise-100 focus:border-turquoise-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-2 rounded-xl border-2 border-turquoise-100 focus:border-turquoise-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="mt-2 rounded-xl border-2 border-turquoise-100 focus:border-turquoise-500"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="mt-2 rounded-xl border-2 border-turquoise-100 focus:border-turquoise-500"
                      placeholder="Tell me about your project or inquiry..."
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-turquoise-500 to-pink-400 hover:from-turquoise-600 hover:to-pink-500 text-white rounded-full py-6 text-lg"
                  >
                    {loading ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </AnimatedSection>

            <div className="space-y-6">
              <AnimatedSection delay={0.1}>
                <h2 className="text-3xl font-serif font-bold mb-6 text-gradient">
                  Contact Information
                </h2>
              </AnimatedSection>

              {contactInfo.map((info, index) => (
                <AnimatedSection key={info.title} delay={0.2 + index * 0.1}>
                  <Card className="p-6 rounded-3xl border-2 border-white bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-full bg-gradient-to-br ${info.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <info.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {info.title}
                        </h3>
                        {info.href ? (
                          <a
                            href={info.href}
                            target={info.href.startsWith('http') ? '_blank' : undefined}
                            rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-gray-600 hover:text-turquoise-600 transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-600">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                </AnimatedSection>
              ))}

              <AnimatedSection delay={0.6}>
                <Card className="p-8 rounded-3xl border-2 border-turquoise-100 bg-gradient-to-br from-turquoise-50 to-pink-50">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Let's Connect
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Feel free to reach out for collaborations, project inquiries, or just to say hello!
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://linkedin.com/in/uyen-chuong"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg hover:scale-110 transition-all"
                    >
                      <Linkedin className="w-6 h-6 text-turquoise-500" />
                    </a>
                    <a
                      href="https://github.com/UyenChuongNguyen"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg hover:scale-110 transition-all"
                    >
                      <Github className="w-6 h-6 text-turquoise-500" />
                    </a>
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
