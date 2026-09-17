import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const configuredSecret = process.env.REVALIDATE_SECRET;
  const suppliedSecret = request.headers.get("x-revalidate-secret");

  if (!configuredSecret || !suppliedSecret || suppliedSecret !== configuredSecret) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  revalidateTag("attendez-seo");
  revalidateTag("attendez-blog");
  revalidatePath("/", "layout");

  return NextResponse.json({
    revalidated: true,
    revalidatedAt: new Date().toISOString(),
  });
}
