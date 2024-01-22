import { describe, test, expect } from "vitest";

import { uniq } from "./set";

describe("array/set", () => {
  describe("uniq", () => {
    test("mixed primatives", () => {
      const i = [1, "a", 1, "a", true, false, true, "b", "b"];
      const o = [1, "a", true, false, "b"];

      expect(uniq(i)).toStrictEqual(o);
    });

    test("objects", () => {
      const i = [
        { k: 1, v: "a" },
        { k: 1, v: "a" },
        { k: 1, v: "b" },
        { k: 2, v: "a" },
      ];

      const o = [
        { k: 1, v: "a" },
        { k: 1, v: "b" },
        { k: 2, v: "a" },
      ];

      expect(uniq(i)).toStrictEqual(o);
    });

    test("mixed primatives & objects", () => {
        const i = [
            { k: 1, v: "a" },
            { k: 1, v: "a" },
            { k: 1, v: "b" },
            { k: 2, v: "a" },
            1,
            1,
            "a",
            "b",
            "a"
          ];
    
          const o = [
            { k: 1, v: "a" },
            { k: 1, v: "b" },
            { k: 2, v: "a" },
            1,
            "a",
            "b"
          ];
    
          expect(uniq(i)).toStrictEqual(o);
    })
  });
});
