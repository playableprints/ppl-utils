export const difference = <T>(...arrays: T[][]) => {
  return arrays.reduce((a, b) => a.filter((c) => !b.includes(c)));
};

export const intersection = <T>(...arrays: T[][]) => {
  return arrays.reduce((a, b) => a.filter((c) => b.includes(c)));
};

export const uniq = <T>(array: T[]) => {
  return [...new Set(array)];
};

export const union = <T>(...arrays: T[][]) => {
  return uniq(arrays.flat());
};
