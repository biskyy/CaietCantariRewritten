import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Cantari from "../assets/Cantari.json";

const storage = createJSONStorage(() => AsyncStorage);
export const themeAtom = atomWithStorage("theme", 0, storage);
export const songsAtom = atomWithStorage("songs", Cantari, storage);
export const isLoadingAtom = atom(0);
