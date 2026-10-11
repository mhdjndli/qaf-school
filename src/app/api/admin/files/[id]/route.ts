import { isAdmin } from "@/lib/auth";
import { getStudentDocumentFile } from "@/lib/store";

export const dynamic = "force-dynamic";

/** Streams an uploaded student document (handbook / invoice / payment) to an admin. */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdmin())) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { id } = await params;
  const found = await getStudentDocumentFile(id);
  if (!found) return new Response("Not found", { status: 404 });

  const { doc, data } = found;
  const inline = new URL(request.url).searchParams.get("download") !== "1";
  const safeName = doc.filename.replace(/[^\w.\-() ]+/g, "_");
  return new Response(new Uint8Array(data), {
    status: 200,
    headers: {
      "Content-Type": doc.mimeType || "application/octet-stream",
      "Content-Length": String(data.byteLength),
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${safeName}"; filename*=UTF-8''${encodeURIComponent(doc.filename)}`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
