'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { State } from "../../types/postTypes";
import Link from "next/link";

export default function MyPostList({ status }: { status: string }) {
  const [posts, setPosts] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/profile/${status}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await res.json();
        setPosts(data.posts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [status]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (!posts.length) {
    return (
      <div className="text-center text-zinc-400 py-10">
        آگهی‌ای پیدا نشد
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      {posts.map((item) => {
        const imageSrc =
          typeof item.coverImage === "string"
            ? item.coverImage
            : "/images/divar.png";

        return (
          <Link
            href={`/my-divar/my-posts/${item.id}`}
            key={item.id}
            className="flex gap-4 border border-zinc-700 rounded-xl p-3 bg-zinc-900/30 hover:bg-zinc-900/50 transition"
          >
            <div className="w-32 h-32 flex-shrink-0">
              <Image
                src={imageSrc}
                alt={item.title}
                width={32}
                height={32}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="flex flex-col justify-between flex-1 min-w-0">
              <div>
                <h2 className="text-base font-bold text-white line-clamp-2">
                  {item.title}
                </h2>

                <p className="text-sm text-zinc-400 mt-1">
                  {item.cityId == 1 ? "تهران" : item.cityId == 2 ? "تبریز" : ""}
                </p>

                <p className="text-sm text-zinc-400 mt-1">
                {item.description.length > 100
                    ? item.description.substring(0, 100) + "..."
                    : item.description}
                </p>
              </div>

              <div className="space-y-1 mt-3">
                <p className="text-lg font-bold text-white">
                  قیمت: {Number(item.price).toLocaleString()} تومان
                </p>

                {item.category === "realState" && (
                  <p className="text-sm text-zinc-300">
                    اجاره:{" "}
                    {Math.round(
                      Number(item.price) / 48
                    ).toLocaleString()}{" "}
                  
                
                تومان
              </p>
              )}

              <p className="text-xs text-zinc-500">
                آژانس املاک کارن در تهران
              </p>
            </div>
          </div>
          </Link>
  );
})}
    </div >
  );
}