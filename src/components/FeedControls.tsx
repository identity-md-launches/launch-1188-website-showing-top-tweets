import { TOPIC_LABELS, TOPIC_ORDER, type Topic } from '../data/tweets';
import { DEFAULT_FEED_STATE, SORT_OPTIONS, type FeedState, type SortKey } from '../lib/feed';
import { SearchIcon } from './Icons';

interface Props {
  state: FeedState;
  onChange: (next: FeedState) => void;
  counts: Record<Topic | 'all', number>;
}

export function isDefaultState(s: FeedState): boolean {
  return s.query.trim() === '' && s.topic === DEFAULT_FEED_STATE.topic && s.sort === DEFAULT_FEED_STATE.sort;
}

export function FeedControls({ state, onChange, counts }: Props) {
  const topics: (Topic | 'all')[] = ['all', ...TOPIC_ORDER];

  return (
    <div className="controls" role="group" aria-label="Filter and sort posts">
      <div className="controls__row">
        <div className="field field--search">
          <label className="field__label" htmlFor="feed-search">
            Search posts
          </label>
          <div className="field__input-wrap">
            <SearchIcon className="field__icon" />
            <input
              id="feed-search"
              className="field__input"
              type="search"
              name="q"
              autoComplete="off"
              spellCheck={false}
              placeholder="e.g. verifier"
              value={state.query}
              onChange={(e) => onChange({ ...state, query: e.target.value })}
            />
          </div>
        </div>

        <div className="field field--sort">
          <label className="field__label" htmlFor="feed-sort">
            Sort by
          </label>
          <select
            id="feed-sort"
            className="field__input field__select"
            name="sort"
            value={state.sort}
            onChange={(e) => onChange({ ...state, sort: e.target.value as SortKey })}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="chips">
        <legend className="field__label">Topic</legend>
        <div className="chips__list">
          {topics.map((t) => {
            const id = `topic-${t}`;
            const label = t === 'all' ? 'All topics' : TOPIC_LABELS[t];
            return (
              <label key={t} className="chip" htmlFor={id}>
                <input
                  id={id}
                  className="chip__input"
                  type="radio"
                  name="topic"
                  value={t}
                  checked={state.topic === t}
                  onChange={() => onChange({ ...state, topic: t })}
                />
                <span className="chip__face">
                  {label}
                  <span className="chip__count">
                    <span className="visually-hidden"> (</span>
                    {counts[t]}
                    <span className="visually-hidden"> posts)</span>
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
