import { ALLPOSTS } from "@/MOCKS/POSTS";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const searchParams = request.nextUrl.searchParams.get("page") || 1
	const filterPrice = request.nextUrl.searchParams.get("price")
	const val = filterPrice ? filterPrice.split('-') : null

	const min = (+(searchParams) - 1) * 10
	const max = +(searchParams) * 10


	const minPrice = val ? val[0] ? +val[0] : 0 : null;
	const maxPrice = val ? val[1] ? +val[1] : Number.MAX_SAFE_INTEGER : null;
	try {
		const allPosts = ALLPOSTS.filter((post) => post.category == slug)
		const showPosts = allPosts.filter((post) => {
			const price = +post.price
			console.log("post is :", post.price)
			return (
				minPrice !== null && maxPrice !== null ? price >= minPrice && price <= maxPrice :
					minPrice ? price >= minPrice :
						maxPrice ? price <= maxPrice :
							true
			)
		});
		console.log(allPosts)
		
		const posts = showPosts.slice(min, max)

		console.log("posts:", posts)
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
