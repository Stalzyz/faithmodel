import { getAlbums } from "@/actions/media";
import SectionHeading from "@/components/SectionHeading";
import SketchReveal from "@/components/SketchReveal";
import GalleryLightbox from "./GalleryLightbox";

export default async function GalleryBlock({ block }: { block: any }) {
  const { albums } = await getAlbums();

  if (!albums || albums.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <SketchReveal>
          <SectionHeading
            annotation={block.data.annotation}
            title={block.data.title}
            subtitle={block.data.subtitle}
          />
        </SketchReveal>

        <div className="mt-16">
          <GalleryLightbox albums={albums} />
        </div>
      </div>
    </section>
  );
}
