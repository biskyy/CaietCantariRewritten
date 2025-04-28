import { useAtom } from "jotai";

import { writeableLoadableThemeAtom } from "@/state/persistent";

/**
 * @returns {[{data?: boolean | string, state: string}, (arg: boolean) => void]}
 */
export const useTheme = () => {
  const [theme, setTheme] = useAtom(writeableLoadableThemeAtom);
  return [theme, setTheme];
};
