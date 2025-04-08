import { toast } from 'react-toastify';
import { KeyboardEventHandler } from 'react';
export * from './constants';

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

export const delay = (cb: () => void, timeOut = 500) => Promise.resolve(setTimeout(cb, timeOut));

export function handleApiError(error: unknown): void {
  const errorMessage = error instanceof Error ? error.message : 'Что-то пошло не так';

  console.error('[Ошибка API]:', error);
  toast.error(errorMessage);
}
