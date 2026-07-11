import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { PageBlock } from "@/components/admin/PageBuilder";
import SketchReveal from "@/components/SketchReveal";
import Link from "next/link";

// Dynamic block components
import PhilosophySplit from "@/components/cms-blocks/PhilosophySplit";
import CurriculumOverview from "@/components/cms-blocks/CurriculumOverview";
import SignaturePrograms from "@/components/cms-blocks/SignaturePrograms";
import AssessmentSystem from "@/components/cms-blocks/AssessmentSystem";
import TimelineBlock from "@/components/cms-blocks/TimelineBlock";
import IconGridBlock from "@/components/cms-blocks/IconGridBlock";
import StepsBlock from "@/components/cms-blocks/StepsBlock";
import TableBlock from "@/components/cms-blocks/TableBlock";
import ProfileGrid from "@/components/cms-blocks/ProfileGrid";
import ContactBlock from "@/components/cms-blocks/ContactBlock";
import AccordionBlock from "@/components/cms-blocks/AccordionBlock";
import PostsBlock from "@/components/cms-blocks/PostsBlock";
import GalleryBlock from "@/components/cms-blocks/GalleryBlock";
import MoodboardHero from "@/components/cms-blocks/MoodboardHero";
import GoldenHero from "@/components/cms-blocks/GoldenHero";
import SketchbookHeroBlock from "@/components/cms-blocks/SketchbookHeroBlock";

export async function generateMetadata(): Promise<Metadata> {
  const page = await prisma.page.findUnique({ where: { slug: "" } });
  
  if (!page || !page.isPublished) return { title: "Faith Model School" };

  let seo = { title: page.title, description: "", keywords: "" };
  try {
    const content = JSON.parse(page.content);
    if (content.seo) seo = content.seo;
  } catch (e) {}

  return {
    title: `${seo.title} | Faith Model School`,
    description: seo.description,
    keywords: seo.keywords
  };
}

export default async function HomePage() {
  const page = await prisma.page.findUnique({
    where: { slug: "" }
  });

  if (!page || !page.isPublished) {
    notFound();
  }

  let blocks: PageBlock[] = [];
  try {
    const payload = JSON.parse(page.content);
    blocks = Array.isArray(payload) ? payload : (payload.blocks || []);
  } catch (e) {
    console.error("Failed to parse page blocks", e);
  }

  return (
    <PageLayout>
      {blocks.map((block, index) => {
         switch (block.type) {
            case "HERO":
               return (
                  <div key={block.id} className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 border-b border-[rgba(74,74,94,0.08)]">
                     <SketchReveal delay={0.1}>
                        <div className="font-caveat text-[#c17b5a] text-xl mb-4 -rotate-1">{block.data.subheadline}</div>
                        <h1 className="font-cormorant text-[clamp(3rem,7vw,6rem)] font-light text-[#1a1a2e] leading-[1.08] tracking-tight max-w-4xl">
                           {block.data.headline}
                        </h1>
                     </SketchReveal>
                  </div>
               );
            case "MOODBOARD_HERO":
               return <MoodboardHero key={block.id} block={block} />;
            case "SKETCHBOOK_HERO":
               return <SketchbookHeroBlock key={block.id} block={block} />;
            case "GOLDEN_HERO":
               return <GoldenHero key={block.id} block={block} />;
            case "TEXT_BLOCK":
               return (
                  <section key={block.id} className="max-w-4xl mx-auto px-6 lg:px-12 py-16 font-inter text-[#4a4a5e] leading-relaxed prose prose-lg">
                     <SketchReveal delay={0.1}>
                        <div dangerouslySetInnerHTML={{ __html: block.data.content }} />
                     </SketchReveal>
                  </section>
               );
            case "CTA_SECTION":
               return (
                  <section key={block.id} className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)] text-center">
                     <SketchReveal delay={0.1}>
                        <h2 className="font-cormorant text-4xl font-light text-[#1a1a2e] mb-8">{block.data.title}</h2>
                        <Link href={block.data.buttonLink} className="inline-block font-poppins text-sm font-semibold text-[#1a1a2e] border border-[#1a1a2e] px-8 py-4 hover:bg-[#1a1a2e] hover:text-[#fefcf3] transition-all duration-400">
                           {block.data.buttonText}
                        </Link>
                     </SketchReveal>
                  </section>
               );
            case "IMAGE_GRID":
               return (
                  <section key={block.id} className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(74,74,94,0.08)]">
                     <div className="grid md:grid-cols-3 gap-4">
                        {block.data.images?.map((img: string, i: number) => (
                           <SketchReveal key={i} delay={i * 0.1}>
                              <div className="h-64 bg-[rgba(74,74,94,0.05)] border border-[rgba(74,74,94,0.1)] rounded-sm overflow-hidden">
                                 {img ? (
                                    <img src={img} alt="Grid item" className="w-full h-full object-cover" />
                                 ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[#4a4a5e]/40 font-inter text-sm">Image Placeholder</div>
                                 )}
                              </div>
                           </SketchReveal>
                        ))}
                     </div>
                  </section>
               );
            case "PHILOSOPHY_SPLIT":
               return <PhilosophySplit key={block.id} data={block.data} />;
            case "CURRICULUM_OVERVIEW":
               return <CurriculumOverview key={block.id} data={block.data} />;
            case "SIGNATURE_PROGRAMS":
               return <SignaturePrograms key={block.id} data={block.data} />;
            case "ASSESSMENT_SYSTEM":
               return <AssessmentSystem key={block.id} data={block.data} />;
            case "TIMELINE_BLOCK":
               return <TimelineBlock key={block.id} data={block.data} />;
            case "ICON_GRID_BLOCK":
               return <IconGridBlock key={block.id} data={block.data} />;
            case "STEPS_BLOCK":
               return <StepsBlock key={block.id} data={block.data} />;
            case "TABLE_BLOCK":
               return <TableBlock key={block.id} data={block.data} />;
            case "PROFILE_GRID":
               return <ProfileGrid key={block.id} data={block.data} />;
            case "CONTACT_BLOCK":
               return <ContactBlock key={block.id} data={block.data} />;
            case "ACCORDION_BLOCK":
               return <AccordionBlock key={block.id} data={block.data} />;
            case 'POSTS_BLOCK':
              return <PostsBlock key={block.id} data={block.data} />;
            case 'GALLERY_BLOCK':
              return <GalleryBlock key={block.id} block={block} />;
            default:
              return null;
         }
      })}
    </PageLayout>
  );
}
