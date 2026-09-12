import Link from "next/link";

import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <main
      id="main"
      className="container"
      style={{
        display: "grid",
        gap: "var(--space-4)",
        justifyItems: "start",
        paddingBlock: "calc(var(--space-8) * 3)",
        minHeight: "50dvh",
        alignContent: "center",
      }}
    >
      <h6 style={{ color: "var(--color-accent-700)" }}>404</h6>
      <h1 style={{ maxWidth: "16ch" }}>That page is not here.</h1>
      <p className="text-muted" style={{ maxWidth: "44ch" }}>
        The link may be out of date. Everything we have built is on the work
        index.
      </p>
      <Link className="btn btn-primary" href="/work">
        See our work
        <Icon name="arrowRight" size={16} />
      </Link>
    </main>
  );
}
