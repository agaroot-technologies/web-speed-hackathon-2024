import styled from 'styled-components';

import { ComicViewerCore } from '../../../features/viewer/components/ComicViewerCore';

const IMAGE_WIDTH = 1075;
const IMAGE_HEIGHT = 1518;

const MIN_VIEWER_HEIGHT = 500;
const MAX_VIEWER_HEIGHT = 650;

const MIN_PAGE_WIDTH = Math.floor((MIN_VIEWER_HEIGHT / IMAGE_HEIGHT) * IMAGE_WIDTH);

const _Container = styled.div`
  position: relative;
  container-type: inline-size;
  width: 100vw;
  max-width: 1024px;
`;

const _Wrapper = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  overflow: hidden;
  height: clamp(${MIN_VIEWER_HEIGHT}px, calc((100cqw / ${IMAGE_WIDTH}) * ${IMAGE_HEIGHT}), ${MAX_VIEWER_HEIGHT}px);

  @container (min-width: ${MIN_PAGE_WIDTH * 2}px) {
    height: clamp(${MIN_VIEWER_HEIGHT}px, calc(((100cqw / 2) / ${IMAGE_WIDTH}) * ${IMAGE_HEIGHT}), ${MAX_VIEWER_HEIGHT}px);
  }
`;

type Props = {
  episodeId: string;
};

export const ComicViewer: React.FC<Props> = ({ episodeId }) => {
  return (
    <_Container>
      <_Wrapper>
        <ComicViewerCore episodeId={episodeId} />
      </_Wrapper>
    </_Container>
  );
};
