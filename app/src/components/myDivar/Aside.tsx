"use client"

import { useEffect } from "react";
import MainDashboard from "./Dashboard";
import { usePathname, useRouter } from "next/navigation";
import { User } from "lucide-react";

type User = {
  status:number,
  phone?:string,
  id?:string
}

export default async function Aside({ user }: { user: User }) {
  const router = useRouter()
  const params = usePathname()
  const param = params.split("/")[2]
  if (user.status == 401){
    
    alert("لطفا وارد شوید.")
    router.push('/')
  }
  return (
    <aside className={`md:w-73 w-auto ${param?'hidden':'block'} sm:block p-2 shrink-0`}>
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
          <MainDashboard param={param} />
        </nav>
      </aside>
    
  )
}