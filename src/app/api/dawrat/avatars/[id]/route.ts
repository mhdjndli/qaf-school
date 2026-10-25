import { isAdmin } from "@/lib/auth";
import { getParentEnrolments } from "@/lib/dawrat-auth";
import { getStudentAvatar } from "@/lib/dawrat";

export const dynamic = "force-dynamic";

/** Streams a Dawra student's profile picture to an admin or that child's parent. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!(await isAdmin())) {
    const family = await getParentEnrolments();
    if (!family.some((s) => s.id === id)) {
      return new Response("Not found", { status: 404 });
    }
  }
  const avatar = await getStudentAvatar(id);
  if (!avatar) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(avatar.data), {
    status: 200,
    headers: {
      "Content-Type": avatar.mimeType,
      "Content-Length": String(avatar.data.byteLength),
      "Cache-Control": "private, no-cache",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
