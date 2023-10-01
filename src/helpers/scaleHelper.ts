// 处理图片比例
export function handleImageScale(image: HTMLImageElement) {
  const LONG_SIDE_LENGTH = 1024;
  const w: number = image.naturalWidth;
  const h: number = image.naturalHeight;
  const samScale = LONG_SIDE_LENGTH / Math.max(h, w)
  return {
    width: w,
    height: h,
    samScale
  }
}