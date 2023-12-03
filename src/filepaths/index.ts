import path, { sep, isAbsolute, parse } from "path";
import { difference } from "../array/set";

/**
 * Accepts only an absolute path, and returns an array of directories terminated in path.sep
 *
 * @param p
 * @returns string[]
 */
export function getDirtree(p: string, rootdir: string): string[] {
  if (p === rootdir) return [p];

  const ptree = getTree(p);
  const roottree = getTree(rootdir);

  var retdirs: string[] = [];
  if (rootdir.endsWith(sep)) {
    retdirs.push(rootdir);
  } else {
    retdirs.push(rootdir + sep);
  }

  retdirs.push(...difference(ptree, roottree).filter((r) => r !== ""));

  return retdirs;
}

export function getTree(p: string): string[] {
  if (!isAbsolute(p)) throw new Error("path " + p + " not absolute");

  const paths = parse(p);

  if (paths.root === paths.dir) {
    if (paths.base === "") {
      return [paths.root];
    } else {
      return [paths.root, paths.root + paths.base + sep];
    }
  }

  const dirs = paths.dir.replace(paths.root, "").split(sep);

  let retdirs: string[] = [];

  retdirs.push(paths.root);

  dirs.forEach((d: any) => {
    const lastdir = retdirs[retdirs.length - 1];
    retdirs.push(lastdir + d + sep);
  });

  const lastdir = retdirs[retdirs.length - 1];
  retdirs.push(lastdir + paths.base + sep);

  return retdirs;
}

export const fileFromPath = (p: string): LocalFile => {
  const pathset = parse(p);
  return {
    path:
      (process.platform === "win32" ? "/" + pathset.dir.replaceAll("\\", "/") : pathset.dir) +
      (pathset.dir.length > 0 ? "/" : ""),
    name: pathset.name,
    ext: pathset.ext,
  };
};

export const folderFromPath = (p: string): LocalFolder => {
  const pathset = parse(p);

  return {
    path: process.platform === "win32" ? "/" + pathset.dir.replaceAll("\\", "/") + "/" : pathset.dir + "/",
    name: pathset.name + "/",
  };
};

export const ossifyPath = (p: string) => {
  return path.normalize(process.platform === "win32" && p.startsWith("/") ? p.substring(1) : p);
};

export const fileFromUrl = (url: string): LocalFile | ArchiveFile => {
  const theUrl = new URL(url);
  const file = path.parse(decodeURIComponent(theUrl.pathname));
  if (theUrl.protocol === "archive:") {
    const inner = path.parse(decodeURIComponent(theUrl.search).substring(1));
    return {
      path: inner.dir + (inner.dir === "/" ? "" : "/"),
      name: inner.name,
      ext: inner.ext,
      archive: {
        path: file.dir + (file.dir === "/" ? "" : "/"),
        name: file.name,
        ext: file.ext,
      },
    };
  } else {
    return {
      path: file.dir + (file.dir === "/" ? "" : "/"),
      name: file.name,
      ext: file.ext,
    };
  }
};
