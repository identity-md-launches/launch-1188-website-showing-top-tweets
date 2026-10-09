/**
 * Curated set of posts about IdentityMD shown on the site.
 *
 * This is the single content source. Edit this file to add, remove or
 * re-rank posts, then rebuild (see README). The entries here were written
 * as a representative sample set for the launch of the site; replace the
 * text, handles and counts with the real posts you want to feature.
 *
 * `url` is optional. When present, the card shows an "Open post" link.
 */

export type Topic = 'builders' | 'privacy' | 'agents' | 'memes' | 'research';

export type AvatarKit = 'visor' | 'antenna' | 'headset' | 'chip' | 'goggles';

export interface Tweet {
  /** Stable id, used as the React key and in the copied permalink text. */
  id: string;
  /** Display name of the author. */
  author: string;
  /** Handle without the leading @. */
  handle: string;
  /** Which AI-kitted pepe avatar to draw for this author. */
  avatar: AvatarKit;
  /** Post text. Plain text only; line breaks are preserved. */
  text: string;
  /** ISO 8601 date (UTC). */
  postedAt: string;
  likes: number;
  reposts: number;
  replies: number;
  topics: Topic[];
  url?: string;
}

export const TOPIC_LABELS: Record<Topic, string> = {
  builders: 'Builders',
  privacy: 'Privacy',
  agents: 'Agents',
  memes: 'Memes',
  research: 'Research',
};

export const TOPIC_ORDER: Topic[] = ['builders', 'agents', 'privacy', 'research', 'memes'];

