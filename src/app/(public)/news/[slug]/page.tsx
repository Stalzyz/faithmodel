import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import SketchReveal from "@/components/SketchReveal";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

export default async function NewsReaderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await prisma.post.findUnique({
    where: { slug }
  });

  if (!post || !post.isPublished) {
    notFound();
  }

  return (
    <PageLayout>
      <article className="max-w-4xl mx-auto px-6 lg:px-12 pt-12 pb-24">
        <Link href="/news" className="inline-flex items-center gap-2 font-inter text-sm text-[#4a4a5e] hover:text-[#d4a017] transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to News
        </Link>
        
        <SketchReveal delay={0.1}>
          {post.tag && (
            <div className="font-poppins font-bold text-[#c17b5a] uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
              <Tag className="w-3 h-3" /> {post.tag}
            </div>
          )}
          
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-[#FB7F05] leading-[1.1] mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-2 font-inter text-sm text-[#4a4a5e]/70 mb-12 border-b border-[rgba(74,74,94,0.08)] pb-8">
            <Calendar className="w-4 h-4" />
            {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          
          {post.coverImage && (
            <div className="mb-12 rounded-sm overflow-hidden border border-[rgba(74,74,94,0.08)]">
              <img src={post.coverImage} alt={post.title} className="w-full h-auto max-h-[500px] object-cover" />
            </div>
          )}
          
          <div className="font-inter text-[#4a4a5e] leading-relaxed prose prose-lg prose-p:mb-6 prose-headings:font-poppins prose-headings:text-[#FB7F05] prose-a:text-[#d4a017] prose-img:rounded-sm">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </SketchReveal>
      </article>
    </PageLayout>
  );
}
