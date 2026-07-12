import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "News & Announcements | Faith Model School",
  description: "Stay updated with the latest news from Faith Model School.",
};

export const revalidate = 60;

export default async function NewsPage() {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <PageLayout>
      <SectionHeading 
        title="News & Updates" 
        subtitle="The Latest from Campus" 
      />

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length === 0 ? (
               <div className="col-span-full text-center py-12 text-[#4a4a5e]/50 font-inter">
                  No news articles published yet.
               </div>
            ) : (
               posts.map((post, i) => (
                  <SketchReveal key={post.id} delay={i * 0.1}>
                     <article className="group h-full flex flex-col border border-[rgba(74,74,94,0.1)] bg-white hover:border-[#1a1a2e] transition-colors duration-300">
                        {post.coverImage && (
                           <div className="aspect-[16/10] overflow-hidden bg-[rgba(74,74,94,0.05)]">
                              <img 
                                 src={post.coverImage} 
                                 alt={post.title} 
                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                              />
                           </div>
                        )}
                        <div className="p-8 flex flex-col flex-grow">
                           <div className="flex items-center gap-3 mb-4">
                              <span className="font-poppins text-xs font-semibold tracking-wider text-[#FB7F05] uppercase">
                                 {post.tag || "Announcement"}
                              </span>
                              <span className="w-1 h-1 bg-[#4a4a5e]/20 rounded-full" />
                              <span className="font-inter text-xs text-[#4a4a5e]/60">
                                 {new Date(post.createdAt).toLocaleDateString()}
                              </span>
                           </div>
                           <h2 className="font-cormorant text-2xl font-medium text-[#1a1a2e] mb-4 group-hover:text-[#FB7F05] transition-colors leading-snug">
                              {post.title}
                           </h2>
                           <p className="font-inter text-[#4a4a5e] mb-8 text-sm leading-relaxed line-clamp-3">
                              {post.excerpt || "Read more about this update by clicking the link below."}
                           </p>
                           <Link 
                              href={`/news/${post.slug}`} 
                              className="mt-auto inline-flex items-center font-poppins text-xs font-semibold text-[#1a1a2e] uppercase tracking-widest group-hover:gap-2 transition-all"
                           >
                              Read Full Story <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                           </Link>
                        </div>
                     </article>
                  </SketchReveal>
               ))
            )}
         </div>
      </section>
    </PageLayout>
  );
}
