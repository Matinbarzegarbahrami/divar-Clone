import HomePage from "@/app/src/components/Home/Home";
import { notFound } from "next/navigation";
import { State } from "@/app/src/types/postTypes";
import SideBar from "@/app/src/components/Home/SideBar";
import { turnToFarsi } from "@/app/src/lib/turnToFarsi";

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
  };
}

async function getInitialPosts(slug?: string): Promise<State[]> {
  const url = slug
    ? `${BASE_URL}/api/posts/${slug}?page=1`
    : `${BASE_URL}/api/posts?page=1`;

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
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;

  if (slug && slug.length > 1) {
    notFound();
  }

  const category = slug?.[0];

  const initialPosts = await getInitialPosts(category);

  return (
    <div className="flex gap-2 w-full p-6">
      <aside className={`md:w-73 w-auto block sm:block p-2 shrink-0`}>
        <SideBar slug={category} />
      </aside>
      
        <HomePage
          slug={category}
          initialPosts={initialPosts}
        />
      

    </div>

  );
}