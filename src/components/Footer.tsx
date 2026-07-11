import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand & About */}
          <div>
            <div className="flex items-center gap-2 mb-6 bg-white inline-block p-2 rounded w-max">
              <span className="text-xl font-playfair font-bold text-primary">FAITH</span>
              <span className="text-md font-bold text-accent tracking-widest mt-1">MODEL</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Empowering minds and shaping the future through excellence in education, innovation, and holistic student development since 1990.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors font-bold text-sm">FB</a>
              <a href="#" className="hover:text-white transition-colors font-bold text-sm">TW</a>
              <a href="#" className="hover:text-white transition-colors font-bold text-sm">IG</a>
              <a href="#" className="hover:text-white transition-colors font-bold text-sm">YT</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 border-b border-slate-700 pb-2">Explore</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/academics" className="hover:text-accent transition-colors">Academic Programs</Link></li>
              <li><Link href="/admissions" className="hover:text-accent transition-colors">Admissions</Link></li>
              <li><Link href="/facilities" className="hover:text-accent transition-colors">Campus Facilities</Link></li>
              <li><Link href="/careers" className="hover:text-accent transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 border-b border-slate-700 pb-2">Resources</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/portals" className="hover:text-accent transition-colors">Parent Portal</Link></li>
              <li><Link href="/mandatory-disclosure" className="hover:text-accent transition-colors">Mandatory Disclosure</Link></li>
              <li><Link href="/downloads" className="hover:text-accent transition-colors">Downloads & Circulars</Link></li>
              <li><Link href="/news" className="hover:text-accent transition-colors">News & Events</Link></li>
              <li><Link href="/alumni" className="hover:text-accent transition-colors">Alumni Network</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 border-b border-slate-700 pb-2">Contact Us</h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>123 Education Boulevard, Academic District, New City 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>admissions@faithmodel.edu</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Faith Model School. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300">Terms of Service</Link>
            <Link href="/sitemap" className="hover:text-slate-300">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
