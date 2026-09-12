import Link from "next/link";

import { Icon } from "./Icon";
import { Tag } from "./Tag";
import type { Project } from "@/data/projects";
import { isExternal } from "@/lib/site";
import styles from "./ProjectCard.module.css";

export function ProjectCard({ project }: { project: Project }) {
  const external = isExternal(project.liveUrl);

  return (
    <article className={`card elev-sm ${styles.card}`}>
      <div className={styles.head}>
        <span className="card-kicker">{project.kicker}</span>
        <span className={styles.badges}>
          {project.badges.map((badge) => (
            <Tag key={badge.label} tone={badge.tone}>
              {badge.label}
            </Tag>
          ))}
        </span>
      </div>

      <h3 className={`card-title ${styles.title}`}>
        {/* Stretched over the whole card by a ::after in the stylesheet, so
            the entire surface is one click target without nesting anchors. */}
        <Link
          href={project.liveUrl}
          className={styles.titleLink}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {project.title}
        </Link>
      </h3>

      <p className={`card-body ${styles.body}`}>{project.summary}</p>

      <div className={styles.foot}>
        <span className={styles.live}>
          {project.liveLabel}
          <Icon name={external ? "external" : "arrowRight"} size={13} />
        </span>
      </div>
    </article>
  );
}
