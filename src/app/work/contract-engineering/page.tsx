import type { Metadata } from "next";
import Link from "next/link";

import { CountUp } from "@/components/CountUp";
import { Icon, type IconName } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Tag } from "@/components/Tag";
import { site } from "@/lib/site";
import styles from "./contract.module.css";

export const metadata: Metadata = {
  title: "Contract engineering",
  description:
    "Contractual engineering for the organisations leading the field, including Anthropic, OpenAI and Gemini. Six continuous months across three models, trained with advanced reinforcement learning techniques.",
};

const heroStats = [
  { value: site.revenueLast6Months, label: "Revenue, last 6 months" },
  { value: "3", label: "Model programmes" },
  { value: "6 mo", label: "Continuous engagement" },
];

const models = [
  {
    initial: "F",
    name: "Fabel5",
    note: "Task authoring and evaluation against a working engineer's judgement rather than a checklist.",
  },
  {
    initial: "M",
    name: "Mythos",
    note: "Engineering work delivered to spec, reviewed and iterated against real model behaviour.",
  },
  {
    initial: "G",
    name: "Gemini",
    note: "Continuous contribution across the programme, scaled up and down as the work required.",
  },
];

const steps = [
  {
    title: "Scope",
    note: "You describe the work. We say plainly what we can take on and what we cannot.",
  },
  {
    title: "Trial slice",
    note: "A small piece delivered first, so both sides see the standard before committing.",
  },
  {
    title: "Deliver",
    note: "Continuous contribution at an agreed rate, reviewed against your own quality bar.",
  },
  {
    title: "Scale",
    note: "Widen the engagement or wind it down. No lock-in either way.",
  },
];

const columns: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "code",
    title: "What we do",
    body: "Engineering delivered under contract to model teams: the tasks that need a working engineer's judgement rather than a checklist, and the evaluation work that shows whether an output is actually better.",
  },
  {
    icon: "layers",
    title: "Who we have worked with",
    body: "Over the last six months our work has covered the Fabel5, Mythos and Gemini programmes, across authoring, review and evaluation.",
  },
  {
    icon: "clock",
    title: "How to engage us",
    body: "Short scoped engagements or a continuing arrangement. Tell us the shape of the work and we will say what we can take on and when.",
  },
];

export default function ContractEngineeringPage() {
  return (
    <main id="main" className={styles.main}>
      <Reveal>
        <Link href="/work" className={`btn btn-ghost ${styles.back}`}>
          <Icon name="arrowLeft" size={14} />
          All work
        </Link>
      </Reveal>

      {/* ------------------------------------------------------------ hero */}
      <Reveal>
        <section className={styles.hero} aria-labelledby="ce-title">
          <div aria-hidden="true" className={`blob ${styles.heroBlob}`} />

          <div className={styles.heroCopy}>
            <h6 style={{ color: "var(--color-accent-700)" }}>
              Services · Last six months
            </h6>
            <h1 id="ce-title" className={styles.title}>
              We work with model teams.
            </h1>
            <p className={styles.lede}>
              Contractual engineering for the organisations leading the field,
              including Anthropic, OpenAI and Gemini. Six continuous months
              across three models, trained with advanced reinforcement learning
              techniques and reviewed against each team&rsquo;s own quality bar.
            </p>

            <div className={styles.heroActions}>
              <Link className="btn btn-primary" href="/#contact">
                Discuss a contract
                <Icon name="arrowRight" size={16} />
              </Link>
              <Link className="btn btn-secondary" href="/work">
                See all our work
              </Link>
            </div>
          </div>

          <div className={styles.heroStats}>
            {heroStats.map((stat) => (
              <div key={stat.label} className={styles.heroStat}>
                <CountUp value={stat.value} className={styles.heroStatValue} />
                <span className={styles.heroStatLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ---------------------------------------------------------- models */}
      <section className={styles.section} aria-labelledby="ce-models">
        <Reveal>
          <div className={styles.sectionHead}>
            <h2 id="ce-models" className={styles.sectionTitle}>
              Models we have trained
            </h2>
            <p className={styles.sectionNote}>Three programmes, six months</p>
          </div>
        </Reveal>

        <Reveal delayStep={1} className={styles.modelGrid}>
          {models.map((model) => (
            <article key={model.name} className={styles.modelCard}>
              <span className={styles.modelInitial} aria-hidden="true">
                {model.initial}
              </span>
              <h3 className={styles.modelName}>{model.name}</h3>
              <p className={styles.modelNote}>{model.note}</p>
            </article>
          ))}
        </Reveal>
      </section>

      {/* --------------------------------------------------------- process */}
      <section className={styles.section} aria-labelledby="ce-process">
        <Reveal>
          <div className={styles.sectionHead}>
            <h2 id="ce-process" className={styles.sectionTitle}>
              How an engagement runs
            </h2>
            <p className={styles.sectionNote}>Four steps, no lock-in</p>
          </div>
        </Reveal>

        <Reveal delayStep={1}>
          <ol className={styles.steps}>
            {steps.map((step, i) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepNum} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepNote}>{step.note}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* -------------------------------------------------------- the work */}
      <section className={styles.section} aria-labelledby="ce-detail">
        <Reveal>
          <div className={styles.sectionHead}>
            <h2 id="ce-detail" className={styles.sectionTitle}>
              The work itself
            </h2>
            <span style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <Tag tone="accent">Fabel5</Tag>
              <Tag tone="accent">Mythos</Tag>
              <Tag tone="accent">Gemini</Tag>
            </span>
          </div>
        </Reveal>

        <Reveal delayStep={1} className={styles.columns}>
          {columns.map((column) => (
            <div key={column.title} className={styles.column}>
              <span className={styles.columnIcon} aria-hidden="true">
                <Icon name={column.icon} size={19} />
              </span>
              <h3>{column.title}</h3>
              <p>{column.body}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ------------------------------------------------------------- cta */}
      <Reveal>
        <section className={styles.cta}>
          <div aria-hidden="true" className={`blob ${styles.ctaBlob}`} />
          <div className={styles.ctaCopy}>
            <h2>Have work that needs an engineer?</h2>
            <p>
              Tell us the shape of it. We will say what we can take on, at what
              rate, and when we could start.
            </p>
          </div>
          <Link className={`btn btn-primary ${styles.ctaAction}`} href="/#contact">
            Discuss a contract
            <Icon name="arrowRight" size={16} />
          </Link>
        </section>
      </Reveal>
    </main>
  );
}
