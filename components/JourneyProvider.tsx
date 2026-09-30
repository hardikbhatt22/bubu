'use client';

import { JourneyContext, useJourneyState } from '@/lib/useJourney';

export default function JourneyProvider({ children }: { children: React.ReactNode }) {
  const journey = useJourneyState();
  return <JourneyContext.Provider value={journey}>{children}</JourneyContext.Provider>;
}
