import { Dispatch } from 'redux';
import { AnyAction } from '@reduxjs/toolkit';

import { apiCallBegan } from '../actions/api';

type AsyncThunkConfig = {
  state?: unknown;
  dispatch?: Dispatch;
};

type ApiAction = {
  type: string;
  payload: {
    apiMethod: (...args: any[]) => any;
    token: string;
    onSucess: any;
  };
};

const api = ({ dispatch }: AsyncThunkConfig) => (
  next: Dispatch<AnyAction>,
) => async (action: ApiAction) => {
  if (!dispatch) return next(action);
  if (action.type !== apiCallBegan.type) {
    return next(action);
  }

  const { apiMethod, onSucess } = action.payload;
  try {
    const response = await apiMethod();
    dispatch({ type: onSucess, payload: { data: response } });
  } catch (error) {
    console.log(error);
  }
};

export default api;
