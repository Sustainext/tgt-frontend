'use client';

import { useApiErrorHandler } from '../../utils/hooks/useApiErrorHandler';

export default function GlobalErrorHandler() {
  useApiErrorHandler();
  return null;
}
