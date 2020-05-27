import {all, put, select, takeEvery} from 'redux-saga/effects';
import types from './types';
import {NavigateToFriend, NavigateToPlayer, NavigationPayload} from './actions';
import {Action} from 'redux-actions';
import State from 'state/entities/State';
import {actions as sessionActions} from 'state/ducks/session';
import {LoadableContainer} from 'entities/LoadableContainer';

function goBack({payload}: Action<NavigationPayload>) {
  payload.history.goBack();
}

function* accountEntered({payload}: Action<NavigationPayload>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: LoadableContainer<any> = yield select((state: State) => state.session);
  if (!session.isSuccess && !session.isLoading) {
    yield put(sessionActions.fetchSession(payload));
  }
}

function navigateToAuth({payload}: Action<NavigationPayload>) {
  payload.history.push('/auth');
}

function navigateToMain({payload}: Action<NavigationPayload>) {
  payload.history.push('/main');
}

function navigateToProspect({payload}: Action<NavigationPayload>) {
  payload.history.push('/main/prospect');
}

function navigateToPlayer({payload}: Action<NavigateToPlayer>) {
  payload.history.push(`/main/player${payload.playerId}`);
}

function navigateToSettings({payload}: Action<NavigationPayload>) {
  payload.history.push('/settings');
}

function navigateToEditProspect({payload}: Action<NavigationPayload>) {
  payload.history.push('/main/prospect/edit');
}

function navigateToImagePicker({payload}: Action<NavigateToPlayer>) {
  payload.history.push(`/main/player${payload.playerId}/imagePicker`);
}

function navigateToFriend({payload}: Action<NavigateToFriend>) {
  payload.history.push(`/main/friend${payload.friendId}`);
}

function navigateToEditFriends({payload}: Action<NavigationPayload>) {
  payload.history.push('/main/friendsEdit');
}

function navigateToInvitePopUp({payload}: Action<NavigationPayload>) {
  payload.history.push('/main/friends/invite');
}

function navigateToMassage({payload}: Action<NavigateToFriend>) {
  payload.history.push(`/main/friends/massage${payload.friendId}`);
}

function navigateToSearch({payload}: Action<NavigationPayload>) {
  payload.history.push(`/main/search`);
}

function navigateToPlayersListFromSearch({payload}: Action<NavigationPayload>) {
  payload.history.push(`/main/search/playerList`);
}

function navigateToEditProfile({payload}: Action<NavigationPayload>) {
  payload.history.push(`/main/settings/editProfile`);
}

export default function* () {
  yield all([
    takeEvery(types.GO_BACK, goBack),
    takeEvery(types.NAVIGATE_TO_AUTH, navigateToAuth),
    takeEvery(types.ACCOUNT_ENTERED, accountEntered),
    takeEvery(types.NAVIGATE_TO_MAIN, navigateToMain),
    takeEvery(types.NAVIGATE_TO_PROSPECT, navigateToProspect),
    takeEvery(types.NAVIGATE_TO_PLAYER, navigateToPlayer),
    takeEvery(types.NAVIGATE_TO_SETTINGS, navigateToSettings),
    takeEvery(types.NAVIGATE_TO_EDIT_PROSPECT, navigateToEditProspect),
    takeEvery(types.NAVIGATE_TO_IMAGE_PICKER, navigateToImagePicker),
    takeEvery(types.NAVIGATE_TO_FRIEND, navigateToFriend),
    takeEvery(types.NAVIGATE_TO_EDIT_FRIENDS, navigateToEditFriends),
    takeEvery(types.NAVIGATE_TO_INVITE_POP_UP, navigateToInvitePopUp),
    takeEvery(types.NAVIGATE_TO_MASSAGE, navigateToMassage),
    takeEvery(types.NAVIGATE_TO_SEARCH, navigateToSearch),
    takeEvery(
      types.NAVIGATE_TO_PLAYERS_LIST_FROM_SEARCH,
      navigateToPlayersListFromSearch,
    ),
    takeEvery(types.NAVIGATE_TO_EDIT_PROFILE, navigateToEditProfile),
  ]);
}
