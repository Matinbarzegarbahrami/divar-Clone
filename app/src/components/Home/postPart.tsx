import Image from "next/image";
import { State } from "../../types/postTypes";
import Link from "next/link";

export default function Post({ post }: { post: State }) {
const imageSrc =
  typeof post.coverImage === "string"
    ? post.coverImage
    : post.coverImage instanceof File
    ? URL.createObjectURL(post.coverImage)
    : "/images/divar.png";
    return (
        <Link
            href={`/${post.category}/${post.id}`}
            key={post.id}
            className="flex gap-4 border h-40 border-zinc-700 rounded-xl p-3 bg-zinc-900/30 hover:bg-zinc-900/50 transition"
          >
            <div className="w-32 h-32 flex-shrink-0">
              <Image
                src={imageSrc}
                alt={post.title}
                width={50}
                height={50}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="flex flex-col justify-between flex-1 min-w-0">
              <div>
                <h2 className="text-base font-bold text-white line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-sm text-zinc-400 mt-1">
                  {post.cityId == 1 ? "تهران" : post.cityId == 2 ? "تبریز" : ""}
                </p>

                <p className="text-sm text-zinc-400 mt-1">
                {post.description.length > 50
                    ? post.description.substring(0, 50) + "..."
                    : post.description}
                </p>
              </div>

              <div className="space-y-1 mt-3">
                <p className="text-lg font-bold text-white">
                  قیمت: {Number(post.price).toLocaleString()} تومان
                </p>

                {post.category === "realState" && (
                  <p className="text-sm text-zinc-300">
                    اجاره:{" "}
                    {Math.round(
                      Number(post.price) / 48
                    ).toLocaleString()}{" "}
                  
                
                تومان
              </p>
              )}

              <p className="text-xs text-zinc-500">
                آژانس املاک کارن در تهران
              </p>
            </div>
          </div>
          </Link>
    )
}