import { USERDASHBOARD } from "@/statics/userdashboard";
import Link from "next/link";


export default function MainDashboard({param}:{param:string}){
    return(
    <>
        {USERDASHBOARD.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.url}
               href={`/my-divar/${item.url}`}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-right transition-all
                  ${
                    param === item.url
                      ? "bg-primary/15 text-primary border border-primary/20"
                      : "hover:bg-zinc-900 text-zinc-300"
                  }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            );
          })}
          </>
    )
}