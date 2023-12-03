import { describe, test, expect } from "vitest";
import { FileType, getExtAndType } from "./index";

describe("[filetypes] getExtAndType", () => {
  test("simple filename", () => {
    const et = getExtAndType("/my/filename.stl");
    expect(et).toStrictEqual({ type: FileType.TDFILE, ext: "stl" });
  });

  test("uppercase dirname", () => {
    const et = getExtAndType("/MY/UPPER/DIR/filename.stl");
    expect(et).toStrictEqual({ type: FileType.TDFILE, ext: "stl" });
  });

  test("uppercase filename", () => {
    const et = getExtAndType("/my/FILENAME.CHITU");
    expect(et).toStrictEqual({ type: FileType.SUPPORTCONFIG, ext: "chitu" });
  });

  test("uppercase names", () => {
    const et = getExtAndType("/SOME/PATHNAME/FILENAME.CHITU");
    expect(et).toStrictEqual({ type: FileType.SUPPORTCONFIG, ext: "chitu" });
  });

  test("not dotted filename", () => {
    const et = getExtAndType("/my/filenamestl");
    expect(et).toStrictEqual({ type: FileType.OTHER, ext: "/my/filenamestl" });
  });

  test("multiple dots", () => {
    const et = getExtAndType("/my.dirs/tes.ted/file.na.me.stl");
    expect(et).toStrictEqual({ type: FileType.TDFILE, ext: "stl" });
  });

  test("undefined filename", () => {
    const et = getExtAndType(undefined as any);
    expect(et).toStrictEqual({ type: FileType.OTHER, ext: "" });
  });

  test("special characters filename", () => {
    const et = getExtAndType(
      "/Public Domain/Filenames/Special Characters , + _ - ! £ $ % ^ & ( ) ¬ ~ @ [ ] ` { } #/Special Characters , + _ - ! £ $ % ^ & ( ) ¬ ~ @ [ ] ` { } #.png"
    );
    expect(et).toStrictEqual({ type: FileType.IMAGE, ext: "png" });
  });
});
