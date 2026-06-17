import { State } from "@/app/src/types/postTypes";
import PostInfo from "./postInfo";
import Image from "next/image";
import { useMemo } from "react";

export default function MainPost({ post }: { post: State }) {
  const images = useMemo(() => {
    if (!post.allImages || post.allImages.length === 0) return [];
    return post.allImages.map((file) => URL.createObjectURL(file));
  }, [post.allImages]);

  return (
    <div className="flex justify-center max-w-[980px] mx-auto">
      <PostInfo post={post} />

      <div className="w-full">
        {images.length > 0 ? (
          images.map((src, index) => (
            <Image
              key={index}
              alt={post.title}
              src={src}
              width={80}
              height={80}
            />
          ))
        ) : (
          <Image
            alt={post.title}
            src="/images/divar.png"
            width={80}
            height={80}
          />
        )}
      </div>
    </div>
  );
}