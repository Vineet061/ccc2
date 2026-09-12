import type { Metadata } from "next";
import Link from "next/link";

import { Icon } from "@/components/Icon";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { Tag } from "@/components/Tag";
import { inProgress, projects } from "@/data/projects";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "Four delivered projects, two in progress. Products first, contract work second.",
};

const delivered = projects.filter((p) => p.status === "delivered");

export default function WorkPage() {
  return (
    <main id="main" className={styles.main}>
      <Reveal as="section">
        <h6 style={{ color: "var(--color-accent-700)" }}>Our work</h6>
        <h1 className={styles.title}>
          Everything we have built, and what we are building next.
        </h1>
        <p className={styles.lede}>
          Four delivered projects, two in progress. Products first, contract
          work second.
        </p>
      </Reveal>

      <section id="delivered" className={styles.group} aria-labelledby="delivered-heading">
        <Reveal>
          <div className={styles.groupHead}>
            <h2 id="delivered-heading">Delivered</h2>
            <span className="text-muted" style={{ fontSize: 13 }}>
              {delivered.length} projects
            </span>
          </div>
        </Reveal>

        <Reveal
          delayStep={1}
          className={`row-fill ${styles.groupCards}`}
        >
          {delivered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </Reveal>
      </section>

      <section id="in-progress" className={styles.group} aria-labelledby="in-progress-heading">
        <Reveal>
          <div className={styles.groupHead}>
            <h2 id="in-progress-heading">In progress</h2>
            <span className="text-muted" style={{ fontSize: 13 }}>
              {inProgress.length} projects
            </span>
          </div>
        </Reveal>

        <Reveal
          delayStep={1}
          className={`row-fill ${styles.groupCards}`}
          style={{ "--row-basis": "300px" } as React.CSSProperties}
        >
          {inProgress.map((item) => (
            <article key={item.title} className={styles.wip}>
              <span className={styles.wipIcon}>
                <Icon
                  name={item.icon === "document" ? "documentLines" : "userCheck"}
                  size={22}
                />
              </span>
              <div>
                <span className={styles.wipBadges}>
                  {item.badges.map((badge) => (
                    <Tag key={badge.label} tone={badge.tone}>
                      {badge.label}
                    </Tag>
                  ))}
                </span>
                <h3 className={styles.wipTitle} style={{ fontSize: 20 }}>
                  {item.title}
                </h3>
                <p className="text-muted" style={{ margin: 0 }}>
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </Reveal>
      </section>

      <Reveal as="section">
        <div className={styles.cta}>
          <div>
            <h2>Something you want built?</h2>
            <p className="text-muted" style={{ margin: 0 }}>
              Tell us the problem and we will say honestly whether we are the
              right team.
            </p>
          </div>
          <Link className="btn btn-primary" href="/#contact">
            Get in touch
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
