import Link from "next/link";

import { ContactForm } from "@/components/ContactForm";
import { CountUp } from "@/components/CountUp";
import { Icon, type IconName } from "@/components/Icon";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { StatTile, type Stat } from "@/components/StatTile";
import { Tag } from "@/components/Tag";
import { VideoEmbed } from "@/components/VideoEmbed";
import { clients } from "@/data/clients";
import { projects } from "@/data/projects";
import { site } from "@/lib/site";
import styles from "./home.module.css";

const shipped: { icon: IconName; tone: "a" | "b"; name: string; note: string }[] =
  [
    {
      icon: "sparkle",
      tone: "a",
      name: "AI application",
      note: "Semantic search over a whole corpus",
    },
    {
      icon: "document",
      tone: "b",
      name: "Research paper",
      note: "Peer-reviewed on IEEE Xplore",
    },
    {
      icon: "mobile",
      tone: "a",
      name: "An app in production",
      note: "500+ installs, real reviews",
    },
    {
      icon: "chartUp",
      tone: "b",
      name: "Live working dashboard",
      note: "Running against a real workflow",
    },
  ];

/* Each figure leads to the evidence behind it. The one still in progress has
   nothing to point at yet, so it stays a plain tile. */
const stats: Stat[] = [
  {
    icon: "download",
    value: "500+",
    label: (
      <>
        Play Store
        <br />
        downloads
      </>
    ),
    tone: "accent",
    href: site.playStoreUrl,
    linkLabel: "500+ Play Store downloads. View BrieflyTube on Google Play",
  },
  {
    icon: "trendUp",
    value: site.revenueLast6Months,
    label: (
      <>
        Revenue
        <br />
        last 6 months
      </>
    ),
    tone: "accent-2",
    href: "/work/contract-engineering",
    linkLabel: `${site.revenueLast6Months} revenue over the last six months. See how we work with model teams`,
  },
  {
    icon: "check",
    value: "4",
    label: (
      <>
        Projects
        <br />
        delivered
      </>
    ),
    tone: "accent",
    href: "/work#delivered",
    linkLabel: "4 projects delivered. See the delivered work",
  },
  {
    icon: "clock",
    value: "2",
    label: (
      <>
        Projects
        <br />
        ongoing
      </>
    ),
    tone: "accent-2",
    href: "/work#in-progress",
    linkLabel: "2 projects ongoing. See the work in progress",
  },
  {
    icon: "document",
    value: "1",
    label: (
      <>
        Research
        <br />
        published
      </>
    ),
    tone: "accent",
    href: site.ieeeUrl,
    linkLabel: "1 research paper published. Read it on IEEE Xplore",
  },
  {
    icon: "users",
    // Counted from the clients list so the figure cannot drift from the page.
    value: String(clients.length),
    label: (
      <>
        Clients
        <br />
        served
      </>
    ),
    tone: "accent-2",
    href: "/clients",
    linkLabel: `${clients.length} clients served. See who we work with`,
  },
];

/* What CCC sells, listed on the home page. The full story lives on /about,
   which this section links through to. */
const services: { label: string; icon: IconName }[] = [
  { label: "AI-ML applications & model building", icon: "sparkle" },
  { label: "Data analysis", icon: "chartUp" },
  { label: "Web development", icon: "code" },
  { label: "App development", icon: "mobile" },
  { label: "Applied research", icon: "document" },
  { label: "Contract engineering", icon: "layers" },
];

const models = [
  { initial: "F", name: "Fabel5", tone: "a" as const },
  { initial: "M", name: "Mythos", tone: "b" as const },
  { initial: "G", name: "Gemini", tone: "a" as const },
];

const featuredProjects = projects.slice(0, 2);

