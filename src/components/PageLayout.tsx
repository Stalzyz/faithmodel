import SketchNav from "@/components/SketchNav";
import PencilCursor from "@/components/PencilCursor";
import QuickEnquiryBar from "@/components/QuickEnquiryBar";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Mail, MapPin, Phone } from "lucide-react";

const Facebook = ({ className }: { className?: string }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>;
const Twitter = ({ className }: { className?: string }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const Instagram = ({ className }: { className?: string }) => <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const Linkedin = ({ className }: { className?: string }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>;
const Youtube = ({ className }: { className?: string }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;

function PageFooter({ footerNav, general, contact, socials }: { footerNav?: any, general?: any, contact?: any, socials?: any }) {
  const col1 = footerNav?.[0] || { title: "Quick Links", items: [{ label: "About Us", href: "/about" }, { label: "Academics", href: "/academics" }, { label: "Admissions", href: "/admissions" }, { label: "Campus", href: "/campus" }, { label: "Contact", href: "/contact" }] };
  const col2 = footerNav?.[1] || { title: "Students & Parents", items: [{ label: "Parent Portal", href: "/parents" }, { label: "Student Portal", href: "/students" }, { label: "Fee Payment", href: "/parents#fees" }, { label: "Downloads", href: "/downloads" }, { label: "Mandatory Disclosure", href: "/mandatory-disclosure" }] };

  const siteName = general?.name || "Faith Model School";
  const siteDesc = general?.description || "Empowering minds, shaping futures since 1989.";
  
  const address = contact?.address || "123 Education Lane,\nChennai, Tamil Nadu 600001";
  const phone = contact?.phone || "+91 44 1234 5678";
  const email = contact?.email || "info@faithmodelschool.edu.in";

  return (
    <footer className="border-t border-[rgba(74,74,94,0.12)] py-16 px-8 bg-[#fefcf3]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <Link href="/">
            <img src="/Faith_model_logo.svg" alt={siteName} className="h-14 w-auto mb-4" />
          </Link>
          <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed">
            {siteDesc}
          </p>
          <div className="flex gap-4 mt-6">
            {socials?.facebook && <a href={socials.facebook} target="_blank" className="text-[#4a4a5e] hover:text-[#d4a017] transition-colors"><Facebook className="w-5 h-5" /></a>}
            {socials?.twitter && <a href={socials.twitter} target="_blank" className="text-[#4a4a5e] hover:text-[#d4a017] transition-colors"><Twitter className="w-5 h-5" /></a>}
            {socials?.instagram && <a href={socials.instagram} target="_blank" className="text-[#4a4a5e] hover:text-[#d4a017] transition-colors"><Instagram className="w-5 h-5" /></a>}
            {socials?.linkedin && <a href={socials.linkedin} target="_blank" className="text-[#4a4a5e] hover:text-[#d4a017] transition-colors"><Linkedin className="w-5 h-5" /></a>}
            {socials?.youtube && <a href={socials.youtube} target="_blank" className="text-[#4a4a5e] hover:text-[#d4a017] transition-colors"><Youtube className="w-5 h-5" /></a>}
          </div>
        </div>
        <div>
          <h4 className="font-poppins text-xs font-semibold text-[#FB7F05] uppercase tracking-widest mb-4">{col1.title}</h4>
          <ul className="space-y-2">
            {col1.items?.map((item: any) => (
              <li key={item.href}>
                <Link href={item.href} className="font-inter text-sm text-[#4a4a5e] hover:text-[#d4a017] transition-colors">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-poppins text-xs font-semibold text-[#FB7F05] uppercase tracking-widest mb-4">{col2.title}</h4>
          <ul className="space-y-2">
            {col2.items?.map((item: any) => (
              <li key={item.href}>
                <Link href={item.href} className="font-inter text-sm text-[#4a4a5e] hover:text-[#d4a017] transition-colors">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-poppins text-xs font-semibold text-[#FB7F05] uppercase tracking-widest mb-4">Contact</h4>
          <address className="not-italic font-inter text-sm text-[#4a4a5e] leading-relaxed space-y-3">
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-[#d4a017] shrink-0" />
              <p className="whitespace-pre-line">{address}</p>
            </div>
            <div className="flex gap-3">
              <Phone className="w-5 h-5 text-[#d4a017] shrink-0" />
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-[#d4a017] transition-colors">{phone}</a>
            </div>
            <div className="flex gap-3">
              <Mail className="w-5 h-5 text-[#d4a017] shrink-0" />
              <a href={`mailto:${email}`} className="hover:text-[#d4a017] transition-colors">{email}</a>
            </div>
          </address>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[rgba(74,74,94,0.08)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#4a4a5e]/60 font-inter">
        <span>© {new Date().getFullYear()} {siteName}. All rights reserved.</span>
        <div className="flex gap-6">
          <Link href="/mandatory-disclosure" className="hover:text-[#d4a017] transition-colors">CBSE Disclosure</Link>
          <Link href="/safety#child-protection" className="hover:text-[#d4a017] transition-colors">Child Protection Policy</Link>
          <Link href="/contact" className="hover:text-[#d4a017] transition-colors">Grievance</Link>
        </div>
      </div>
    </footer>
  );
}

export default async function PageLayout({ children }: { children: React.ReactNode }) {
  const settings = await prisma.setting.findMany({
    where: { key: { in: ["TOP_NAV", "FOOTER_NAV", "SITE_GENERAL", "SITE_CONTACT", "SITE_SOCIALS"] } }
  });
  
  const getSetting = (k: string) => {
    const s = settings.find(x => x.key === k);
    return s ? JSON.parse(s.value) : undefined;
  };

  const topNav = getSetting("TOP_NAV");
  const footerNav = getSetting("FOOTER_NAV");
  const general = getSetting("SITE_GENERAL");
  const contact = getSetting("SITE_CONTACT");
  const socials = getSetting("SITE_SOCIALS");

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Graph paper background */}
      <div className="fixed inset-0 -z-10 bg-[#fefcf3] graph-paper" />
      <div className="fixed inset-0 -z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 60%, rgba(210,195,160,0.18) 100%)" }}
      />
      <SketchNav navCategories={topNav} />
      <main className="pt-24 pb-24">{children}</main>
      <PageFooter footerNav={footerNav} general={general} contact={contact} socials={socials} />
      <QuickEnquiryBar />
    </div>
  );
}
