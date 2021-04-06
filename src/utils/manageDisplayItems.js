export const arraySize = (mobileSize, desktopSize) => {
  let size;
  (window.innerWidth <= 900) ? (size = mobileSize) : (size = desktopSize);
    return size;
};

export const moreItems = (itemsToShow, array, mobileSize, desktopSize) => {
  let addCertainItems = itemsToShow + 3;
  if (itemsToShow >= array.length) {
    if (window.innerWidth <= 1100) addCertainItems = desktopSize;
        else addCertainItems = desktopSize;
  }
  return addCertainItems;
};