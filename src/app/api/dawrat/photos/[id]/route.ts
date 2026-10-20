import { isAdmin } from "@/lib/auth";
import { getParentStudent } from "@/lib/dawrat-auth";
import { canStudentSeePhoto, getDawraPhotoFile } from "@/lib/dawrat";

export const dynamic = "force-dynamic";

/** Streams a Dawra photo to an admin, or to a parent allowed to see it. */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const found = await getDawraPhotoFile(id);
  if (!found) return new Response("Not found", { status: 404 });

  if (!(await isAdmin())) {
    const student = await getParentStudent();
    if (!student || !(await canStudentSeePhoto(student, found.photo))) {
      return new Response("Not found", { status: 404 });
    }
  }

  // Photos never change, so the id is a stable ETag. "no-cache" makes the
  // browser re-ask every time (re-running the permission check above) while
  // a 304 avoids re-downloading pictures it already has.
  const etag = `"${found.photo.id}"`;
  const cacheHeaders = {
    ETag: etag,
    "Cache-Control": "private, no-cache",
  };
  if (request.headers.get("if-none-match") === etag) {
    return new Response(null, { status: 304, headers: cacheHeaders });
  }
  return new Response(new Uint8Array(found.data), {
    status: 200,
    headers: {
      ...cacheHeaders,
      "Content-Type": found.photo.mimeType || "image/jpeg",
      "Content-Length": String(found.data.byteLength),
      "X-Content-Type-Options": "nosniff",
    },
  });
}
