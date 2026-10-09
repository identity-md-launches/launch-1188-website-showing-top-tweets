import { useEffect, useRef, useState } from 'react';
import { TOPIC_LABELS, type Tweet } from '../data/tweets';
import { formatCompact, formatDate, formatFull } from '../lib/format';
import { CheckIcon, CopyIcon, ExternalIcon, HeartIcon, ReplyIcon, RepostIcon } from './Icons';
import { PepeAvatar } from './PepeAvatar';

interface Props {
  tweet: Tweet;
  rank: number;
  /** Called after a successful copy so the page can announce it once, politely. */
  onCopied: (tweet: Tweet) => void;
  /** Called when the clipboard is unavailable so the page can tell the reader. */
  onCopyFailed: (tweet: Tweet) => void;
}

const COPIED_RESET_MS = 2000;

export function tweetAsText(t: Tweet): string {
  return `${t.text}\n— ${t.author} (@${t.handle})`;
}

export function TweetCard({ tweet, rank, onCopied, onCopyFailed }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(tweetAsText(tweet));
      setCopied(true);
      onCopied(tweet);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), COPIED_RESET_MS);
    } catch {
      onCopyFailed(tweet);
    }
  }

  const headingId = `post-${tweet.id}-author`;

  return (
    <article className="card" aria-labelledby={headingId}>
      <div className="card__head">
        <span className="card__rank" aria-hidden="true">
          {rank}
        </span>
        <span className="visually-hidden">Rank {rank}. </span>
        <PepeAvatar kit={tweet.avatar} className="card__avatar" />
        <div className="card__who">
          <h3 className="card__author" id={headingId}>
            {tweet.author}
          </h3>
          <p className="card__meta">
            <span className="card__handle">@{tweet.handle}</span>
            <span aria-hidden="true"> · </span>
            <time dateTime={tweet.postedAt}>{formatDate(tweet.postedAt)}</time>
          </p>
        </div>
      </div>

      <p className="card__text">{tweet.text}</p>

      <ul className="card__topics" aria-label="Topics">
        {tweet.topics.map((topic) => (
          <li key={topic} className="tag">
            {TOPIC_LABELS[topic]}
          </li>
        ))}
      </ul>

      <div className="card__foot">
        <ul className="stats" aria-label="Engagement">
          <li className="stat">
            <ReplyIcon />
            <span className="visually-hidden">{formatFull(tweet.replies)} replies</span>
            <span aria-hidden="true">{formatCompact(tweet.replies)}</span>
          </li>
          <li className="stat">
            <RepostIcon />
            <span className="visually-hidden">{formatFull(tweet.reposts)} reposts</span>
            <span aria-hidden="true">{formatCompact(tweet.reposts)}</span>
          </li>
          <li className="stat">
            <HeartIcon />
            <span className="visually-hidden">{formatFull(tweet.likes)} likes</span>
            <span aria-hidden="true">{formatCompact(tweet.likes)}</span>
          </li>
        </ul>
        <div className="card__actions">
          {tweet.url ? (
            <a className="btn btn--ghost" href={tweet.url} target="_blank" rel="noopener noreferrer">
              <ExternalIcon />
              Open post
              <span className="visually-hidden"> by @{tweet.handle} (opens in a new tab)</span>
            </a>
          ) : null}
          <button type="button" className="btn btn--ghost" onClick={copy} data-copied={copied || undefined}>
            {copied ? <CheckIcon /> : <CopyIcon />}
            {copied ? 'Copied' : 'Copy text'}
            <span className="visually-hidden"> of post by @{tweet.handle}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
