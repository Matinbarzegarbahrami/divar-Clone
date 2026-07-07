import { notFound, redirect } from "next/navigation";
import { State } from "@/app/src/types/postTypes";
import { turnToFarsi } from "@/app/src/lib/turnToFarsi";
import MainFrame from "@/app/src/components/Home/homeFrames";
import MainPost from "@/app/src/components/product/mainProduct";
import getCity from "@/app/src/lib/getCity";


const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
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
    description: "کلون دیوار"
  };
}

async function getInitialPosts(slug?: string, min?: string, max?: string, city?: string): Promise<State[]> {
  
  const url = slug
    ? `${BASE_URL}/api/posts/${slug}?page=1&price=${min ? min : 0}-${max ? max : 2147483647}&city=${city ? city : 'tehran'}`
    : `${BASE_URL}/api/posts?page=1&price=${min ? min : 0}-${max ? max : 2147483647}&city=${city ? city : 'tehran'}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.posts;
}

async function getPost(slug?:string){
  const res = await fetch(`${BASE_URL}/api/ad/${slug}`)
  if(!res.ok){
    return [];
  }
  
  const data = await res.json()
  return data.post
}

export default async function Home({
  params,
  searchParams
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: { price?: string, city?: string };
}) {
  const { slug } = await params;
  const { price, city } = await searchParams
  // if (!city){
  //   getCity()
  // }
  const priceRange = price ?? "";
  const [min, max] = priceRange.split("-");
  if (slug && slug.length >= 3) {
    notFound();
  }
  if (slug && slug.length == 2) {
    const post = await getPost(slug?.[1])
    console.log(post)
    return (
      <div>
        <MainPost post={post} />
      </div>
    )

  }
  


  const category = slug?.[0];

  const initialPosts = await getInitialPosts(category, min, max, city);

  return (
    <div className="lg:flex block gap-2 w-full p-6 ">
      <MainFrame category={category} initialPosts={initialPosts} city={city} />
    </div>

  );
}