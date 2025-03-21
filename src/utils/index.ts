import { KeyboardEventHandler } from 'react';

export function onEnterOrSpaceKeyDown(cb: (e) => void): KeyboardEventHandler<HTMLElement> {
  return (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      cb.apply(this, [e]);
    }
  };
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

export function formatTimeToRead(minutes: number): string {
  return `${minutes} min`;
}