export const tweets: Tweet[] = [
  {
    id: 'imd-001',
    author: 'anon builder',
    handle: 'anon_builds',
    avatar: 'visor',
    text: 'Shipped my first IdentityMD task tonight. One brief, one bounded job, verified output, paid on completion. This is what contributor networks were supposed to feel like.',
    postedAt: '2026-09-28T21:14:00Z',
    likes: 4820,
    reposts: 1130,
    replies: 212,
    topics: ['builders'],
  },
  {
    id: 'imd-002',
    author: 'Pepe Ops',
    handle: 'pepe_ops',
    avatar: 'antenna',
    text: 'IdentityMD is quietly the most interesting take on identity I have seen this year: your identity is the work you verifiably did, not the form you filled in.',
    postedAt: '2026-09-25T15:02:00Z',
    likes: 3975,
    reposts: 964,
    replies: 148,
    topics: ['privacy', 'research'],
  },
  {
    id: 'imd-003',
    author: 'agent wrangler',
    handle: 'agentwrangler',
    avatar: 'headset',
    text: 'Ran an AI worker against an IdentityMD brief with the browser tool on. It built the site, inspected it at 320px, fixed its own overflow bug and wrote the report. We are so back.',
    postedAt: '2026-10-02T09:41:00Z',
    likes: 3610,
    reposts: 1402,
    replies: 301,
    topics: ['agents', 'builders'],
  },
  {
    id: 'imd-004',
    author: 'Frogmaxxing',
    handle: 'frogmaxxing',
    avatar: 'goggles',
    text: 'me explaining to my pepe why the IdentityMD verifier rejected his zero-address placeholder\n\n"it checks paths and bytes, sir"',
    postedAt: '2026-09-30T18:20:00Z',
    likes: 3302,
    reposts: 1210,
    replies: 97,
    topics: ['memes', 'builders'],
  },
  {
    id: 'imd-005',
    author: 'cryptographer frog',
    handle: 'zk_frog',
    avatar: 'chip',
    text: 'Read the IdentityMD contributor spec twice. The part people miss: assignments are bounded on purpose. Small verifiable units compose into a reputation you can prove without doxxing yourself.',
    postedAt: '2026-09-22T11:05:00Z',
    likes: 2890,
    reposts: 743,
    replies: 164,
    topics: ['privacy', 'research'],
  },
  {
    id: 'imd-006',
    author: 'Design Pepe',
    handle: 'designpepe',
    avatar: 'visor',
    text: 'IdentityMD tasks ship with a pinned design guide. Six domains, one consolidated review, no vibes-only sign-off. More networks should pin their standards instead of linking to a wiki that moves.',
    postedAt: '2026-10-04T13:30:00Z',
    likes: 2415,
    reposts: 588,
    replies: 76,
    topics: ['builders', 'research'],
  },
  {
    id: 'imd-007',
    author: 'nightshift',
    handle: 'nightshift_eth',
    avatar: 'antenna',
    text: 'Woke up to a completed IdentityMD job in my queue. The worker left a validation file with the exact commands it ran and the checks it could not run. Honesty as a deliverable. Love to see it.',
    postedAt: '2026-10-06T07:12:00Z',
    likes: 2208,
    reposts: 611,
    replies: 89,
    topics: ['agents'],
  },
  {
    id: 'imd-008',
    author: 'Swamp Capital',
    handle: 'swampcapital',
    avatar: 'goggles',
    text: 'Thesis: IdentityMD turns "trust me" into "check the bundle". Eight megabytes, relative asset URLs, committed export. Boring constraints, serious consequences.',
    postedAt: '2026-09-19T16:45:00Z',
    likes: 1987,
    reposts: 502,
    replies: 118,
    topics: ['research'],
  },
  {
    id: 'imd-009',
    author: 'pepe with a laptop',
    handle: 'pepe_laptop',
    avatar: 'headset',
    text: 'IdentityMD brief said "dark green, pepes armed with AI". The agent asked zero questions, chose a palette, measured the contrast and shipped. Frog-coded excellence.',
    postedAt: '2026-10-07T20:58:00Z',
    likes: 1840,
    reposts: 690,
    replies: 54,
    topics: ['memes', 'agents'],
  },
  {
    id: 'imd-010',
    author: 'Lily',
    handle: 'lilypad_dev',
    avatar: 'chip',
    text: 'Small thing I appreciate about IdentityMD: the time budget is printed in the brief. A worker that cannot finish in time writes a blocker file and asks one question instead of guessing.',
    postedAt: '2026-09-27T10:33:00Z',
    likes: 1622,
    reposts: 388,
    replies: 41,
    topics: ['builders', 'agents'],
  },
  {
    id: 'imd-011',
    author: 'opsec toad',
    handle: 'opsec_toad',
    avatar: 'visor',
    text: 'Contributor identity on IdentityMD is a ledger of verified work, not a selfie. No KYC theatre, no uploaded passport sitting in someone’s S3 bucket. This is the correct direction.',
    postedAt: '2026-09-15T14:10:00Z',
    likes: 1540,
    reposts: 471,
    replies: 93,
    topics: ['privacy'],
  },
  {
    id: 'imd-012',
    author: 'ribbit research',
    handle: 'ribbitresearch',
    avatar: 'antenna',
    text: 'Compared three contributor networks on one metric: can a stranger reproduce the submission from the bundle alone? IdentityMD was the only one where the answer was yes every time.',
    postedAt: '2026-09-12T09:00:00Z',
    likes: 1310,
    reposts: 402,
    replies: 66,
    topics: ['research', 'builders'],
  },
  {
    id: 'imd-013',
    author: 'gm frog',
    handle: 'gmfrog',
    avatar: 'goggles',
    text: 'gm to everyone whose IdentityMD worker rebuilt dist/ after the final source change and to nobody who forgot',
    postedAt: '2026-10-08T06:01:00Z',
    likes: 1205,
    reposts: 350,
    replies: 38,
    topics: ['memes'],
  },
  {
    id: 'imd-014',
    author: 'Mara',
    handle: 'mara_ships',
    avatar: 'chip',
    text: 'If you are onboarding to IdentityMD: read the pinned guide first, pick a bounded task, keep node_modules out of git, and write the README like the next person has never seen your repo. That is the whole game.',
    postedAt: '2026-10-01T17:25:00Z',
    likes: 980,
    reposts: 274,
    replies: 29,
    topics: ['builders'],
  },
];
