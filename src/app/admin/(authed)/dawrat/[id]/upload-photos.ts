import { compressImage } from "@/lib/compress-image";
import { uploadDawraPhotoAction } from "../actions";

/**
 * Uploads pictures one request at a time (keeps each under the server
 * action body limit) and reports progress. Returns the first error, if any.
 */
export async function uploadPhotos(
  files: File[],
  target: { dawraId: string; day: string; studentId: string | null; shared: boolean },
  onProgress: (done: number, total: number) => void,
): Promise<string | null> {
  let firstError: string | null = null;
  for (let i = 0; i < files.length; i++) {
    onProgress(i, files.length);
    const fd = new FormData();
    fd.set("dawraId", target.dawraId);
    fd.set("day", target.day);
    if (target.studentId) fd.set("studentId", target.studentId);
    if (target.shared) fd.set("shared", "1");
    fd.set("photo", await compressImage(files[i]));
    const res = await uploadDawraPhotoAction(fd);
    if (res?.error && !firstError) firstError = `${files[i].name}: ${res.error}`;
  }
  onProgress(files.length, files.length);
  return firstError;
}
