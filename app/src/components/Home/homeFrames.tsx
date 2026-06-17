import { State } from "../../types/postTypes";
import HomePage from "./Home";
import SideBar from "./SideBar";

export default function MainFrame({category, initialPosts, city}:{category?:string, initialPosts:State[], city?:string}) {
    return (
        <>
            <aside className={`lg:w-73  w-auto block sm:block p-2 shrink-0`}>
                <SideBar slug={category} city={city?city:'tehran'}/>
            </aside>

            <HomePage
                slug={category}
                initialPosts={initialPosts}
            />
        </>
    )
}