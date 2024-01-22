enum FileType {
  IMAGE,
  TDFILE,
  COMPRESSSED,
  SUPPORTCONFIG,
  JSON,
  TEXT,
  MARKDOWN,
  ORYNT,
  PDF,
  OTHER,
}
export { FileType };

/**
 * Forward lookup table
 */

interface ITypeToExt {
  [k: string]: string[];
}

const type_to_ext: ITypeToExt = {
  [FileType.IMAGE]: ["jpg", "jpeg", "png", "jfif", "webp", "svg", "gif"],
  [FileType.TDFILE]: ["stl", "obj", "3mf"],
  [FileType.COMPRESSSED]: ["zip", "7z", "rar", "tar"],
  [FileType.SUPPORTCONFIG]: ["lys", "chitu", "chitubox"],
  [FileType.TEXT]: ["txt", "nfo"],
  [FileType.MARKDOWN]: ["md"],
  [FileType.JSON]: ["json"],
  [FileType.ORYNT]: ["orynt3d"],
  [FileType.PDF]: ["pdf"],
};

/**
 * Reverse lookup table
 *
 * ext_to_type = {
 *  "jpg": FileType.IMAGE,
 *   ...
 *  "stl": FileType.TDFILE
 * }
 *
 */

interface IExtToType {
  [k: string]: FileType;
}

const ext_to_type: IExtToType = {};

Object.keys(type_to_ext).forEach((t) => {
  type_to_ext[t].forEach((e) => {
    ext_to_type[e] = Number.parseInt(t) as FileType;
  });
});

export interface ExtType {
  type: FileType;
  ext: string;
}

/**
 * Pass an object with an `ext` field and return a FileType.
 *
 * @param p
 * @returns FileType enum
 */
export const getFileType = ({ ext }: { ext: string }): FileType => {
  return ext_to_type[ext.replace(".", "")] ?? FileType.OTHER;
};

/**
 * Pass a FileType enum in and return the array of associated extensions.
 *
 * @param filetype
 * @returns string[]
 */
export const getFileExt = (filetype: FileType): string[] => {
  return type_to_ext[filetype] ?? [];
};

/**
 * Pass a string that includes a filename-like portion and return an object includ
 *
 * @param filepath
 * @returns \{type: FileType, ext: string\}
 */
export const getExtAndType = (filepath: string): ExtType => {
  if (!filepath) return { type: FileType.OTHER, ext: "" };

  const ext = filepath.split(".").slice(-1)[0].toLowerCase();

  return { type: getFileType({ ext }), ext: ext };
};

/**
 * Callbacks are in the order of the enum (image, 3dfile, compressed, supportconfig, json, other)
 *
 * @param filepath
 * @param callbacks
 */
export const filetypeCallback = (
  filepath: string,
  callbacks: (() => void)[]
) => {
  const i = getExtAndType(filepath);
  const cb = callbacks[i.type];
  if (cb) cb();
};
