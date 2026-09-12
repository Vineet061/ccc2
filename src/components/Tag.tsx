export type TagTone = "accent" | "accent-2" | "neutral" | "outline";

const toneClass: Record<TagTone, string> = {
  accent: "tag-accent",
  "accent-2": "tag-accent-2",
  neutral: "tag-neutral",
  outline: "tag-outline",
};

export function Tag({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: TagTone;
  className?: string;
}) {
  return (
    <span className={`tag ${toneClass[tone]} ${className ?? ""}`}>
      {children}
    </span>
  );
}
