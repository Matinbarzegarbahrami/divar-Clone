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
}

export async function fetchPosts({
  loading,
  setLoading,
  hasMore,
  setHasMore,
  page,
  setPost,
  slug,
}: FetchPostsProps) {
  if (loading || !hasMore) return;

  setLoading(true);

  try {
    const res = slug
      ? await fetch(`/api/posts/${slug}?page=${page}`)
      : await fetch(`/api/posts?page=${page}`);

    const data = await res.json();

    setPost((prev) => [...prev, ...data.posts]);

    if (data.posts.length === 0) {
      setHasMore(false);
    }
  } finally {
    setLoading(false);
  }
}