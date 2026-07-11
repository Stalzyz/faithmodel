import { getAlbumMedia } from "@/actions/media";
import AlbumManager from "./AlbumManager";

export default async function AlbumPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const decodedCategory = decodeURIComponent(resolvedParams.category);
  const { media } = await getAlbumMedia(decodedCategory);

  return (
    <div className="bg-[#f8f9fa] min-h-full pt-8 px-4">
      <AlbumManager category={decodedCategory} initialMedia={media || []} />
    </div>
  );
}
