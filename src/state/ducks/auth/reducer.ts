import {Action, handleActions} from 'redux-actions';
import types from './types';
import {Auth} from 'state/entities/Auth';

export default handleActions<Auth, any>(
  {
    [types.LOGIN_USER]: (state) => ({...state, isBusy: true}),
    [types.REGISTER_USER]: (state) => ({...state, isBusy: true}),
    [types.AUTH_COMPLETED]: (state) => ({...state, isBusy: false}),
    [types.SET_IS_CHECKING]: (state, {payload}: Action<boolean>) => ({
      ...state,
      isChecking: payload,
    }),
    [types.REMOVE_IMAGE]: (state) => ({...state, imageUrl: undefined}),
  },
  {isBusy: false, isChecking: false, isLoading: false, imageUrl: undefined},
);
