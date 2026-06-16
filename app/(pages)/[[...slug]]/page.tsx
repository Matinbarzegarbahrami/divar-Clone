import HomePage from "@/app/src/components/Home/Home";
import { notFound } from "next/navigation";
import { State } from "@/app/src/types/postTypes";
import SideBar from "@/app/src/components/Home/SideBar";
import { turnToFarsi } from "@/app/src/lib/turnToFarsi";
import MainFrame from "@/app/src/components/Home/homeFrames";

const BASE_URL = "http://localhost:3000";
type Props = {
  params: {
    slug?: string[];
  };
};
export async function generateMetadata(props: Props) {
  const params = await props.params;

  const slug = params?.slug;
  if (slug && slug?.length > 1) {
    return {
      title: "دیوار | کلون دیوار"
    }
  }
  return {
    title: slug ? turnToFarsi(slug[0]) : "دیوار | کلون دیوار",
    description:"کلون دیوار"
  };
}

async function getInitialPosts(slug?: string, min?:string, max?: string): Promise<State[]> {

  const url = slug 
    ? `${BASE_URL}/api/posts/${slug}?page=1&price=${min}-${max}`
    : `${BASE_URL}/api/posts?page=1&price=${min?min:0}-${max?max:Number.MAX_SAFE_INTEGER}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.posts;
}

export default async function Home({
  params,
  searchParams
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: { price?: string };
}) {
  const { slug } = await params;
  const {price} = await searchParams
  const priceRange = price ?? "";
const [min, max] = priceRange.split("-");
  if (slug && slug.length > 1) {
    notFound();
  }


  const category = slug?.[0];

  const initialPosts = await getInitialPosts(category, min, max);
console.log("price:", price);
console.log("initialPosts:", initialPosts.length);
  return (
    <div className="flex gap-2 w-full p-6">
      <MainFrame category={category} initialPosts={initialPosts} />
    </div>

  );
}