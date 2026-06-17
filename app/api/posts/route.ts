import { ALLPOSTS } from "@/MOCKS/POSTS";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams.get("page") || 1
    const city = request.nextUrl.searchParams.get("city")
    const filterPrice = request.nextUrl.searchParams.get("price")
    const val = filterPrice ? filterPrice.split('-') : null

    const min = (+(searchParams) - 1) * 10
    const max = +(searchParams) * 10


    const minPrice = val ? val[0] ? +val[0] : 0 : null;
    const maxPrice = val ? val[1] ? +val[1] : Number.MAX_SAFE_INTEGER : null;
    try {
        const allCPost = city ? ALLPOSTS.filter((post)=>post.city==city) : ALLPOSTS
        const allPosts = allCPost.filter((post) => {
            const price = +post.price
            return (
                minPrice !== null && maxPrice !== null ? price >= minPrice && price <= maxPrice :
                    minPrice ? price >= minPrice :
                        maxPrice ? price <= maxPrice :
                            true
            )
        });
        const posts = allPosts.slice(min, max)
        return NextResponse.json({
            status: 200,
            posts: posts
        })
    } catch (error) {
        console.error("خطا در دریافت آگهی‌ها:", error);

        return NextResponse.json(
            {
                status: 500,
                message: "خطایی در پردازش درخواست رخ داد.",
            },
            {
                status: 500,
            }
        );
    }
}