export default function HomePage() {
  return (
    <main id="main" className={styles.main}>
      {/* ------------------------------------------------------------ hero */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div
          aria-hidden="true"
          className={`blob ${styles.heroBlobA}`}
        />
        <div
          aria-hidden="true"
          className={`blob ${styles.heroBlobB}`}
        />

        <div className={styles.heroGrid}>
          <Reveal>
            <h1 id="hero-title" className={styles.heroTitle}>
              We design, build and ship AI products, web services &amp;
              products.
            </h1>
            <p className={styles.heroLede}>{site.description}</p>
            <div className={styles.heroActions}>
              <Link className="btn btn-primary" href="/work">
                See our work
                <Icon name="arrowRight" size={16} />
              </Link>
              <Link className="btn btn-secondary" href="#contact">
                Get in touch
              </Link>
            </div>
          </Reveal>

          <Reveal delayStep={1}>
            <div className={styles.shipped}>
              <div
                aria-hidden="true"
                className={`blob ${styles.shippedBlob}`}
              />
              <span className={styles.shippedLabel}>What we have shipped</span>

              {shipped.map((item) => (
                <div key={item.name} className={styles.shippedItem}>
                  <span
                    className={`${styles.shippedIcon} ${
                      item.tone === "a" ? styles.shippedIconA : styles.shippedIconB
                    }`}
                  >
                    <Icon name={item.icon} size={19} />
                  </span>
                  <span>
                    <span className={styles.shippedName}>{item.name}</span>
                    <span className={styles.shippedNote}>{item.note}</span>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------- by the numbers */}
      <section className={styles.stats} aria-label="By the numbers">
        <div className={styles.statsPanel}>
          <div aria-hidden="true" className={`blob ${styles.statsBlobA}`} />
          <div aria-hidden="true" className={`blob ${styles.statsBlobB}`} />

          {stats.map((stat, i) => (
            <StatTile key={i} stat={stat} index={i} />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ work */}
      <section id="work" className="section">
        <Reveal>
          <h6 style={{ color: "var(--color-accent-700)" }}>Our work</h6>
          <h2 style={{ maxWidth: "24ch" }}>Built to solve what annoyed us.</h2>
          <p className={`text-muted ${styles.workIntro}`}>
            Products first, contracts second. Each one started as something we
            wanted to exist.
          </p>
        </Reveal>

        <Reveal delayStep={1} className="grid grid-auto-250">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </Reveal>

        <Reveal delayStep={2}>
          <Link className={`btn btn-secondary ${styles.workMore}`} href="/work">
            See all six projects
            <Icon name="arrowRight" size={16} />
          </Link>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- models */}
      <section id="models" className={styles.models} aria-labelledby="models-title">
        <Reveal>
          <div className={styles.modelsPanel}>
            <div aria-hidden="true" className={`blob ${styles.modelsBlobA}`} />
            <div aria-hidden="true" className={`blob ${styles.modelsBlobB}`} />

            <div style={{ position: "relative" }}>
              <h2 id="models-title" className={styles.modelsTitle}>
                Models we have trained
              </h2>
              <p className={`text-muted ${styles.modelsLede}`}>
                Contract engineering across three frontier model programmes over
                the last six months.
              </p>
            </div>

            <div className={styles.modelsRow}>
              {models.map((model) => (
                <div key={model.name} className={styles.model}>
                  <span
                    className={styles.modelInitial}
                    style={{
                      background:
                        model.tone === "a"
                          ? "var(--color-accent-200)"
                          : "var(--color-accent-2-200)",
                      color:
                        model.tone === "a"
                          ? "var(--color-accent-800)"
                          : "var(--color-accent-2-800)",
                    }}
                    aria-hidden="true"
                  >
                    {model.initial}
                  </span>
                  <span className={styles.modelName}>{model.name}</span>
                </div>
              ))}
            </div>

            <Link
              className="btn btn-secondary"
              href="/work/contract-engineering"
              style={{ position: "relative" }}
            >
              How we work with model teams
              <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* -----------------------------------------------------------------
          About — a copy column beside the list of what CCC sells. Sits above
          Achievements so a visitor learns who the team is and what they offer
          before being shown the proof.                                      */}
      <section id="about" className={styles.about}>
        <Reveal className={styles.aboutHead}>
          <div className={styles.aboutIntro}>
            <h6 style={{ color: "var(--color-accent-700)" }}>About us</h6>
            <h2 className={styles.aboutHeading}>
              A small team that works for clients and ships its own products.
            </h2>
            <p className={styles.aboutLede}>
              R&amp;D, intelligent systems, dashboards and contract engineering.
              Built by the people who use them.
            </p>
            <Link className={styles.aboutLink} href="/about">
              <span className={styles.aboutLinkText}>Read the whole story</span>
              <span className={styles.aboutLinkDot} aria-hidden="true">
                <Icon name="arrowRight" size={15} />
              </span>
            </Link>
          </div>

          <div className={styles.services}>
            <h3 className={styles.servicesLabel}>Services we offer</h3>
            <ul className={styles.servicesGrid}>
              {services.map((service) => (
                <li key={service.label} className={styles.service}>
                  <span className={styles.serviceIcon} aria-hidden="true">
                    <Icon name={service.icon} size={17} />
                  </span>
                  <span className={styles.serviceName}>{service.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------- achievements */}
      <section id="achievements" className="section">
        <Reveal>
          <h6 style={{ color: "var(--color-accent-700)" }}>Achievements</h6>
          <h2 style={{ maxWidth: "22ch", marginBottom: "var(--space-6)" }}>
            Shipped, published, paid for.
          </h2>
        </Reveal>

        <Reveal delayStep={1}>
          <div className={styles.feature}>
            <div>
              <Tag tone="accent">Live on Google Play</Tag>
              <h3 style={{ marginTop: "var(--space-3)" }}>
                BrieflyTube crossed 500+ downloads
              </h3>
              <p className={styles.featureBody}>
                Our first public app, built and shipped end to end: listing,
                releases, updates and user reviews. It is still on the store and
                still getting installs.
              </p>
              <div className={styles.rating}>
                <span
                  className={styles.stars}
                  role="img"
                  aria-label="Rated four out of five stars"
                >
                  <Icon name="star" size={18} />
                  <Icon name="star" size={18} />
                  <Icon name="star" size={18} />
                  <Icon name="star" size={18} />
                  <Icon name="starOutline" size={18} />
                </span>
                <span className="text-muted" style={{ fontSize: 13 }}>
                  Rated by real users on the Play Store
                </span>
              </div>
              <a
                className="btn btn-primary"
                href={site.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Play
                <Icon name="external" size={15} />
              </a>
            </div>

            <figure className={styles.featureShot}>
              <VideoEmbed
                id={site.playStoreTrailerId}
                title="BrieflyTube trailer from the Google Play listing"
                caption="Trailer · Google Play"
              />
              <figcaption className={styles.featureCaption}>
                The trailer from the Play Store listing.
              </figcaption>
            </figure>
          </div>
        </Reveal>

        <Reveal delayStep={2} className={styles.achievementCards}>
          <article className="card elev-sm">
            <span className="card-kicker">Research · IEEE</span>
            <h4 style={{ fontSize: 18, margin: 0 }}>
              An Integrated Usage of Bidirectional LSTM and Computer-based
              Cognitive Attention to Categorize Speech Stutters
            </h4>
            <p className="card-body">
              Peer-reviewed and published on IEEE Xplore. A second paper is
              being written now, on the same applied side of the field.
            </p>
            <Tag tone="accent-2" className="self-start">
              1 published, 1 in progress
            </Tag>
            <a
              className="btn btn-ghost"
              href={site.ieeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ alignSelf: "flex-start" }}
            >
              Read the paper
              <Icon name="external" size={14} />
            </a>
          </article>

          <article className="card elev-sm">
            <span className="card-kicker">Service · In progress</span>
            <h4 style={{ fontSize: 18, margin: 0 }}>Libify library dashboard</h4>
            <p className="card-body">
              Circulation, stock and member activity on one screen. Built for a
              real library workflow rather than a generic admin panel.
            </p>
            <Tag tone="accent-2" className="self-start">
              Nearing completion
            </Tag>
          </article>

          <article className="card elev-sm">
            <span className="card-kicker">Commercial</span>
            <CountUp
              value={site.revenueLast6Months}
              className={styles.revenueValue}
            />
            <p className="card-body" style={{ marginTop: "var(--space-1)" }}>
              Revenue over the last six months, from contract engineering and
              product work.
            </p>
            <div className={styles.tagRow}>
              <Tag tone="neutral">Fabel5</Tag>
              <Tag tone="neutral">Mythos</Tag>
              <Tag tone="neutral">Gemini</Tag>
            </div>
          </article>
        </Reveal>
      </section>

      {/* -----------------------------------------------------------------
          Contact — the form is the point of the section, so it takes the
          larger half. The left rail carries the reasons to use it plus the
          two direct routes for anyone who would rather not fill in a form. */}
      <section id="contact" className={styles.contact}>
        <Reveal>
          <div className={styles.contactPanel}>
            <div aria-hidden="true" className={`blob ${styles.contactBlob}`} />

            <div className={styles.contactCopy}>
              <h6 style={{ color: "var(--color-accent-700)" }}>Contact us</h6>
              <h2 className={styles.contactHeading}>
                Tell us what you want built.
              </h2>
              <p className={styles.contactLede}>
                Send a short note about the problem. If we are not the right
                team for it, we will say so and point you somewhere better.
              </p>

              <div className={styles.availability}>
                <span className={styles.availabilityDot} aria-hidden="true" />
                Taking on new work
              </div>

              <ul className={styles.contactDirect}>
                <li>
                  <a href={`mailto:${site.email}`}>
                    <Icon name="mail" size={16} />
                    <span>{site.email}</span>
                  </a>
                </li>
                <li>
                  <a href={site.phoneHref}>
                    <Icon name="phoneCall" size={16} />
                    <span>{site.phone}</span>
                  </a>
                </li>
              </ul>

              <p className={styles.contactNote}>Usually a reply within a day.</p>
            </div>

            <div className={styles.contactFormWrap}>
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
