import {
  OPEN_PLUS_MODAL,
  CLOSE_PLUS_MODAL,
  OPEN_ITEM_MODAL,
  CLOSE_ITEM_MODAL,
  ITEM_MENU_TOGGLED,
  OPEN_NOTES_MODAL,
  CLOSE_NOTES_MODAL,
  OPEN_DATE_MODAL,
  CLOSE_DATE_MODAL
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

export const openNotesModal = (item) => {
  return {
    type: OPEN_NOTES_MODAL,
    payload: item
  };
};

export const closeNotesModal = () => {
  return {
    type: CLOSE_NOTES_MODAL
  };
};

export const openDateModal = (item) => {
  return {
    type: OPEN_DATE_MODAL,
    payload: item
  };
};

export const closeDateModal = () => {
  return {
    type: CLOSE_DATE_MODAL
  };
};
