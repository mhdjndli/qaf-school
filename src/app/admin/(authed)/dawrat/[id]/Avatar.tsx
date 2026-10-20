/* eslint-disable @next/next/no-img-element */

export default function Avatar({
  studentId,
  hasPhoto,
  name,
  size = 44,
}: {
  studentId: string;
  hasPhoto: boolean;
  name: string;
  size?: number;
}) {
  const style = { width: size, height: size };
  if (hasPhoto) {
    return (
      <img
        src={`/api/dawrat/avatars/${studentId}`}
        alt={name}
        style={style}
        className="rounded-full object-cover border border-border shrink-0 bg-cream"
      />
    );
  }
  return (
    <span
      style={style}
      className="rounded-full bg-orange/10 text-orange-dark font-semibold flex items-center justify-center shrink-0"
    >
      {name.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}
