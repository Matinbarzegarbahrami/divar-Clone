import Image from "next/image";
import { formatPrice } from "../../lib/formatPrice";
import { toFarsiNumber } from "../../lib/turnToFarsiNumber";
import { State } from "../../types/postTypes";

export default function Post({ post }: { post: State }) {

    return (
        <article key={post.id} className="flex gap-2 border border-zinc-500/40 rounded-sm justify-between">

            <div className="p-4 relative min-h-40">
                <h2>{post.title}</h2>
                <div className="absolute bottom-0">
                    <p>{toFarsiNumber(formatPrice(post.price))} تومان</p>
                    <time dateTime={post.createdAt}>{toFarsiNumber(post.createdAt).replace(/-/g, "/")}</time>
                </div>
            </div>

            <div className="flex justify-center items-center ml-3">
                <Image alt={post.title} src={typeof post.coverImage === "string" ? post.coverImage : '/images/divar.png'} width={50} height={50} />
            </div>
        </article>
    )
}