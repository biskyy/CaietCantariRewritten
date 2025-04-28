import { useAtom } from "jotai";

import { loadingScreenAtom } from "@/state/global";

/**
 * @typedef {Object} LoadingScreenObject
 * @property {number} state
 * @property {string} message
 * @property {(...args: any[]) => void} callback
 *
 * @returns {[LoadingScreenObject, Function: (object: Partial<LoadingScreenObject>) => void]}
 */
export const useLoadingScreen = () => {
  const [loadingScreen, _setLoadingScreen] = useAtom(loadingScreenAtom);
  const setLoadingScreen = (newKey) => {
    _setLoadingScreen((prevObject) => ({ ...prevObject, ...newKey }));
  };
  return [loadingScreen, setLoadingScreen];
};
