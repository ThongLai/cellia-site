import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Github, Heart } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
];

const latestPosts = [
  { title: 'Getting Started with BIM', href: '/blog' },
  { title: 'Project Management Tips', href: '/blog' },
  { title: 'Construction Innovation', href: '/blog' },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-turquoise-50 via-pink-50 to-lavender-50 border-t border-turquoise-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold text-gradient mb-4">
              Cellia
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Engineering Project Management professional specializing in construction management and BIM technologies.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/in/uyen-chuong"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg hover:scale-110 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-turquoise-500" />
              </a>
              <a
                href="https://github.com/UyenChuongNguyen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg hover:scale-110 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-turquoise-500" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 text-sm hover:text-turquoise-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Latest Posts</h4>
            <ul className="space-y-2">
              {latestPosts.map((post) => (
                <li key={post.title}>
                  <Link
                    href={post.href}
                    className="text-gray-600 text-sm hover:text-turquoise-500 transition-colors line-clamp-1"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-turquoise-500 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:uyenchuong92@gmail.com"
                  className="text-gray-600 text-sm hover:text-turquoise-500 transition-colors"
                >
                  uyenchuong92@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-turquoise-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 text-sm">
                  +44 (0)7763464065
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-turquoise-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 text-sm">Manchester, UK</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-turquoise-100">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Cellia. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs flex items-center">
              Built with <Heart className="w-3 h-3 mx-1 text-pink-400 fill-pink-400" /> by Tom
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
