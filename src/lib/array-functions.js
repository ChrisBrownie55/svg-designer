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
  return array.reduce((result, item, index) => {
    if (index >= startIndex && index < endIndex) {
      return result.concat(array[index + 1]);
    }

    if (index === endIndex) {
      return result.concat(array[startIndex]);
    }

    return result.concat(item);
  }, []);
}
