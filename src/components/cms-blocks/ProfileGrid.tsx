import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";

export default function ProfileGrid({ data }: { data: any }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
      <SectionHeading annotation={data.annotation} title={data.title} subtitle={data.subtitle} />
      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.profiles?.map((profile: any, i: number) => (
          <SketchReveal key={i} delay={i * 0.05}>
            <div className="group cursor-pointer">
              <div className="relative h-80 overflow-hidden rounded-sm mb-4 bg-gray-100">
                {profile.image && (
                   <img src={profile.image} alt={profile.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" loading="lazy" />
                )}
              </div>
              <h3 className="font-poppins text-lg font-semibold text-[#FB7F05] group-hover:text-[#c17b5a] transition-colors">{profile.name}</h3>
              <p className="font-caveat text-[#c17b5a] text-lg mt-1">{profile.role}</p>
              {profile.desc && <p className="font-inter text-xs text-[#4a4a5e] mt-2 leading-relaxed">{profile.desc}</p>}
            </div>
          </SketchReveal>
        ))}
      </div>
    </section>
  );
}
