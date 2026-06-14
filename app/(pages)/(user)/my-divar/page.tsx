'use client';

import MyPosts from "@/app/src/components/myDivar/posts";
import { useUser } from "@/app/src/store/userStore";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import MainDashboard from "@/app/src/components/myDivar/Dashboard";

export default function Dashboard() {
  const { user } = useUser();
  const [panel, setPanel] = useState("");
  const [width, setWidth] = useState(0);

useEffect(() => {
  setWidth(window.innerWidth);
}, []);
useEffect(()=>{
    if(width>768){
    setPanel('my-posts')
  }
},[width])

  return (
    <div className="flex min-w-0 ">
      <aside className={`md:w-73 w-auto ${panel?'hidden':'block'} sm:block p-2 shrink-0`}>
        <div className="mb-8 border-b border-zinc-600/20 pb-6">
          <h2 className="flex items-center gap-3 text-lg font-bold">
            <User size={20} />
            کاربر دیوار
          </h2>

          <p className="mt-3 text-sm text-zinc-400">
            {user?.phone}
          </p>
        </div>

        <nav className="flex flex-col gap-2 ">
          <MainDashboard setPanel={setPanel} panel={panel} />
        </nav>
      </aside>


      <main className="flex-1">
        <div className="rounded-2xl sm:p-6">
          <MyPosts />
        </div>
      </main>
    </div>
  );
}