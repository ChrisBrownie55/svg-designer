export function removeByIndex(array, index) {
  return array.filter((item, currentIndex) => currentIndex !== index);
}

export function replaceAtIndex(array, index, value) {
  return array.map((item, currentIndex) => {
    if (currentIndex === index) {
      return value;
    }

    return item;
  });
}

export function moveToIndex(array, startIndex, endIndex) {
  let result = replaceAtIndex(array, startIndex, array[endIndex]);
  result = replaceAtIndex(result, endIndex, array[startIndex]);

  return result;
}
