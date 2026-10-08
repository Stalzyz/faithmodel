import { getAlbums } from "@/actions/media";
import GalleryAlbumList from "./GalleryAlbumList";

export const dynamic = "force-dynamic";

export default async function GalleryManagerPage() {
  const { albums } = await getAlbums();

  return <GalleryAlbumList initialAlbums={albums || []} />;
}
