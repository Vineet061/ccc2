import type { Metadata } from "next";
import Link from "next/link";

import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Tag } from "@/components/Tag";
import { clients } from "@/data/clients";
import styles from "./clients.module.css";

export const metadata: Metadata = {
  title: "Clients",
  description: "The teams CCC has worked with.",
};


export default function ClientsPage() {
  return (
    <main id="main" className={styles.main}>
      <Reveal as="section">
        <h6 style={{ color: "var(--color-accent-700)" }}>Clients</h6>
        <h1 className={styles.title}>Who we work with.</h1>
        <p className={styles.lede}>
          A short list, on purpose. We take on what we can do properly.
        </p>
      </Reveal>

      <Reveal delayStep={1} as="section">
        <ul className={styles.list}>
          {clients.map((client) => (
            <li key={client.name} className={styles.row}>
              <span className={styles.mark} aria-hidden="true">
                {client.mark}
              </span>

              <div>
                <h2 className={styles.name}>{client.name}</h2>
                <p className={styles.note}>{client.note}</p>
              </div>

              <span className={styles.meta}>
                <Tag tone={client.tag.tone}>{client.tag.label}</Tag>
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal as="section">
        <div className={styles.foot}>
          <div>
            <h2>Room for one more.</h2>
            <p>
              We keep the list short so each engagement gets the attention it
              needs. If that suits you, get in touch.
            </p>
          </div>
          <Link className="btn btn-primary" href="/#contact">
            Start a conversation
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
