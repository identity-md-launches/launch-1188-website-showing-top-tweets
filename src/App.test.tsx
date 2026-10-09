import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';
import { tweets } from './data/tweets';

beforeEach(() => {
  window.history.replaceState(null, '', '/');
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('App', () => {
  it('renders the landmarks, one h1 and every post', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main');
    expect(within(screen.getByRole('list', { name: 'Posts' })).getAllByRole('article')).toHaveLength(tweets.length);
    // Two stable polite regions: the results count and the one-off notice.
    expect(screen.getAllByRole('status')).toHaveLength(2);
    expect(screen.getByText(`Showing all ${tweets.length} posts`)).toBeInTheDocument();
  });

  it('filters by search, shows an empty state and clears it', async () => {
    const user = userEvent.setup();
    render(<App />);
    const search = screen.getByRole('searchbox', { name: 'Search posts' });
    await user.type(search, 'verifier');
    expect(screen.getByText(`Showing 1 of ${tweets.length} posts`)).toBeInTheDocument();
    expect(window.location.hash).toBe('#q=verifier');

    await user.clear(search);
    await user.type(search, 'xyzzy');
    expect(screen.getByText(/No posts match/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(screen.getByText(`Showing all ${tweets.length} posts`)).toBeInTheDocument();
    expect(search).toHaveFocus();
    expect(window.location.hash).toBe('');
  });

  it('filters by topic radio and sorts by select', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('radio', { name: /^Memes/ }));
    const memes = tweets.filter((t) => t.topics.includes('memes')).length;
    expect(screen.getByText(`Showing ${memes} of ${tweets.length} posts`)).toBeInTheDocument();
    expect(window.location.hash).toBe('#topic=memes');

    await user.selectOptions(screen.getByRole('combobox', { name: 'Sort by' }), 'newest');
    const first = within(screen.getByRole('list', { name: 'Posts' })).getAllByRole('article')[0]!;
    expect(within(first).getByRole('heading', { level: 3 })).toHaveTextContent('gm frog');
    expect(window.location.hash).toBe('#topic=memes&sort=newest');
  });

  it('restores state from the hash on load', () => {
    window.history.replaceState(null, '', '/#topic=privacy&sort=likes');
    render(<App />);
    expect(screen.getByRole('radio', { name: /^Privacy/ })).toBeChecked();
    expect(screen.getByRole('combobox', { name: 'Sort by' })).toHaveValue('likes');
  });

  it('copies a post and announces it', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    render(<App />);
    const first = within(screen.getByRole('list', { name: 'Posts' })).getAllByRole('article')[0]!;
    await user.click(within(first).getByRole('button', { name: /Copy text/ }));
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText.mock.calls[0]![0]).toContain('@');
    expect(within(first).getByRole('button', { name: /Copied/ })).toBeInTheDocument();
    expect(screen.getByText(/Copied post by @/)).toBeInTheDocument();
  });

  it('reports a copy failure with a recovery hint', async () => {
    const user = userEvent.setup();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
      configurable: true,
    });
    render(<App />);
    const first = within(screen.getByRole('list', { name: 'Posts' })).getAllByRole('article')[0]!;
    await user.click(within(first).getByRole('button', { name: /Copy text/ }));
    expect(screen.getByText(/Unable to copy post/)).toBeInTheDocument();
  });
});
