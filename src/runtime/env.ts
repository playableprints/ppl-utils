import { isNodeProcess } from "is-node-process";

export const isNode = () => {
  return isNodeProcess();
};

export const isBrowser = () => {
  return !isNode();
};
