export const NAME = '@@keys';
export const ACTIVE_KEYBINDER = [NAME, '/ACTIVE_KEYBINDER'].join('');
export const ADD_KEYBINDER_TO_STORE = [NAME, '/ADD_KEYBINDER_TO_STORE'].join('');
export const UPDATE_SELECTED_KEY = [NAME, '/UPDATE_SELECTED_KEY'].join('');
export const UPDATE_BINDER_STATE = [NAME, '/UPDATE_BINDER_STATE'].join('');
import {globalStore} from '../listener';

export function clone(obj) {
  const cloneObject = {};
  for (const property in obj) {
    if (typeof obj[property] === 'object') {
      cloneObject[property] = clone(obj[property]);
    } else {
      cloneObject[property] = obj[property];
    }
  }
  return cloneObject;
}

export function _activeKeyBinder(binderId) {
  if (globalStore.dispatch) {
    const newState = clone(globalStore.getState()[NAME]);
    for (const key of Object.keys(newState)) {
      newState[key].active = false;
    }
    if (Object.keys(newState).some(key => key === binderId)) {
      newState[binderId].active = true;
      globalStore.dispatch({
        type: ACTIVE_KEYBINDER,
        state: newState,
      });
    }
  }
}

export function _addKeyBinderToStore(binderId) {
  if (globalStore.dispatch) {
    const newState = clone(globalStore.getState()[NAME]);
    if (!Object.keys(newState).some(key => key === binderId)) {
      newState[binderId] = {};
      newState[binderId].id = binderId;
      newState[binderId].active = false;
      globalStore.dispatch({
        type: ADD_KEYBINDER_TO_STORE,
        state: newState,
      });
    }
  }
}

export function _updateBinderState(binderId, binderState) {
  if (globalStore.dispatch) {
    const newState = clone(globalStore.getState()[NAME]);
    newState[binderId] = {...newState[binderId], ...binderState};
    globalStore.dispatch({
      type: UPDATE_BINDER_STATE,
      state: newState,
    });
  }
}

export function _updateSelectedId(binderId, selectedId, marginLeft) {
  if (globalStore.dispatch) {
    const newState = clone(globalStore.getState()[NAME]);
    newState[binderId].selectedId = selectedId;
    newState[binderId].marginLeft = marginLeft;
    globalStore.dispatch({
      type: UPDATE_SELECTED_KEY,
      state: newState,
    });
  }
}