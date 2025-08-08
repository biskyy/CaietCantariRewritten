import { useAtom } from "jotai";

import { loadingScreenAtom } from "@/state/global";

import { LoadingScreenState } from "@/types/state";

type UseLoadingScreen = [
  loadingScreen: LoadingScreenState,
  setLoadingScreen: (args: Partial<LoadingScreenState>) => void,
];

export const useLoadingScreen = (): UseLoadingScreen => {
  const [loadingScreen, _setLoadingScreen] =
    useAtom<LoadingScreenState>(loadingScreenAtom);

  const setLoadingScreen = (newState: Partial<LoadingScreenState>) => {
    _setLoadingScreen((prevState: LoadingScreenState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return [loadingScreen, setLoadingScreen];
};
