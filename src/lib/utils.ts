import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { KeyboardEventHandler } from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function onEnterOrSpaceKeyDown(cb: (e) => void): KeyboardEventHandler<HTMLElement> {
  return (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      cb.apply(this, [e]);
    }
  };
}
