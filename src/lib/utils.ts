import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate a simple browser fingerprint for like persistence.
// Memoized per session — canvas + btoa work runs once, not per mount/like.
let cachedFingerprint: string | null = null;

export const generateFingerprint = (): string => {
  if (cachedFingerprint) {
    return cachedFingerprint;
  }
  if (typeof window === 'undefined') return 'server';
  
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Browser fingerprint', 2, 2);
    }
    
    const fingerprint = btoa(
      (navigator.userAgent || '') + 
      (screen.width || 0) + 
      (screen.height || 0) + 
      (Intl.DateTimeFormat().resolvedOptions().timeZone || '') +
      (canvas.toDataURL() || '')
    ).slice(0, 16);
    
    cachedFingerprint = fingerprint;
    return fingerprint;
  } catch (error) {
    console.error('Error generating fingerprint:', error);
    if (!cachedFingerprint) {
      cachedFingerprint = Math.random().toString(36).substring(7);
    }
    return cachedFingerprint;
  }
};
