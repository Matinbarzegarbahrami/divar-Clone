'use client'

import { turnToFarsi } from "@/app/src/lib/turnToFarsi";
import { State } from "@/app/src/types/postTypes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react"

export default function MyPost({id}: {id?: string}) {
    const [post, setPost] = useState<State | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter();
useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/profile/posts/${id}`, {
          cache: "no-store",
        });
        if (res.status === 401) {
          router.push("/");
          return;
        }
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

const editPost = () => {
    if (post) {
        router.push(`/profile/posts/${id}/edit`);
    }
};

const deletePost = async () => {
    if (post) {
        try {
            const res = await fetch(`/api/profile/posts/${id}`, {
                method: "DELETE",
            });
            if (res.status === 401) {
                router.push("/");
                return;
            }
            if (!res.ok) {
                throw new Error("Failed to delete post");
            }
            router.push("/profile/posts");
        } catch (err) {
            return console.error(err);
        }
    }
};
if (loading) {
    return <div className='flex min-h-lvh justify-center items-center'> <Image src={"/images/divar.png"} width={50} height={50} alt='loading'/></div>;
  }
return (
    <div>
      {post && post.status == "DEACTIVE" && <div className="text-red-500">آگهی مورد نظر حذف شده</div>}
      {post && post.status == "SEMI_ACTIVE" && <div className="text-yellow-500">آگهی مورد نظر در حال بررسی است</div>}
      {post && post.status == "ACTIVE" && <div className="">  <span className="text-green-500"> فعال است</span> </div>}
      {post && post.status == "ACTIVE" && 
      <div className="flex gap-4 mt-4">
      <button onClick={()=>editPost()} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 hover:cursor-pointer">ویرایش آگهی</button>
      <button onClick={()=>deletePost()} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 hover:cursor-pointer">حذف آگهی</button>
      </div>}
    </div>
)

}