/**
 * An async foreach that runs a callback on each item, synchronously.
 * 
 * @param array 
 * @param callback 
 */
export async function asyncForEach<T>(
  array: T[],
  callback: (value: T, idx?: number, array?: T[]) => Promise<void>
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
