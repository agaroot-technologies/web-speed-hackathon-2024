type Params = {
  height?: number;
  imageId: string;
  width?: number;
};

export function getImageUrl({ height, imageId, width }: Params): string {
  const url = new URL(`/images/${imageId}`, location.href);
  if (!!width && !!height) {
    return `${url.href}-${width}x${height}.webp`;
  }
  return `${url.href}.webp`;
}
