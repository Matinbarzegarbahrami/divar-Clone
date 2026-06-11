"use client";

import Link from "next/link";
import { useUser } from "@/app/src/store/userStore";
import { USERDASHBOARD } from "@/statics/userdashboard";
import { useState } from "react";
import { User } from "lucide-react";


export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const [panel, setPanel] = useState("my-posts")
  console.log(panel)
  const buttonHandler = (e, url)=>{
    e.preventDefault()
    setPanel(url)
  }
  return (
    <div className="min-h-screen text-white bg-background flex flex-row">
      <aside className="w-72 border-l border-zinc-800 p-6 shrink-0">
        <div className="mb-8 border-b border-zinc-800 pb-6">
          <h2 className="text-lg font-bold flex gap-4"><User/>  کاربر دیوار</h2>
          <p className="mt-2 text-sm text-zinc-400">{user?.phone}</p>
        </div>

        <nav className="flex flex-col gap-2">
          {USERDASHBOARD.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.url}
                onClick={(e)=>buttonHandler(e, item.url)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-zinc-900"
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}