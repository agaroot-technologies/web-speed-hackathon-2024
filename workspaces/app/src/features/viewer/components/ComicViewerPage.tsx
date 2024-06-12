import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { decrypt } from '@wsh-2024/image-encrypt/src/decrypt';

import { getImageUrl } from '../../../lib/image/getImageUrl';

const IMAGE_WIDTH = 1075;
const IMAGE_HEIGHT = 1518;

const _Canvas = styled.canvas`
  height: 100%;
  width: auto;
  flex-grow: 0;
  flex-shrink: 0;
  scroll-snap-align: center;
  aspect-ratio: ${IMAGE_WIDTH} / ${IMAGE_HEIGHT};

  @container (aspect-ratio >= ${IMAGE_WIDTH * 2} / ${IMAGE_HEIGHT}) {
    &:nth-child(2n+1) {
      scroll-margin-right: calc((100cqh / ${IMAGE_HEIGHT}) * ${IMAGE_WIDTH});
    }
    &:nth-child(2n) {
      scroll-margin-left: calc((100cqh / ${IMAGE_HEIGHT}) * ${IMAGE_WIDTH});
    }
  }
`;

type Props = {
  pageImageId: string;
};

export const ComicViewerPage = ({ pageImageId }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const isLoaded = useRef<boolean>(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry || !entry.isIntersecting || isLoaded.current) return;

      const image = new Image();
      image.src = getImageUrl({
        imageId: pageImageId,
      });
      await image.decode();
  
      const canvas = ref.current!;
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext('2d')!;
  
      decrypt({
        exportCanvasContext: ctx,
        sourceImage: image,
        sourceImageInfo: {
          height: image.naturalHeight,
          width: image.naturalWidth,
        },
      });
  
      canvas.setAttribute('role', 'img');
      isLoaded.current = true;
    });
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [pageImageId]);

  return <_Canvas ref={ref} />;
};
