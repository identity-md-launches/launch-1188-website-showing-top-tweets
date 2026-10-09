const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
const full = new Intl.NumberFormat('en');
const dateFmt = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

/** 4820 -> "4.8K"; used for the visible count. */
export function formatCompact(n: number): string {
  return compact.format(n);
}

/** 4820 -> "4,820"; used for the accessible full value. */
export function formatFull(n: number): string {
  return full.format(n);
}

export function formatDate(iso: string): string {
  return dateFmt.format(new Date(iso));
}

/** Pluralized, fully templated count sentence for the results status. */
export function resultsLabel(count: number, total: number): string {
  if (count === total) {
    return count === 1 ? 'Showing 1 post' : `Showing all ${full.format(count)} posts`;
  }
  return count === 1
    ? `Showing 1 of ${full.format(total)} posts`
    : `Showing ${full.format(count)} of ${full.format(total)} posts`;
}
