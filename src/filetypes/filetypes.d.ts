import { FileType } from ".";

declare global {
  interface ExtType {
    type: FileType;
    ext: string;
  }
}
