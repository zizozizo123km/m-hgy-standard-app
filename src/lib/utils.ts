import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to combine class names, merging Tailwind classes efficiently.
 * Standard utility for robust conditional styling in React/Tailwind projects.
 * @param inputs Array of ClassValue inputs (strings, objects, arrays)
 * @returns Combined and merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a runtime duration in minutes into a human-readable string 
 * (e.g., "1 hr 35 min"). Essential for displaying movie/show metadata.
 * @param minutes The duration in minutes.
 * @returns Formatted time string.
 */
export function formatRuntime(minutes: number | null | undefined): string {
  if (minutes === null || minutes === undefined || minutes < 1) {
    return "N/A";
  }

  const minutesInt = Math.round(minutes);

  const hours = Math.floor(minutesInt / 60);
  const remainingMinutes = minutesInt % 60;

  let result = "";

  if (hours > 0) {
    result += `${hours} hr`;
  }

  if (remainingMinutes > 0) {
    if (result.length > 0) {
      result += " ";
    }
    result += `${remainingMinutes} min`;
  }

  return result || "Less than 1 min";
}

/**
 * Formats a number (like a view count) for display, often used for 
 * large numbers in Netflix-style statistics (e.g., 1234567 -> "1.2M").
 * @param num The number to format.
 * @returns Formatted string (e.g., "12.3K", "4.5M").
 */
export function formatLargeNumber(num: number): string {
    if (num < 1000) {
        return num.toString();
    }

    const units = [
        { value: 1e18, symbol: "E" },
        { value: 1e15, symbol: "P" },
        { value: 1e12, symbol: "T" },
        { value: 1e9, symbol: "B" },
        { value: 1e6, symbol: "M" },
        { value: 1e3, symbol: "K" },
    ];

    const unit = units.find(u => num >= u.value);

    if (unit) {
        return (num / unit.value).toFixed(1).replace(/\.0$/, '') + unit.symbol;
    }

    return num.toString();
}