/**
 * Footer Component - Fully Dynamic
 * References: REQ-03 (Footer)
 */

import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';
import { useNavigation, useSocialLinks, useContactInfo } from '../hooks/useConfig';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const iconMap: Record<string, any> = {
  Linkedin,
  Github,
  Twitter
};

export default function Footer({ onNavigate }: FooterProps) {
  const navItems = useNavigation();
  const socialLinks = useSocialLinks();
  const contactInfo = useContactInfo();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Rajesh Kumar</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              UI/UX Product Designer & UI Developer with 20+ years of experience creating impactful digital experiences.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Navigation</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-gray-300 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center text-gray-300 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center text-gray-300 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center text-gray-300 text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                {contactInfo.location}
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon] || Linkedin;
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                    aria-label={link.platform}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} Rajesh Kumar. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#privacy" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
