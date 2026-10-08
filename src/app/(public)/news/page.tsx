import PageLayout from "@/components/PageLayout";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "News & Announcements | Faith Model School",
  description: "Stay updated with the latest news, events, and announcements from Faith Model School.",
};

export default async function NewsPage() {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <PageLayout>
      <div className="pt-12">
        <SectionHeading 
          annotation="Updates & Media"
          title="News & Announcements" 
          subtitle="Stay connected with the latest happenings, academic achievements, and school life at Faith Model School."
          center
        />

        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length === 0 ? (
              <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-[rgba(74,74,94,0.08)] p-8">
                <p className="text-[#4a4a5e]/60 font-inter text-base">
                  No news articles published yet. Check back soon for exciting announcements!
                </p>
              </div>
            ) : (
              posts.map((post, i) => (
                <SketchReveal key={post.id} delay={i * 0.08}>
                  <article className="group h-full flex flex-col rounded-2xl overflow-hidden border border-[rgba(74,74,94,0.1)] bg-white hover:border-[#FB7F05]/40 hover:shadow-lg transition-all duration-300">
                    {post.coverImage && (
                      <div className="aspect-[16/10] overflow-hidden bg-[rgba(74,74,94,0.05)] relative">
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                      </div>
                    )}
                    <div className="p-7 flex flex-col flex-grow">
                      <div className="flex items-center gap-2.5 mb-3.5">
                        <span className="font-poppins text-xs font-semibold tracking-wider text-[#FB7F05] uppercase bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-md">
                          {post.tag || "Announcement"}
                        </span>
                        <span className="w-1 h-1 bg-[#4a4a5e]/30 rounded-full" />
                        <span className="font-inter text-xs text-[#4a4a5e]/60">
                          {new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                        </span>
                      </div>
                      
                      <h2 className="font-cormorant text-2xl font-bold text-[#1a1a2e] mb-3 group-hover:text-[#FB7F05] transition-colors leading-snug">
                        {post.title}
                      </h2>
                      
                      <p className="font-inter text-[#4a4a5e] mb-6 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt || "Read full article to explore all details about this school announcement."}
                      </p>
                      
                      <Link 
                        href={`/news/${post.slug}`} 
                        className="mt-auto inline-flex items-center gap-1.5 font-poppins text-xs font-bold text-[#1a1a2e] uppercase tracking-wider group-hover:text-[#FB7F05] transition-colors"
                      >
                        Read Full Story <span>→</span>
                      </Link>
                    </div>
                  </article>
                </SketchReveal>
              ))
            )}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
