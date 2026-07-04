'use client'

import { Suspense, useEffect, useState } from "react"

export default function MyPost({id}: {id?: string}) {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/profile/posts/${id}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await res.json();
        setPost(data.post);
        } catch (err) {
            return console.error(err);
        } finally {
            setLoading(false);
        }
    };

    fetchPost();
}, [id]);
if (loading) {
    return <div>loading...</div>;
  }
return (
    <div>
    
   

    </div>
)

}