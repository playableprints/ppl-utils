type RemoteFile = {
  path: string;
  name: string;
  ext: string;
  host: string;
};

type RemoteFolder = {
  path: string;
  name: string;
  host: string;
};

/**
 * @type path: unix-like with trailing and leading "/", without filename or extension
 * @type name: filename without file extension
 * @type ext: file extension with dot
 */
type LocalFile = {
  path: string;
  name: string;
  ext: string;
};

type ArchiveFile = {
  path: string;
  name: string;
  ext: string;
  archive: LocalFile;
};

/**
 * @type path: unix-like with trailing and leading "/"
 * @type name: name of folder with trailing "/" - no leading
 */
type LocalFolder = {
  path: string;
  name: string;
};

type ArchiveFolder = {
  path: string;
  name: string;
  archive: LocalFile;
};
