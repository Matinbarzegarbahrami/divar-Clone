'use client'
import { useEffect, useState } from "react";
import MyPostList from "./ShowMyPosts";
import { useRouter } from "next/navigation";

const showPostsItem = [
  { id: 1, name: "all", label: "همه" },
  { id: 2, name: "active", label: "فعال" },
  { id: 3, name: "semi-active", label: "نیمه فعال" },
  { id: 4, name: "deactive", label: "غیرفعال" },
] as const;

type ShowPost = (typeof showPostsItem)[number]["name"];

export default function MyPosts() {
  const [showPost, setShowPost] = useState<ShowPost>("all");

  const router = useRouter()
  useEffect(()=>{
    const user = async() =>{
      try{
        const data = await fetch('/api/profile')
         console.log(data)
        if(!data.ok){
          alert("مشکلی پیش آمده.")
          router.push("/")
        }
      const res = await data.json()
      if (!res.token){
        router.push("/")
      }
      } catch (err){
         (err)
      }
    }
    user()
  },[])

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center gap-7 text-xl">
        {showPostsItem.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setShowPost(item.name)}
            className={`p-2 cursor-pointer transition-colors ${
              showPost === item.name
                ? "border-b-2 border-primary text-primary"
                : "hover:text-primary"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="h-0.5 bg-amber-50/10" />
        <MyPostList status={showPost}/>
      <div>
      </div>
    </div>
  );
}