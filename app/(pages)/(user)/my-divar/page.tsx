'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter()

useEffect(() => {
  router.push("/my-divar/my-posts")
}, []);


  return (
    <div className="flex min-w-0 ">

      
    </div>
  );
}