import {
  TOGGLE_ITEM_MODAL,
  TOGGLE_NOTES_MODAL,
  TOGGLE_DATE_MODAL,
  TOGGLE_ITEM_MODAL_DATE_PICKER,
  TOGGLE_CREATE_CLASS_MODAL,
  TOGGLE_CREATE_HOMEWORK_MODAL,
  TOGGLE_CREATE_TEST_MODAL
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

export const toggleCreateClassModal = () => {
  return {
    type: TOGGLE_CREATE_CLASS_MODAL
  };
};

export const toggleCreateHomeworkModal = () => {
  return {
    type: TOGGLE_CREATE_HOMEWORK_MODAL
  };
};

export const toggleCreateTestModal = () => {
  return {
    type: TOGGLE_CREATE_TEST_MODAL
  };
};
