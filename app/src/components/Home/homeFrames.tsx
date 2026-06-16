import { State } from "../../types/postTypes";
import HomePage from "./Home";
import SideBar from "./SideBar";

export default function MainFrame({category, initialPosts}:{category?:string, initialPosts:State[]}) {
    return (
        <>
            <aside className={`lg:w-73  w-auto block sm:block p-2 shrink-0`}>
                <SideBar slug={category} />
            </aside>

            <HomePage
                slug={category}
                initialPosts={initialPosts}
            />
        </>
    )
}