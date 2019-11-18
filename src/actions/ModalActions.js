import {
  OPEN_ITEM_MODAL,
  CLOSE_ITEM_MODAL,
  TOGGLE_NOTES_MODAL,
  TOGGLE_DATE_MODAL,
} from './types';

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
