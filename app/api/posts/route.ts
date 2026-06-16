import { ALLPOSTS } from "@/MOCKS/POSTS";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
        const searchParams = request.nextUrl.searchParams.get("page") || 1
    const min = (+(searchParams)-1) *10
    const max = +(searchParams) * 10
    try{
        const allPosts = ALLPOSTS;
        
    const posts = allPosts.slice(min,max)
    return NextResponse.json({
        posts: posts,
        status:200
    })
    } catch (err){
        return console.error("some thing has wrong")
    }
}