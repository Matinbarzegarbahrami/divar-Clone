
import Aside from "@/app/src/components/myDivar/Aside";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"
// const BASE_URL = "https://divar-clone-blond.vercel.app";
const BASE_URL = "http://localhost:3000";


async function getUserData() {
  const cookie = await cookies() 
  console.log(cookie.toString())
  const res = await fetch(`${BASE_URL}/api/profile`,
    {
      headers:{
        Cookie: cookie.toString()
      }
    }
  );
  if(res.status === 401){
    return res.status
  }
  const data = await res.json();
  
  console.log("data:", data)
  return data.user;
}


export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = await getUserData();
console.log(user)
  return <main className="flex-1 flex  p-8 overflow-y-auto">
    <Aside user={user} />
    {children}
    </main>;
}