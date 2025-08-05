import { themeAtom } from "@/state/persistent";
import { useAtom } from "jotai";

import { writeableLoadableThemeAtom } from "@/state/persistent";

// /**
//  * @returns {[{data?: boolean | string, state: string}, (arg: boolean) => void]}
//  */
const useTheme = async () => {
  const [theme, setTheme] = useAtom(writeableLoadableThemeAtom); // TODO : use this atom instead of writeable
  return [theme, setTheme];
};
