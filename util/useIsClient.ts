'use client';

import { useSyncExternalStore } from 'react';

// Use a store that never changes (no-op subscribe)
const emptySubscribe = () => () => {};

/**
 * Hook that tells us if we are currently client-side or not.
 */
function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // Client snapshot: always returns true
    () => false, // Server snapshot: returns false during SSR/hydration
  );
}

export default useIsClient;
