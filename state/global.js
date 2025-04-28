import { atom } from "jotai";

export const loadingScreenAtom = atom({
  state: 0,
  message: "",
  callback: () => {},
});

export const modalVisibleAtom = atom(false);

/**
 * @typedef {Object} SongObject
 * @property {string} title
 * @property {string} content
 * @property {string} book_id
 * @property {number} id
 * @property {number} index
 * @property {Array<string>} tags
 */

export const dispalyedSongInfoAtom = atom({
  song: {},
  index: 0,
  listFirstIndex: 0,
  listLastIndex: 0,
  currentReport: {},
});

export const reportsArrayAtom = atom([]);

export const orientationAtom = atom("portrait");
