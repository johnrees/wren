/**
 * Appends the first element onto the end of its input array
 * @param array
 */
export const loopify = (array: any[]): any[] => {
  return [...array, array[0]];
};

/**
 * Splits an array into groups that loop back to the first value
 * @param size
 * @param offset
 */
export const loopifyInGroups = (size: number, offset: number = 0) => (
  arr: any[]
): any[] => {
  let loopedArray = [];
  for (let i = 0; i < arr.length; i++) {
    let current = i + offset * i;
    let nextItems = [];
    for (let j = 1; j < size; j++) {
      let index;
      if (current + j < arr.length) {
        index = current + j;
      } else {
        index = current + j - arr.length;
      }
      nextItems.push(arr[index]);
    }
    if (current < arr.length) {
      loopedArray.push([arr[current], ...nextItems]);
    } else {
      break;
    }
  }
  return loopedArray;
};

export const loopifyInPairs = loopifyInGroups(2);

/**
 * Returns an valid index even when its input value is out of bounds
 * @param arrayLength
 */
export const safeIndex = (arrayLength: number) => (index: number): number => {
  if (index < 0) {
    return (arrayLength + index % arrayLength) % arrayLength;
  } else if (index >= arrayLength) {
    return index % arrayLength;
  } else {
    return index;
  }
};

/**
 * Wraps its input into an array
 * @param item
 */
export const wrap = <T>(item): [T] => [item];
