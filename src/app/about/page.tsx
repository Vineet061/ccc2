import type { Metadata } from "next";
import Link from "next/link";

import { Icon } from "@/components/Icon";
import { MediaSlot } from "@/components/MediaSlot";
import { Reveal } from "@/components/Reveal";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Who CCC is, how the team came together, and the kind of work we take on.",
};

const principles = [
  {
    title: "Our approach",
    body: "We start from the problem, not the stack. A short scoping conversation, a working slice you can try within weeks, then iteration against real use rather than a spec. Nothing goes out that we would not run ourselves.",
  },
  {
    title: "What we specialise in",
    body: "Applied AI and R&D: retrieval over specialised corpora, models in production rather than notebooks, and the evaluation work that tells you whether any of it is actually better. Alongside that, web development: the sites, dashboards and interfaces that make the output usable, built to be fast, accessible and maintainable rather than a template with a logo dropped in.",
  },
  {
    title: "Who we work with",
    body: "Frontier model teams who need engineering judgement rather than a checklist, and small businesses who have outgrown spreadsheets. Different scales, same job: build the thing properly and hand it over working.",
  },
];

const team = [
  { id: 1, name: "Vineet Sharma", role: "Data Scientist" },
  // Role not supplied yet; the placeholder is deliberate so it is obvious in
  // review rather than quietly reading as a finished line.
  { id: 2, name: "Vikash Sahni", role: "Role, yours to fill" },
  { id: 3, name: "Sample Name", role: "Full Stack Developer" },
];

export default function AboutPage() {
  return (
    <main id="main" className={styles.main}>
      <Reveal as="section" className={styles.intro}>
        <div aria-hidden="true" className={`blob ${styles.introBlob}`} />
        <div style={{ position: "relative" }}>
          <h6 style={{ color: "var(--color-accent-700)" }}>About us</h6>
          <h1 className={styles.title}>Who we are.</h1>
          <p className={styles.introLede}>
            CCC is a small, highly skilled team. We work on R&amp;D, build
            intelligent systems, do contract engineering for frontier model
            teams, make dashboards and give local businesses a voice on a global
            level.
          </p>
        </div>
      </Reveal>

      <section className={styles.section} aria-labelledby="story-heading">
        <Reveal className={styles.storyGrid}>
          <div>
            <h2 id="story-heading" style={{ fontSize: "clamp(22px, 4vw, 25px)" }}>
              Our story
            </h2>
            <div
              className="placeholder-note"
              style={{ padding: "var(--space-4)" }}
            >
              <p className="placeholder-label">Your story copy</p>
              <p className="text-muted" style={{ margin: 0 }}>
                Where you started, how the team came together, what you learned
                shipping BrieflyTube, and where the studio is heading next.
              </p>
            </div>
          </div>

          <figure className={`washed ${styles.storyPhoto}`}>
            <MediaSlot
              placeholder="Drop a team or workspace photo"
              ratio="4 / 3"
              sizes="(max-width: 900px) 90vw, 460px"
            />
          </figure>
        </Reveal>
      </section>

      <section className={styles.section} aria-labelledby="how-heading">
        <Reveal>
          <h2
            id="how-heading"
            style={{
              fontSize: "clamp(22px, 4vw, 25px)",
              marginBottom: "var(--space-6)",
            }}
          >
            How we work
          </h2>
        </Reveal>

        <Reveal delayStep={1} className={styles.principles}>
          {principles.map((principle, i) => (
            <div key={principle.title} className={styles.principle}>
              <span className={styles.principleNum} aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className={styles.principleTitle}>{principle.title}</h3>
                <p className="text-muted" style={{ margin: 0 }}>
                  {principle.body}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      <section className={styles.section} aria-labelledby="team-heading">
        <Reveal>
          <h2
            id="team-heading"
            style={{
              fontSize: "clamp(22px, 4vw, 25px)",
              marginBottom: "var(--space-6)",
            }}
          >
            The team
          </h2>
        </Reveal>

        <Reveal delayStep={1} className={styles.team}>
          {team.map((member) => (
            <div key={member.id}>
              <div className={`washed ${styles.avatar}`}>
                <MediaSlot placeholder="Photo" ratio="1 / 1" round sizes="120px" />
              </div>
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className="text-muted" style={{ fontSize: 13, margin: 0 }}>
                {member.role}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      <Reveal as="section">
        <div className={styles.cta}>
          <div>
            <h2>See what we have built</h2>
            <p className="text-muted" style={{ margin: 0 }}>
              Four delivered projects and two in progress.
            </p>
          </div>
          <Link className="btn btn-primary" href="/work">
            Our work
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
