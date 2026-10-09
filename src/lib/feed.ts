import type { Topic, Tweet } from '../data/tweets';

export type SortKey = 'top' | 'likes' | 'reposts' | 'newest';

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'top', label: 'Top overall' },
  { value: 'likes', label: 'Most liked' },
  { value: 'reposts', label: 'Most reposted' },
  { value: 'newest', label: 'Newest' },
];

export interface FeedState {
  query: string;
  topic: Topic | 'all';
  sort: SortKey;
}

export const DEFAULT_FEED_STATE: FeedState = { query: '', topic: 'all', sort: 'top' };

/** Weighted engagement score used by the "Top overall" sort. */
export function engagementScore(t: Pick<Tweet, 'likes' | 'reposts' | 'replies'>): number {
  return t.likes + t.reposts * 2 + t.replies * 3;
}

function normalize(s: string): string {
  return s.normalize('NFKD').toLowerCase().trim();
}

export function matchesQuery(t: Tweet, query: string): boolean {
  const q = normalize(query);
  if (q === '') return true;
  const haystack = normalize(`${t.text} ${t.author} @${t.handle}`);
  return haystack.includes(q);
}

export function sortTweets(list: Tweet[], sort: SortKey): Tweet[] {
  const copy = [...list];
  switch (sort) {
    case 'likes':
      return copy.sort((a, b) => b.likes - a.likes);
    case 'reposts':
      return copy.sort((a, b) => b.reposts - a.reposts);
    case 'newest':
      return copy.sort((a, b) => Date.parse(b.postedAt) - Date.parse(a.postedAt));
    case 'top':
    default:
      return copy.sort((a, b) => engagementScore(b) - engagementScore(a));
  }
}

export function applyFeedState(list: Tweet[], state: FeedState): Tweet[] {
  const filtered = list.filter(
    (t) => (state.topic === 'all' || t.topics.includes(state.topic)) && matchesQuery(t, state.query),
  );
  return sortTweets(filtered, state.sort);
}

const TOPICS: Topic[] = ['builders', 'privacy', 'agents', 'memes', 'research'];
const SORTS: SortKey[] = ['top', 'likes', 'reposts', 'newest'];

/** Parse `#topic=agents&sort=newest&q=verify` into a feed state. Unknown values fall back to defaults. */
export function parseHash(hash: string): FeedState {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  const topic = params.get('topic');
  const sort = params.get('sort');
  const query = params.get('q') ?? '';
  return {
    query,
    topic: topic !== null && (TOPICS as string[]).includes(topic) ? (topic as Topic) : 'all',
    sort: sort !== null && (SORTS as string[]).includes(sort) ? (sort as SortKey) : 'top',
  };
}

/** Serialize a feed state to a hash. Default values are omitted; the default state yields an empty string. */
export function toHash(state: FeedState): string {
  const params = new URLSearchParams();
  if (state.topic !== 'all') params.set('topic', state.topic);
  if (state.sort !== 'top') params.set('sort', state.sort);
  if (state.query.trim() !== '') params.set('q', state.query.trim());
  const s = params.toString();
  return s === '' ? '' : `#${s}`;
}
