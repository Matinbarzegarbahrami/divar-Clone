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
  const [page, setPage] = useState(2);
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
    setPosts(initialPosts);
  }, [initialPosts]);

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
  console.log("HomePage Render");
  console.log(initialPosts);
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 w-full gap-3 lg:gap-7">
      {posts.map((post) => (
        <Post post={post} />
      ))}

      <div ref={loaderRef}>
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}