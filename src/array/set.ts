export const difference = <T>(...arrays: T[][]) => {
  return arrays.reduce((a, b) => a.filter((c) => !b.includes(c)));
};

export const intersection = <T>(...arrays: T[][]) => {
  return arrays.reduce((a, b) => a.filter((c) => b.includes(c)));
};

export const uniq = <T>(array: T[]): T[] => {
  
  if (array.some((t) => t !== null && typeof t === 'object')){
    // Do a deep uniqueness
    return deepUniq(array as Object[]) as T[];
  }

  return [...new Set(array)];
};

const deepUniq = <T extends Object>(array: T[]): T[] => {

  const uniqs: {[key:string]: T} = {};

  array.forEach(t => {
    uniqs[Object.values(t).join(".")] = t
  })

  return Object.values(uniqs);
}

export const union = <T>(...arrays: T[][]): T[] => {
  return uniq(arrays.flat());
};
