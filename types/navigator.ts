import { DrawerScreenProps } from "@react-navigation/drawer";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: NavigatorScreenParams<DrawerParamList>;
  Song: undefined;
  Settings: undefined;
  Login: undefined;
  UpdateSong: undefined;
};

export type RootStackScreenProps<
  T extends keyof RootStackParamList = keyof RootStackParamList,
> = NativeStackScreenProps<RootStackParamList, T>;

export type SongListScreenProps<T extends keyof DrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type DrawerParamList = {
  "Toate Cântările": undefined;
  "Caiet de Cântări": undefined;
  "Cântări BER": undefined;
  Jubilate: undefined;
  "Cartea de Tineret": undefined;
  Cor: undefined;
  "Cântări favorite": undefined;
  Rapoarte: undefined;
};

export type DrawerParamListKeys = keyof DrawerParamList;
