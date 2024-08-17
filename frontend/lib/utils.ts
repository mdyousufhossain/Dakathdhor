import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




type DebouncedFunction<T extends (...args: any[]) => void> = (...args: Parameters<T>) => void;

export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): DebouncedFunction<T> {
  let timeoutId: NodeJS.Timeout | undefined;
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
