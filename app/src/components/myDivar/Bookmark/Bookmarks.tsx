"use client";

import { State } from "@/app/src/types/postTypes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Bookmark = {
  postId: number;
};

async function fetchBookmarks(): Promise<Bookmark[]> {
  const res = await fetch("/api/profile/bookmark");

  if (!res.ok) {
    throw new Error("Failed to fetch bookmarks");
  }

  const data = await res.json();
  return data.bookmarks ?? [];
}

async function fetchPost(postId: number): Promise<State | null> {
  const res = await fetch(`/api/profile/posts/${postId}`);
  if (!res.ok) {
    console.error("Failed to fetch post:", postId);
    return null;
  }

  const data = await res.json();
  return data.post;
}

export default function BookMark() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [posts, setPosts] = useState<State[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);

      try {
        const data = await fetchBookmarks();
        if (!isMounted) return;

        setBookmarks(data);
        const postsData = await Promise.all(
          data.map((b) => fetchPost(b.postId))
        );

        if (!isMounted) return;
        setPosts(postsData.filter((p): p is State => p !== null));
      } catch (err) {
        console.error("Error loading bookmarks:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {posts.map((item) => {
          const imageSrc =
            typeof item.coverImage === "string"
              ? item.coverImage
              : "/images/divar.png";

          return (
            <Link
              href={`/${item.category}/${item.id}`}
              key={item.id}
              className="flex gap-4 border  border-zinc-700 rounded-xl p-3 bg-zinc-900/30 hover:bg-zinc-900/50 transition"
            >
              <div className="w-32 h-32 flex-shrink-0">
                <Image
                  src={imageSrc}
                  alt={item.title}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <h2 className="text-base font-bold text-white line-clamp-2">
                    {item.title}
                  </h2>

                  <p className="text-sm text-zinc-400 mt-1">
                    {item.city}، {item.location}
                  </p>
                </div>

                <div className="space-y-1 mt-3">
                  <p className="text-lg font-bold text-white">
                    ودیعه: {Number(item.price).toLocaleString()} تومان
                  </p>

                  <p className="text-sm text-zinc-300">
                    اجاره:{" "}
                    {Math.round(
                      Number(item.price) / 48
                    ).toLocaleString()}{" "}
                    تومان
                  </p>

                  <p className="text-xs text-zinc-500">
                    آژانس املاک کارن در تهران
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}