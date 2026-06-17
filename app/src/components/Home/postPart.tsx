import Image from "next/image";
import { formatPrice } from "../../lib/formatPrice";
import { toFarsiNumber } from "../../lib/turnToFarsiNumber";
import { State } from "../../types/postTypes";
import Link from "next/link";

export default function Post({ post }: { post: State }) {

    return (
        <Link href={`${post.category}/${post.id}`} key={post.id} className="flex h-33 gap-2 border border-zinc-500/20 rounded-sm justify-between">

            <div className="p-4 relative">
                <h2>{post.title}</h2>
                <div className="absolute bottom-0">
                    <p>{toFarsiNumber(formatPrice(post.price))} تومان</p>
                    <time dateTime={post.createdAt}>{toFarsiNumber(post.createdAt).replace(/-/g, "/")}</time>
                </div>
            </div>

            <div className="flex justify-center items-center ml-3">
                <Image alt={post.title} src={typeof post.coverImage === "string" ? post.coverImage : '/images/divar.png'} width={50} height={50} />
            </div>
        </Link>
    )
}