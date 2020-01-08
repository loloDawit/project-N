import { SET_ALERT, REMOVE_ALERT } from './constant';
import uuid from 'uuid';

export const setAlert = (message, alertType) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: {
      id,
      message,
      alertType
    }
  });
};
