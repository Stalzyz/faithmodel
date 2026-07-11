import { Users, GraduationCap, Briefcase, Lock } from 'lucide-react';
import Link from 'next/link';

export default function PortalsPage() {
  const portals = [
    {
      title: "Parent Portal",
      icon: <Users className="w-10 h-10 text-primary mb-4" />,
      desc: "Access your child's academic reports, track attendance, pay fees online, and communicate directly with teachers.",
      color: "border-blue-500",
      bg: "bg-blue-50"
    },
    {
      title: "Student Portal",
      icon: <GraduationCap className="w-10 h-10 text-primary mb-4" />,
      desc: "View your class timetable, submit digital assignments, access the e-library, and track your extracurricular achievements.",
      color: "border-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      title: "Teacher Portal",
      icon: <Briefcase className="w-10 h-10 text-primary mb-4" />,
      desc: "Manage class attendance, upload study materials, grade assignments, and communicate with parents and administration.",
      color: "border-accent",
      bg: "bg-yellow-50"
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-80px)]">
      {/* Page Header */}
      <section className="bg-slate-900 py-20 text-center">
        <div className="container mx-auto px-4">
          <Lock className="w-12 h-12 text-accent mx-auto mb-6 opacity-80" />
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">Secure Portals</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">Access your personalized dashboard to stay connected with the Faith Model School ecosystem.</p>
        </div>
      </section>

      {/* Portals Grid */}
      <section className="py-20 bg-slate-50 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {portals.map((portal, i) => (
              <div key={i} className={`bg-white rounded-xl shadow-sm border-t-4 ${portal.color} p-8 hover:shadow-lg transition-all flex flex-col items-center text-center group`}>
                <div className={`w-20 h-20 rounded-full ${portal.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {portal.icon}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{portal.title}</h3>
                <p className="text-slate-600 mb-8 leading-relaxed flex-grow">{portal.desc}</p>
                <Link href="#" className="w-full bg-slate-100 text-primary font-semibold py-3 rounded-md hover:bg-primary hover:text-white transition-colors">
                  Login to Portal
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center text-slate-500 text-sm">
            <p>Having trouble logging in? <Link href="/contact" className="text-accent hover:underline">Contact IT Support</Link></p>
          </div>
        </div>
      </section>

    </div>
  );
}
