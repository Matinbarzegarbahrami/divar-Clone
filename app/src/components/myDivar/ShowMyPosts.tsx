'use client';

import { ALLPOSTS, postsT } from "@/MOCKS/POSTS";
import { useUser } from "@/app/src/store/userStore";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MyPostList({ status }: { status: string }) {
const [posts, setPosts] = useState([]);
const [loading, setLoading]=useState(true)
useEffect(()=>{
    const filterPosts = async()=>{
        try{
            const res = await fetch(`/api/profile/${status}`,{
              cache: "no-store",
            })
             
        if(!res.ok){
            return null
        }
        const data = await res.json()
         
        setPosts(data.posts)
        setLoading(false)
        } catch(err){
            return console.error("error :", err)
        }
        
    }
    filterPosts()
},[status])



if(loading){
    return(
        <div>
            loading
        </div>
    )
}
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
  {posts.map((item: postsT) => (
    <div
      key={item.id}
      className="flex gap-4 border border-zinc-700 rounded-xl p-3 bg-zinc-900/30 hover:bg-zinc-900/50 transition"
    >
      {/* Image */}
      <div className=" h-32 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          width={50}
          height={50}
          className=" object-cover rounded-lg"
        />

      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <h2 className="text-base font-bold text-white line-clamp-2">
            {item.title}
          </h2>

          <p className="text-sm text-zinc-400 mt-1">
            {item.city}، {item.location}
          </p>
        </div>

        <div className="space-y-1 mt-3">
          <p className="text-lg font-bold text-white">
            ودیعه: {item.price} تومان
          </p>

          <p className="text-sm text-zinc-300">
            اجاره: {Math.round(
              item.price / 48
            ).toLocaleString()} تومان
          </p>

          <p className="text-xs text-zinc-500">
            آژانس املاک کارن در تهران
          </p>
        </div>
      </div>
    </div>
  ))}
</div>
    );
}