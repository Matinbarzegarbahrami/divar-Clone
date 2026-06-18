import { Dispatch, SetStateAction } from "react";
import { State } from "../../types/postTypes";

interface FetchPostsProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  hasMore: boolean;
  setHasMore: Dispatch<SetStateAction<boolean>>;
  page: number;
  setPost: Dispatch<SetStateAction<State[]>>;
  slug?: string;
  filters: Record<string, string>;
}

const LIMIT = 10;

export async function fetchPosts({
  loading,
  setLoading,
  hasMore,
  setHasMore,
  page,
  setPost,
  slug,
  filters,
}: FetchPostsProps) {
  if (loading || !hasMore) return;

  setLoading(true);

  try {
    const params = new URLSearchParams();
    params.set('page', String(page));

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    const query = params.toString();
    const url = slug
      ? `/api/posts/${slug}?${query}`
      : `/api/posts?${query}`;

    const res = await fetch(url);
    const data = await res.json();

    let newPosts: State[] = [];

    if (Array.isArray(data)) {
      newPosts = data;
    } else if (data?.posts && Array.isArray(data.posts)) {
      newPosts = data.posts;
    } else if (data?.data && Array.isArray(data.data)) {
      newPosts = data.data;
    } else {
      console.warn('⚠️ ساختار داده نامشخص است:', data);
    }

    if (newPosts.length > 0) {
      setPost((prev) => [...prev, ...newPosts]);
      setHasMore(newPosts.length >= LIMIT);
    } else {
      setHasMore(false);
    }
  } catch (error) {
    console.error('❌ خطا در fetchPosts:', error);
    setHasMore(false);
  } finally {
    setLoading(false);
  }
}