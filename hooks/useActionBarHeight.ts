import { actionBarHeightAtom } from "@/state/global";
import { useAtom } from "jotai";

type UseActionBarHeigt = [
  actionBarHeight: number,
  setActionBarHeight: (arg: number) => void,
];

export const useActionBarHeight = (): UseActionBarHeigt => {
  const [actionBarHeight, setActionBarHeight] = useAtom(actionBarHeightAtom);

  return [actionBarHeight, setActionBarHeight];
};
