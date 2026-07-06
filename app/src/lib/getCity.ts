"use client"

import { useRouter } from "next/navigation"
import { useCity } from "../store/cityStore"
const getCity = () => {
const {city} = useCity()
const router = useRouter()
router.push(`?city=${city ? city : "tehran"}`)
return city ? city : "tehran"

}

export default getCity