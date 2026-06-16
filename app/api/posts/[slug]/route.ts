import { ALLPOSTS } from "@/MOCKS/POSTS";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, {params}: { params: Promise<{ slug: string }> }){
    const {slug} = await params
    const searchParams = request.nextUrl.searchParams.get("page") || 1
    const min = (+(searchParams)-1) *10
    const max = +(searchParams) * 10

    const allPosts = await ALLPOSTS
    const showPosts = allPosts.filter((post)=>post.category==slug)
    const posts = showPosts.slice(min,max)
    return NextResponse.json({
        status:200,
        posts:posts
    })
}