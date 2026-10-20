/* eslint-disable @next/next/no-img-element */
import ConfirmButton from "./ConfirmButton";
import { deleteDawraPhotoAction } from "../actions";

export default function PhotoThumbs({ ids }: { ids: string[] }) {
  if (ids.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {ids.map((id) => (
        <li key={id} className="relative group">
          <a href={`/api/dawrat/photos/${id}`} target="_blank" rel="noopener">
            <img
              src={`/api/dawrat/photos/${id}`}
              alt=""
              loading="lazy"
              className="w-20 h-20 object-cover rounded-md border border-border bg-cream"
            />
          </a>
          <div className="absolute top-1 right-1">
            <ConfirmButton
              action={deleteDawraPhotoAction}
              fields={{ id }}
              message="Delete this picture?"
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
