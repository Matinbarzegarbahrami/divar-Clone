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
    <div className="flex flex-col-reverse lg:flex-row gap-4 px-5 relative justify-center max-w-[980px] mx-auto">
      <PostInfo post={post} />

      <div className="w-full flex justify-center">
        {images.length > 0 ? (
          images.map((src, index) => (
            <Image
              key={index}
              alt={post.title}
              src={src}
              width={400}
              height={400}
            />
          ))
        ) : (
          <Image
            alt={post.title}
            src="/images/divar.png"
            width={400}
            height={400}
          />
        )}
      </div>
    </div>
  );
}