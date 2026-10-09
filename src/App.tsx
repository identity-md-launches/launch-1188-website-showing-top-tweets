import { useEffect, useMemo, useState } from 'react';
import { FeedControls, isDefaultState } from './components/FeedControls';
import { PepeAvatar } from './components/PepeAvatar';
import { TweetCard } from './components/TweetCard';
import { TOPIC_ORDER, tweets, type Topic, type Tweet } from './data/tweets';
import { applyFeedState, DEFAULT_FEED_STATE, parseHash, toHash, type FeedState } from './lib/feed';
import { formatCompact, formatFull, resultsLabel } from './lib/format';

const SQUAD: Tweet['avatar'][] = ['visor', 'antenna', 'headset', 'chip', 'goggles'];

function readInitialState(): FeedState {
  if (typeof window === 'undefined') return DEFAULT_FEED_STATE;
  return parseHash(window.location.hash);
}

export function App() {
  const [state, setState] = useState<FeedState>(readInitialState);
  const [notice, setNotice] = useState('');

  // Keep the hash in sync so a filtered view can be shared. Default state clears it.
  useEffect(() => {
    const next = toHash(state);
    const current = window.location.hash;
    if (next === current || (next === '' && current === '#')) return;
    const url = `${window.location.pathname}${window.location.search}${next}`;
    window.history.replaceState(null, '', url);
  }, [state]);

  // Back/forward or a pasted hash updates the controls.
  useEffect(() => {
    const onHash = () => setState(parseHash(window.location.hash));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const visible = useMemo(() => applyFeedState(tweets, state), [state]);

  const counts = useMemo(() => {
    const base = { all: tweets.length } as Record<Topic | 'all', number>;
    for (const t of TOPIC_ORDER) base[t] = tweets.filter((x) => x.topics.includes(t)).length;
    return base;
  }, []);

  const totals = useMemo(
    () => ({
      likes: tweets.reduce((n, t) => n + t.likes, 0),
      reposts: tweets.reduce((n, t) => n + t.reposts, 0),
    }),
    [],
  );

  const status = resultsLabel(visible.length, tweets.length);
  const filtersActive = !isDefaultState(state);

  function clearFilters() {
    setState(DEFAULT_FEED_STATE);
    setNotice('Filters cleared');
    document.getElementById('feed-search')?.focus();
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="container site-header__inner">
          <a className="brand" href="#top" aria-label="IdentityMD top tweets, back to top">
            <PepeAvatar kit="visor" className="brand__mark" />
            <span className="brand__text">
              IdentityMD <span className="brand__sub">top tweets</span>
            </span>
          </a>
          <nav aria-label="Sections">
            <ul className="site-nav">
              <li>
                <a href="#feed">Feed</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="container hero__inner">
            <div className="hero__copy">
              <p className="eyebrow">Curated feed</p>
              <h1 className="hero__title" id="hero-title">
                Top tweets about IdentityMD
              </h1>
              <p className="hero__lead">
                The posts the contributor network keeps reposting: builders shipping bounded tasks, AI
                workers that verify their own output, and the frogs who meme it all.
              </p>
              <dl className="hero__stats">
                <div className="hero__stat">
                  <dt>Posts</dt>
                  <dd>{formatFull(tweets.length)}</dd>
                </div>
                <div className="hero__stat">
                  <dt>Likes</dt>
                  <dd>
                    <span className="visually-hidden">{formatFull(totals.likes)}</span>
                    <span aria-hidden="true">{formatCompact(totals.likes)}</span>
                  </dd>
                </div>
                <div className="hero__stat">
                  <dt>Reposts</dt>
                  <dd>
                    <span className="visually-hidden">{formatFull(totals.reposts)}</span>
                    <span aria-hidden="true">{formatCompact(totals.reposts)}</span>
                  </dd>
                </div>
              </dl>
              <a className="btn btn--primary" href="#feed">
                Browse the feed
              </a>
            </div>
            <div className="hero__art" aria-hidden="true">
              <div className="hero__glow" />
              <PepeAvatar kit="headset" className="hero__pepe" />
            </div>
          </div>
        </section>

        <section className="feed" id="feed" aria-labelledby="feed-title">
          <div className="container">
            <div className="section-head">
              <h2 id="feed-title">The feed</h2>
              <p className="section-head__hint">Search, pick a topic and sort. The link in the address bar follows your filters.</p>
            </div>

            <FeedControls state={state} onChange={setState} counts={counts} />

            <div className="feed__status-row">
              <p className="feed__status" role="status" aria-live="polite">
                {status}
              </p>
              {filtersActive && visible.length > 0 ? (
                <button type="button" className="btn btn--ghost" onClick={clearFilters}>
                  Clear filters
                </button>
              ) : null}
            </div>

            {visible.length > 0 ? (
              <ol className="grid" aria-label="Posts">
                {visible.map((t, i) => (
                  <li key={t.id}>
                    <TweetCard
                      tweet={t}
                      rank={i + 1}
                      onCopied={(x) => setNotice(`Copied post by @${x.handle}`)}
                      onCopyFailed={(x) =>
                        setNotice(`Unable to copy post by @${x.handle}. Select the text and copy it manually.`)
                      }
                    />
                  </li>
                ))}
              </ol>
            ) : (
              <div className="empty">
                <PepeAvatar kit="goggles" className="empty__pepe" />
                <p className="empty__title">
                  No posts match {state.query.trim() !== '' ? <>“{state.query.trim()}”</> : 'these filters'}
                </p>
                <p className="empty__hint">Try a shorter search term or a different topic.</p>
                <button type="button" className="btn btn--primary" onClick={clearFilters}>
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="about" id="about" aria-labelledby="about-title">
          <div className="container about__inner">
            <div className="about__copy">
              <h2 id="about-title">About this list</h2>
              <p>
                Posts are picked by hand, stored in one data file in the site source, and ranked by a weighted
                engagement score: likes count once, reposts twice and replies three times. Switch the sort to see
                the raw counts win instead.
              </p>
              <p>
                The site is a static export with relative asset URLs, so it can be served from any folder, gateway
                subpath or content-addressed host without a backend.
              </p>
            </div>
            <ul className="squad" aria-label="The AI-armed frog squad">
              {SQUAD.map((kit) => (
                <li key={kit} className="squad__member">
                  <PepeAvatar kit={kit} title={`Pepe with ${kit}`} className="squad__pepe" />
                  <span className="squad__label">{kit}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <p>Not affiliated with X Corp. Post text belongs to its authors.</p>
          <a href="#top">Back to top</a>
        </div>
      </footer>

      {/* Stable polite region for one-off notices (copy feedback, filters cleared). */}
      <p className="visually-hidden" role="status" aria-live="polite">
        {notice}
      </p>
    </>
  );
}
