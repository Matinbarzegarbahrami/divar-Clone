import MyPosts from "@/app/src/components/myDivar/posts";

export default function MyPost(){
    return(
        <main className="flex-1">
        <div className="rounded-2xl sm:p-6">
          <MyPosts />
        </div>
      </main>
    )
}