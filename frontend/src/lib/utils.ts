import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names and tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Reloads the current page
 * @param force If true, forces a reload from server instead of cache
 */
export function reloadPage(force: boolean = false) {
  window.location.reload(force);
}

/**
 * Resets the application state
 */
export function resetAppState() {
  // Clear any application state that needs to be reset
  localStorage.removeItem('verifyme_auth');
  // Reload the page to apply changes
  reloadPage(true);
}

/**
 * Format a date string to a more readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}