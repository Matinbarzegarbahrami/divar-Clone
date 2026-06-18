'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { State } from '../../types/postTypes';
import { fetchPosts } from './fetchingdata';
import Post from './postPart';

export default function HomePage({
  initialPosts,
  slug,
}: {
  initialPosts: State[];
  slug?: string;
}) {
  const searchParams = useSearchParams();

  const [posts, setPosts] = useState<State[]>(initialPosts);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length > 0);

  const loaderRef = useRef<HTMLDivElement>(null);

  // استخراج همه‌ی پارامترهای کوئری به جز page (چون page رو خودمون مدیریت می‌کنیم)
  const filters = useMemo(() => {
    const f: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (key !== 'page') {
        f[key] = value;
      }
    });
    return f;
  }, [searchParams]);

  useEffect(() => {
    setPosts(initialPosts);
    alert("پروژه درحال توسعه بزرگ تر شدن و کامل تر شدن است.")
    setPage(2);
    setHasMore(initialPosts.length > 0);
  }, [initialPosts]);

  useEffect(() => {
    const loadPosts = async () => {
      if (page === 1 || loading || !hasMore) return;

      await fetchPosts({
        loading,
        setLoading,
        hasMore,
        setHasMore,
        page,
        setPost: setPosts,
        slug,
        filters,
      });
    };

    loadPosts();
  }, [page, slug, filters]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 1,
        rootMargin: '200px',
      }
    );

    const currentLoader = loaderRef.current;

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
      observer.disconnect();
    };
  }, [loading, hasMore]);

  return (
    <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-7">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}

      <div
        ref={loaderRef}
        className="col-span-full flex h-20 items-center justify-center"
      >
        {loading && <p>در حال بارگذاری...</p>}
        {!hasMore && !loading && (
          <p className="text-sm text-zinc-500">پست دیگری وجود ندارد</p>
        )}
      </div>
    </div>
  );
}