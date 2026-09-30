import JourneyProvider from '@/components/JourneyProvider';
import Atmosphere from '@/components/atmosphere/Atmosphere';
import ChapterRail from '@/components/primitives/ChapterRail';
import AmbientSound from '@/components/primitives/AmbientSound';
import ResumeNote from '@/components/primitives/ResumeNote';

import S01Door from '@/components/scenes/S01Door';
import S02Square from '@/components/scenes/S02Square';
import S03Bubu from '@/components/scenes/S03Bubu';
import S04Ordinary from '@/components/scenes/S04Ordinary';
import S05Wrapper from '@/components/scenes/S05Wrapper';
import S06Majari from '@/components/scenes/S06Majari';
import S07Junagadh from '@/components/scenes/S07Junagadh';
import S08Stalls from '@/components/scenes/S08Stalls';
import S09Drive from '@/components/scenes/S09Drive';
import S10Bhavnagar from '@/components/scenes/S10Bhavnagar';
import S11TwoMinutes from '@/components/scenes/S11TwoMinutes';
import S12Promises from '@/components/scenes/S12Promises';
import S13Ticket from '@/components/scenes/S13Ticket';
import S14Letter from '@/components/scenes/S14Letter';
import S15Lit from '@/components/scenes/S15Lit';

/**
 * ONE ROUTE. ONE WALK.
 *
 * There is deliberately no router here. Page navigation would break both the
 * single-walk illusion and the shared atmosphere state — the scenes are places
 * in one continuous square, not pages in a site.
 */
export default function Page() {
  return (
    <JourneyProvider>
      <Atmosphere />
      <ChapterRail />
      <AmbientSound />
      <ResumeNote />

      {/* The rail is fixed to the left edge, so the walk gets a gutter wide
          enough to clear it between md and xl. Past xl the centred max-width
          containers already leave more room than the rail occupies. */}
      <main className="relative z-10 md:pl-16 xl:pl-0">
        <S01Door />
        <S02Square />
        <S03Bubu />
        <S04Ordinary />
        <S05Wrapper />
        <S06Majari />
        <S07Junagadh />
        <S08Stalls />
        <S09Drive />
        <S10Bhavnagar />
        <S11TwoMinutes />
        <S12Promises />
        <S13Ticket />
        <S14Letter />
        <S15Lit />
      </main>
    </JourneyProvider>
  );
}
