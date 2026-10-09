import { describe, expect, it } from 'vitest';
import { tweets } from '../data/tweets';
import { applyFeedState, engagementScore, parseHash, sortTweets, toHash } from './feed';

describe('feed data', () => {
  it('has unique ids and at least one topic per post', () => {
    const ids = new Set(tweets.map((t) => t.id));
    expect(ids.size).toBe(tweets.length);
    for (const t of tweets) {
      expect(t.topics.length).toBeGreaterThan(0);
      expect(Number.isNaN(Date.parse(t.postedAt))).toBe(false);
    }
  });
});

describe('sortTweets', () => {
  it('sorts by weighted engagement for "top"', () => {
    const sorted = sortTweets(tweets, 'top');
    for (let i = 1; i < sorted.length; i++) {
      expect(engagementScore(sorted[i - 1]!)).toBeGreaterThanOrEqual(engagementScore(sorted[i]!));
    }
  });

  it('sorts by likes, reposts and date', () => {
    expect(sortTweets(tweets, 'likes')[0]!.id).toBe('imd-001');
    expect(sortTweets(tweets, 'reposts')[0]!.id).toBe('imd-003');
    expect(sortTweets(tweets, 'newest')[0]!.id).toBe('imd-013');
  });

  it('does not mutate the input', () => {
    const before = tweets.map((t) => t.id);
    sortTweets(tweets, 'newest');
    expect(tweets.map((t) => t.id)).toEqual(before);
  });
});

describe('applyFeedState', () => {
  it('filters by topic and query together', () => {
    const out = applyFeedState(tweets, { query: 'verifier', topic: 'memes', sort: 'top' });
    expect(out.map((t) => t.id)).toEqual(['imd-004']);
  });

  it('matches author and handle, case-insensitively', () => {
    expect(applyFeedState(tweets, { query: 'ZK_FROG', topic: 'all', sort: 'top' })).toHaveLength(1);
    expect(applyFeedState(tweets, { query: 'design pepe', topic: 'all', sort: 'top' })).toHaveLength(1);
  });

  it('returns nothing for a query with no match', () => {
    expect(applyFeedState(tweets, { query: 'zzzz-no-match', topic: 'all', sort: 'top' })).toHaveLength(0);
  });
});

describe('hash round trip', () => {
  it('omits defaults and restores non-defaults', () => {
    expect(toHash({ query: '', topic: 'all', sort: 'top' })).toBe('');
    const h = toHash({ query: 'ship it', topic: 'agents', sort: 'newest' });
    expect(parseHash(h)).toEqual({ query: 'ship it', topic: 'agents', sort: 'newest' });
  });

  it('ignores unknown values', () => {
    expect(parseHash('#topic=nope&sort=bogus')).toEqual({ query: '', topic: 'all', sort: 'top' });
  });
});
