function getImageSize(obj) {
  let imageSize = '';
  if (
    document.documentElement.clientWidth >= 320 &&
    document.documentElement.clientWidth < 768
  ) {
    imageSize = obj.mobile;
    return imageSize;
  }
  if (
    document.documentElement.clientWidth >= 768 &&
    document.documentElement.clientWidth < 1024
  ) {
    imageSize = obj.tablet;
    return imageSize;
  }
  if (document.documentElement.clientWidth >= 1024) {
    imageSize = obj.desktop;
    return imageSize;
  }
}

export default getImageSize;
