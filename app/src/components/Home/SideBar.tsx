
import { CATEGORY_SEARCH_LIST } from "@/MOCKS/CATEGORY"
import Link from "next/link"
import SetPrice from "./setDilay"
import PriceFilter from "./priceFilter"

export default function SideBar({ slug }: { slug?: string }) {

  return (
    <>
      <nav className="flex flex-col gap-2 text-zinc-300/55 pr-5">
        <p className="mb-4">دسته ها</p>
        {CATEGORY_SEARCH_LIST.map((item) => {
          const Icon = item.icon
          return (
            <Link href={`/${item.name}`} key={item.id} className={`flex gap-4 ${slug ? item.name == slug ? 'text-zinc-50' : null : null}`}>

              <Icon size={16} />
              {item.label}

            </Link>
          )
        })}
        <div>
          <PriceFilter />
        </div>
      </nav>
    </>
  )
}