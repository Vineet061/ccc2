"use client";

import { useState } from "react";

import { Icon } from "./Icon";
import styles from "./VideoEmbed.module.css";

type VideoEmbedProps = {
  /** YouTube video id, e.g. "4vF9o-Y0iec". */
  id: string;
  /** Describes the video for screen readers and titles the player frame. */
  title: string;
  /** Small overline drawn across the bottom of the poster. */
  caption?: string;
};

/**
 * Click-to-play YouTube embed. Renders a poster and a play button; the iframe
 * is only mounted once the visitor clicks, so no third-party script, cookie or
 * player payload is loaded with the page.
 *
 * Uses youtube-nocookie.com, which does not set tracking cookies until the
 * video is actually played.
 */
export function VideoEmbed({ id, title, caption }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  if (playing) {
    return (
      <div className={styles.frame}>
        <iframe
          className={styles.player}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className={styles.frame}
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
    >
      {posterFailed ? (
        <span className={styles.fallback} aria-hidden="true" />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element --
           A single fixed third-party thumbnail: next/image would add a proxy
           hop and a remote-pattern entry for no benefit here. */
        <img
          className={styles.poster}
          src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setPosterFailed(true)}
        />
      )}

      <span className={styles.scrim} aria-hidden="true" />

      <span className={styles.play} aria-hidden="true">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={styles.playIcon}
          focusable="false"
        >
          <path d="M8 5.2v13.6a1 1 0 0 0 1.52.85l11-6.8a1 1 0 0 0 0-1.7l-11-6.8A1 1 0 0 0 8 5.2z" />
        </svg>
      </span>

      {caption && (
        <span className={styles.caption}>
          <Icon name="mobile" size={12} /> {caption}
        </span>
      )}
    </button>
  );
}
