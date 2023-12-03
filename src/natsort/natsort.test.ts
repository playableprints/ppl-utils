import { describe, test, expect } from "vitest";

import natsort, {casesort} from ".";

const toStrings = <T>(arr: T[]) => {
  return arr.map((v) => String(v));
};

const inputs = [
  [0.8, 7, 5, 99, 3, 5.1, 5.2, 10, 1],
  ["D", "A", "b", "C", "c", "a", "A"],
  ["A", "a", "10", "1"],
];

describe("natsort", () => {
  test("numbers only", () => {
    const i = inputs[0] as number[];
    // You can only natsort strings
    const o = toStrings(i).sort(natsort);
    expect(o).toStrictEqual(toStrings([0.8, 1, 3, 5, 5.1, 5.2, 7, 10, 99]));
  });

  test("mixed case", () => {
    const i = inputs[1] as string[];
    const o = i.sort(natsort);
    expect(o).toStrictEqual(["A", "a", "A", "b", "C", "c", "D"]);
  });

  test("mixed numbers & letters", () => {
    const i = inputs[2] as string[];
    const o = i.sort(natsort);
    expect(o).toStrictEqual(["1", "10", "A", "a"]);
  });
});

describe("casesort", () => {
    test("numbers only", () => {
        const i = inputs[0] as number[];
        // You can only natsort strings
        const o = toStrings(i).sort(casesort);
        expect(o).toStrictEqual(toStrings([0.8, 1, 3, 5, 5.1, 5.2, 7, 10, 99]));
      });
    
      test("mixed case", () => {
        const i = inputs[1] as string[];
        const o = i.sort(casesort);
        expect(o).toStrictEqual(["a", "A", "A", "b", "c", "C", "D"]);
      });
    
      test("mixed numbers & letters", () => {
        const i = inputs[2] as string[];
        const o = i.sort(casesort);
        expect(o).toStrictEqual(["1", "10", "a", "A"]);
      });
})
