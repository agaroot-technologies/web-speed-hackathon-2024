import { getImageUrl } from './getImageUrl'

type Params = {
  height?: number;
  imageId: string;
  width?: number;
};

export function getImageSrc({ height, imageId, width }: Params) {
  const src = getImageUrl({ height, imageId, width })
  const srcSet = [src];
  if (height && width) {
    srcSet.push(`${getImageUrl({ height: height * 2, imageId, width: width * 2 })} 2x`);
  }
  return { src, srcSet: srcSet.join(', ') };
}
