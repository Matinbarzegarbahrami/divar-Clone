import MyPost from "@/app/src/components/myDivar/post/my-post";

export default async function Post({params}: {params: {slug: string}}) {
    const {slug} = await params;
  return (
    <>
    <MyPost id={slug}/>
    </>
  );
}