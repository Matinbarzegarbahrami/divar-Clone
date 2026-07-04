'use client';

import MyPosts from "@/app/src/components/myDivar/posts";
import { useUser } from "@/app/src/store/userStore";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import MainDashboard from "@/app/src/components/myDivar/Dashboard";
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