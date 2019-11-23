import {
  TOGGLE_ITEM_MODAL,
  TOGGLE_NOTES_MODAL,
  TOGGLE_DATE_MODAL,
  TOGGLE_ITEM_MODAL_DATE_PICKER
} from './types';

export const toggleItemModal = (item) => {
  return {
    type: TOGGLE_ITEM_MODAL,
    id: item.id
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

export const toggleItemModalDatePicker = (item) => {
  return {
    type: TOGGLE_ITEM_MODAL_DATE_PICKER,
    id: item.id
  };
};
