/* eslint-disable @next/next/no-img-element */
import ConfirmButton from "./ConfirmButton";
import { deleteDawraPhotoAction } from "../actions";

/** Admin thumbnails of a day's photos and videos, each with a delete button. */
export default function PhotoThumbs({
  items,
}: {
  items: { id: string; video: boolean }[];
}) {
  if (items.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map(({ id, video }) => (
        <li key={id} className="relative group">
          <a
            href={`/api/dawrat/photos/${id}`}
            target="_blank"
            rel="noopener"
            className="relative block"
          >
            {video ? (
              <>
                <video
                  src={`/api/dawrat/photos/${id}#t=0.1`}
                  preload="metadata"
                  muted
                  playsInline
                  className="w-20 h-20 object-cover rounded-md border border-border bg-cream"
                />
                <span className="absolute bottom-1 left-1 text-[10px] font-semibold bg-black/60 text-white rounded px-1">
                  ▶ video
                </span>
              </>
            ) : (
              <img
                src={`/api/dawrat/photos/${id}`}
                alt=""
                loading="lazy"
                className="w-20 h-20 object-cover rounded-md border border-border bg-cream"
              />
            )}
          </a>
          <div className="absolute top-1 right-1">
            <ConfirmButton
              action={deleteDawraPhotoAction}
              fields={{ id }}
              message={video ? "Delete this video?" : "Delete this picture?"}
              className="w-6 h-6 rounded-full bg-white/90 text-red text-sm leading-none shadow border border-border hover:bg-red hover:text-white transition-colors"
            >
              ×
            </ConfirmButton>
          </div>
        </li>
      ))}
    </ul>
  );
}
