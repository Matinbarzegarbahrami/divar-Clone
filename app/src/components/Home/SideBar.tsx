
import { CATEGORY_SEARCH_LIST } from "@/MOCKS/CATEGORY"
import Link from "next/link"
import SetPrice from "./setDilay"
import PriceFilter from "./priceFilter"

export default function SideBar({ slug }: { slug?: string }) {

  return (
    <>
      <nav className="lg:flex lg:flex-col grid grid-cols-3 gap-2 text-zinc-300/55 pr-5">
        <p className="mb-4 hidden lg:block">دسته ها</p>
        {CATEGORY_SEARCH_LIST.map((item) => {
          const Icon = item.icon
          return (
            <Link href={`/${item.name}`} key={item.id} className={`flex lg:justify-start justify-center gap-1.5 items-center lg:gap-4 ${slug ? item.name == slug ? 'text-zinc-50' : null : null}`}>

              <Icon size={16} />
              {item.label}

            </Link>
          )
        })}
        <div className="border-t border-zinc-700/20 mt-5 hidden lg:block">
          <PriceFilter />
        </div>
      </nav>
    </>
  )
}