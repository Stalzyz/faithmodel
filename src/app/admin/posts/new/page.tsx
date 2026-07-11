import PostForm from "@/components/admin/PostForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewPostPage() {
  return (
    <div className="bg-[#f8f9fa] min-h-full">
      <div className="max-w-4xl mx-auto pt-8 pb-4 px-4 sm:px-0">
        <Link href="/admin/posts" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Posts
        </Link>
      </div>
      <PostForm />
    </div>
  );
}
