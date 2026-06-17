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
  city: string;
}

export async function fetchPosts({
  loading,
  setLoading,
  hasMore,
  setHasMore,
  page,
  setPost,
  slug,
  city
}: FetchPostsProps) {
  if (loading || !hasMore) return;

  setLoading(true);

  try {
    const res = slug
      ? await fetch(`/api/posts/${slug}?page=${page}&city=${city?city:'tehran'}`)
      : await fetch(`/api/posts?page=${page}&city=${city?city:'tehran'}`);

    const data = await res.json();

    setPost((prev) => [...prev, ...data.posts]);

    if (data.posts.length === 0) {
      setHasMore(false);
    }
  } finally {
    setLoading(false);
  }
}