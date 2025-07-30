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
  "Toate Cantarile": undefined;
  "Caiet de Cantari": undefined;
  "Cantari BER": undefined;
  Jubilate: undefined;
  "Cartea de Tineret": undefined;
  Cor: undefined;
  "Cantari favorite": undefined;
  Rapoarte: undefined;
};

export type DrawerParamListKeys = keyof DrawerParamList;
