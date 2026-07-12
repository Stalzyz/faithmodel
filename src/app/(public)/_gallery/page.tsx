import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Campus Gallery | Faith Model School",
  description: "Explore the vibrant campus life, modern facilities, and student activities at Faith Model School.",
};

export const revalidate = 60; // Revalidate every minute

export default async function GalleryPage() {
  const allMedia = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Filter media into categories
  const campusImages = allMedia.filter(m => m.category === "CAMPUS");
  const sportsImages = allMedia.filter(m => m.category === "SPORTS");
  const eventsImages = allMedia.filter(m => m.category === "EVENTS");

  const categories = [
    { id: "campus", name: "Campus & Facilities", images: campusImages.length > 0 ? campusImages.map(img => img.url) : [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ] },
    { id: "academics", name: "Academic Life", images: [
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ] },
    { id: "sports", name: "Sports & Athletics", images: sportsImages.length > 0 ? sportsImages.map(img => img.url) : [
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588636734188-e8477ff250da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ] },
    { id: "events", name: "Events & Celebrations", images: eventsImages.length > 0 ? eventsImages.map(img => img.url) : [
      "https://images.unsplash.com/photo-1540324155970-1c8bf8f1f15d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ] },
  ];

  return (
    <PageLayout>
      <SectionHeading 
        title="Campus Gallery" 
        subtitle="A Glimpse into Our World" 
      />

      {categories.map((category, catIndex) => (
        <section key={category.id} className="max-w-7xl mx-auto px-6 lg:px-12 py-16 border-b border-[rgba(74,74,94,0.08)] last:border-0">
          <SketchReveal delay={0.1}>
            <h2 className="font-cormorant text-3xl font-light text-[#FB7F05] mb-10">{category.name}</h2>
          </SketchReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.images.map((img, i) => (
              <SketchReveal key={i} delay={0.1 * (i % 3)}>
                <div className="group relative aspect-[4/3] overflow-hidden bg-[rgba(74,74,94,0.05)] border border-[rgba(74,74,94,0.1)] rounded-sm cursor-pointer">
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500" />
                  <img 
                    src={img} 
                    alt={`${category.name} image ${i + 1}`} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out-expo"
                  />
                  <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                     <span className="font-poppins text-xs font-semibold text-[#fefcf3] uppercase tracking-wider">View</span>
                  </div>
                </div>
              </SketchReveal>
            ))}
          </div>
        </section>
      ))}

      <section className="bg-[#FB7F05] py-24 text-center px-6">
        <SketchReveal delay={0.2}>
          <div className="font-caveat text-[#d4a017] text-xl mb-4">See It Yourself</div>
          <h2 className="font-cormorant text-4xl font-light text-[#fefcf3] mb-8">Experience Faith Model School</h2>
          <a href="/admissions" className="inline-block font-poppins text-sm font-semibold bg-[#d4a017] text-[#FB7F05] px-8 py-4 hover:bg-[#fefcf3] transition-colors">
            Book a Campus Tour
          </a>
        </SketchReveal>
      </section>
    </PageLayout>
  );
}
