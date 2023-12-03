// import { useEffect, useState } from "react";
// import { isIE, isOpera, getChromeVersion } from "./browser";

// export function useBrowserBlock() {
//   const [isBlocked, setIsBlocked] = useState<boolean>(false);

//   useEffect(() => {
//     const isBrowser = typeof window !== "undefined";
//     // console.log(isBrowser)
//     if (isBrowser) {
//       // const hasFeatures = (isIE || isOpera || getChromeVersion() < 86)
//       setIsBlocked(false);
//     }
//   }, []);

//   return isBlocked;
// }
