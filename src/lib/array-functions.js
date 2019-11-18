export function removeByIndex(array, index) {
  return array.filter((item, currentIndex) => currentIndex !== index);
}

export function replaceAtIndex(array, index, value) {
  return array.filter((item, currentIndex) => {
    if (currentIndex === index) {
      return value;
    }

    return item;
  });
}
