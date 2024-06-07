import { Suspense, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { useEpisode } from '../../episode/hooks/useEpisode';

import { ComicViewerPage } from './ComicViewerPage';

const IMAGE_WIDTH = 1075;
const IMAGE_HEIGHT = 1518;

const _Container = styled.div`
  position: relative;
  container-type: size;
`;

const _Wrapper = styled.div`
  --page-width: calc((100cqh / ${IMAGE_HEIGHT}) * ${IMAGE_WIDTH});
  --padding-inline: calc((100cqw - var(--page-width)) / 2);

  background-color: black;
  cursor: grab;
  direction: rtl;
  display: grid;
  grid-auto-columns: var(--page-width);
  grid-auto-flow: column;
  grid-template-rows: minmax(auto, 100%);
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  overscroll-behavior: none;
  padding-inline: var(--padding-inline);
  touch-action: none;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none;
  }

  @container (aspect-ratio >= ${IMAGE_WIDTH * 2} / ${IMAGE_HEIGHT}) {
    --padding-inline: calc((100cqw - var(--page-width) * 2) / 2 + var(--page-width));
  }
`;

type Props = {
  episodeId: string;
};

const ComicViewerCore: React.FC<Props> = ({ episodeId }) => {
  const { data: episode } = useEpisode({ params: { episodeId } });

  const scrollViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollView = scrollViewRef.current;
    if (!scrollView) return;

    let isPressed = false;

    const handlePointerDown = (ev: PointerEvent) => {
      const scrollView = ev.currentTarget as HTMLDivElement;
      isPressed = true;
      scrollView.style.cursor = 'grabbing';
      scrollView.style.scrollSnapType = 'none';
      scrollView.setPointerCapture(ev.pointerId);
    };

    const handlePointerMove = (ev: PointerEvent) => {
      if (isPressed) {
        const scrollView = ev.currentTarget as HTMLDivElement;
        scrollView.scrollBy({
          behavior: 'instant',
          left: -1 * ev.movementX,
        });
      }
    };

    const handlePointerUp = (ev: PointerEvent) => {
      const scrollView = ev.currentTarget as HTMLDivElement;
      isPressed = false;
      scrollView.style.cursor = 'grab';
      scrollView.style.scrollSnapType = 'x mandatory';
      scrollView.releasePointerCapture(ev.pointerId);
    };

    scrollView.addEventListener('pointerdown', handlePointerDown, { passive: true });
    scrollView.addEventListener('pointermove', handlePointerMove, { passive: true });
    scrollView.addEventListener('pointerup', handlePointerUp, { passive: true });

    return () => {
      scrollView.removeEventListener('pointerdown', handlePointerDown);
      scrollView.removeEventListener('pointermove', handlePointerMove);
      scrollView.removeEventListener('pointerup', handlePointerUp);
    };
  });

  return (
    <_Container>
      <_Wrapper ref={scrollViewRef}>
        {episode.pages.map((page) => {
          return <ComicViewerPage key={page.id} pageImageId={page.image.id} />;
        })}
      </_Wrapper>
    </_Container>
  );
};

const ComicViewerCoreWithSuspense: React.FC<Props> = ({ episodeId }) => {
  return (
    <Suspense fallback={null}>
      <ComicViewerCore episodeId={episodeId} />
    </Suspense>
  );
};

export { ComicViewerCoreWithSuspense as ComicViewerCore };
