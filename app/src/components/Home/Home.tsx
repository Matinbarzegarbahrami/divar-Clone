"use client";

import { useEffect, useRef, useState } from "react";
import { State } from "../../types/postTypes";
import { fetchPosts } from "./fetchingdata";
import Post from "./postPart";

export default function HomePage({
  initialPosts,
  slug,
}: {
  initialPosts: State[];
  slug?: string;
}) {
  const [posts, setPosts] = useState<State[]>(initialPosts);
  const [page, setPage] = useState(2); // صفحه اول قبلاً لود شده
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length > 0);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchPosts({
      loading,
      setLoading,
      hasMore,
      setHasMore,
      page,
      setPost: setPosts,
      slug,
    });
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore]);

  return (
    <div className="grid grid-cols-3 w-full gap-7">
      {posts.map((post) => (
        <Post post={post} />
      ))}

      <div ref={loaderRef}>
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}