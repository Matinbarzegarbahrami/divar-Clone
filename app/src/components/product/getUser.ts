const BASE_URL = process.env.BASE_URL || "http://localhost:3000"

export async function getUser(id:number | string | undefined){
  const res = await fetch(`${BASE_URL}/api/ad/user/${id}`)
  if (!res.ok){
    throw new Error("can not fetch")
  }
  const user = await res.json()
  return user
}