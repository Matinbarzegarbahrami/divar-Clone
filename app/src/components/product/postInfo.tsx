import { State } from "../../types/postTypes";
import AlarmModal from "./alarmModal";
import CallInfo from "./callInfo";
import PostDynamicFields from "./postDinamycFields";
import { Share2, Bookmark } from "lucide-react";

export default function PostInfo({ post }: { post: State }) {
  return (
    <div className="flex flex-col gap-4 w-full" dir="rtl">
      <h1 className="text-xl font-bold text-white leading-snug">{post.title}</h1>

      <p className="text-sm text-zinc-400">{post.createdAt}</p>

      <div className="flex items-center justify-between">
        <CallInfo phone={post.owner.phone} />
        <div className="flex gap-3 text-zinc-400">
          <button className="hover:text-white transition-colors">
            <Share2 size={18} />
          </button>
          <button className="hover:text-white transition-colors">
            <Bookmark size={18} />
          </button>
        </div>
      </div>
      <AlarmModal />

      <PostDynamicFields post={post} />

      {/* توضیحات */}
      {post.description && (
        <div className="mt-2">
          <h2 className="text-sm font-bold text-white mb-2">توضیحات</h2>
          <p className="text-sm text-zinc-300 leading-7">{post.description}</p>
        </div>
      )}
    </div>
  );
}