import {
  OPEN_PLUS_MODAL,
  CLOSE_PLUS_MODAL,
  OPEN_ITEM_MODAL,
  CLOSE_ITEM_MODAL,
  ITEM_MENU_TOGGLED
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


export const toggleItemMenu = (id) => {
  return {
    type: ITEM_MENU_TOGGLED,
    payload: id
  };
};
