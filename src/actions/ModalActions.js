import {
  OPEN_PLUS_MODAL,
  CLOSE_PLUS_MODAL,
  OPEN_ITEM_MODAL,
  CLOSE_ITEM_MODAL,
  ITEM_MENU_TOGGLED,
  TOGGLE_NOTES_MODAL,
  TOGGLE_DATE_MODAL,
} from './types';

export const openPlusModal = () => {
  return {
    type: OPEN_PLUS_MODAL,
    payload: true
  };
};

export const closePlusModal = () => {
  return {
    type: CLOSE_PLUS_MODAL,
    payload: false
  };
};

export const openItemModal = (id) => {
  return {
    type: OPEN_ITEM_MODAL,
    payload: true,
    id
  };
};

export const closeItemModal = () => {
  return {
    type: CLOSE_ITEM_MODAL,
    payload: false
  };
};


export const toggleItemMenu = (item) => {
  return {
    type: ITEM_MENU_TOGGLED,
    payload: item
  };
};

export const toggleNotesModal = (item) => {
  return {
    type: TOGGLE_NOTES_MODAL,
    id: item.id
  };
};

export const toggleDateModal = (item) => {
  return {
    type: TOGGLE_DATE_MODAL,
    id: item.id
  };
};
