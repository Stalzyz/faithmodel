import { prisma } from "@/lib/prisma";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function PostsBlock({ data }: { data: any }) {
  // Fetch latest published posts
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    take: data.limit || 6,
  });

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)] bg-[rgba(210,195,160,0.05)]">
      <SectionHeading annotation={data.annotation || "Latest"} title={data.title || "News & Announcements"} subtitle={data.subtitle} />
      
      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length === 0 ? (
          <div className="col-span-full text-center text-[#4a4a5e]/60 font-inter py-12">
            No posts available at the moment.
          </div>
        ) : (
          posts.map((post, i) => (
            <SketchReveal key={post.id} delay={i * 0.1}>
              <Link href={`/news/${post.slug}`} className="block group h-full">
                <article className="bg-white p-6 border border-[rgba(74,74,94,0.06)] rounded-sm h-full hover:border-[#d4a017]/30 transition-colors shadow-sm flex flex-col">
                  {post.coverImage && (
                    <div className="h-48 mb-6 -mx-6 -mt-6 overflow-hidden rounded-t-sm">
                      <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {post.tag && (
                        <span className="text-xs font-poppins font-semibold text-[#c17b5a] uppercase tracking-wider">
                          {post.tag}
                        </span>
                      )}
                      <span className="text-xs font-inter text-[#4a4a5e]/60">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-poppins text-lg font-semibold text-[#1a1a2e] mb-3 group-hover:text-[#d4a017] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="font-inter text-sm text-[#4a4a5e] leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#1a1a2e] group-hover:text-[#d4a017] transition-colors">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </div>
                </article>
              </Link>
            </SketchReveal>
          ))
        )}
      </div>
    </section>
  );
}
