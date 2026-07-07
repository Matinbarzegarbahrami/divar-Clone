import EditPost from "@/app/src/components/myDivar/post/editPost";

export default async function PostEdit({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  return (
    <div>
      <EditPost id={slug} />
    </div>
  );
}