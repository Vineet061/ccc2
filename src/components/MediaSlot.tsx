import Image from "next/image";

type MediaSlotProps = {
  /** Shown while no image has been supplied. Also becomes the alt text
   *  fallback, so keep it descriptive. */
  placeholder: string;
  /** Drop a file into /public and point `src` at it to fill the slot. */
  src?: string;
  alt?: string;
  /** CSS aspect-ratio, e.g. "16 / 9". */
  ratio?: string;
  className?: string;
  /** `sizes` hint for the responsive image. */
  sizes?: string;
  priority?: boolean;
  round?: boolean;
};

/**
 * A picture the client still has to supply. Renders a labelled placeholder
 * until `src` is set, then a properly sized, lazily loaded image — so the
 * layout reserves exactly the same box either way and nothing shifts.
 */
export function MediaSlot({
  placeholder,
  src,
  alt,
  ratio = "16 / 9",
  className,
  sizes = "(max-width: 900px) 100vw, 560px",
  priority = false,
  round = false,
}: MediaSlotProps) {
  const style: React.CSSProperties = {
    aspectRatio: ratio,
    borderRadius: round ? "999px" : undefined,
  };

  return (
    <div className={`media-slot ${className ?? ""}`} style={style}>
      {src ? (
        <Image
          src={src}
          alt={alt ?? placeholder}
          fill
          sizes={sizes}
          priority={priority}
          style={{ borderRadius: round ? "999px" : undefined }}
        />
      ) : (
        <span>{placeholder}</span>
      )}
    </div>
  );
}
