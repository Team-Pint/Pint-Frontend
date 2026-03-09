// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 여러 클래스를 합치고(clsx), Tailwind 중복 클래스를 정리(twMerge)하는 함수
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}