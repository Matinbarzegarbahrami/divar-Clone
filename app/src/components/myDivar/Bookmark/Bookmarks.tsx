"use client";

import { State } from "@/app/src/types/postTypes";
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
  return data;
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
    <div>
      {posts.map((post, idx) => (
        <div key={post?.id ?? idx}>
          {/* render post */}
          {JSON.stringify(post)}
        </div>
      ))}
    </div>
  );
}