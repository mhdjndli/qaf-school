import { isAdmin } from "@/lib/auth";
import { getParentEnrolments } from "@/lib/dawrat-auth";
import {
  canStudentSeePhoto,
  getDawraPhoto,
  readDawraPhotoBytes,
} from "@/lib/dawrat";

export const dynamic = "force-dynamic";

/**
 * Streams a Dawra photo or video to an admin, or to a parent allowed to see
 * it. Supports Range requests, which browsers (Safari especially) need to
 * play and seek videos.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const photo = await getDawraPhoto(id);
  if (!photo) return new Response("Not found", { status: 404 });

  if (!(await isAdmin())) {
    // The child's row in the photo's Dawra (a child can be in several).
    const student = (await getParentEnrolments()).find(
      (s) => s.dawraId === photo.dawraId,
    );
    if (!student || !(await canStudentSeePhoto(student, photo))) {
      return new Response("Not found", { status: 404 });
    }
  }

  // Media never changes, so the id is a stable ETag. "no-cache" makes the
  // browser re-ask every time (re-running the permission check above) while
  // a 304 avoids re-downloading files it already has.
  const etag = `"${photo.id}"`;
  const headers: Record<string, string> = {
    ETag: etag,
    "Cache-Control": "private, no-cache",
    "Content-Type": photo.mimeType || "image/jpeg",
    "Accept-Ranges": "bytes",
    "X-Content-Type-Options": "nosniff",
  };
  const range = request.headers.get("range");
  if (!range && request.headers.get("if-none-match") === etag) {
    return new Response(null, { status: 304, headers });
  }

  const size = photo.sizeBytes;
  let start = 0;
  let end = size - 1;
  const m = range ? /^bytes=(\d*)-(\d*)$/.exec(range.trim()) : null;
  if (m && (m[1] || m[2])) {
    if (m[1]) {
      start = Number(m[1]);
      if (m[2]) end = Math.min(Number(m[2]), size - 1);
    } else {
      start = Math.max(0, size - Number(m[2])); // "bytes=-500": last 500 bytes
    }
    if (start > end || start >= size) {
      return new Response(null, {
        status: 416,
        headers: { ...headers, "Content-Range": `bytes */${size}` },
      });
    }
  }

  const data = await readDawraPhotoBytes(id, start, end - start + 1);
  if (!data) return new Response("Not found", { status: 404 });
  const partial = Boolean(m && (m[1] || m[2]));
  return new Response(new Uint8Array(data), {
    status: partial ? 206 : 200,
    headers: {
      ...headers,
      "Content-Length": String(data.byteLength),
      ...(partial ? { "Content-Range": `bytes ${start}-${end}/${size}` } : {}),
    },
  });
}
