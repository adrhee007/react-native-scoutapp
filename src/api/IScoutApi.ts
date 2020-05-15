import RegisterRequest from './entities/RegisterRequest';
import LoginRequest from './entities/LoginRequest';
import {Account} from 'entities/Account';
import ForgotPasswordRequest from 'api/entities/ForgotPasswordRequest';
import UpdateFirebaseTokenRequest from 'api/entities/UpdateFirebaseTokenRequest';
import Player from 'entities/Player';
import Session from '@spryrocks/react-auth/Session';
import Notifications from 'entities/Notifications';
import UpdateNotificationsSettings from './entities/UpdateNotificationsSettings';
import Preferences from 'entities/Preferences';
import UpdatePreferences from './entities/UpdatePreferences';

export interface IScoutApi {
  register(request: RegisterRequest): Promise<Session>;
  login(request: LoginRequest): Promise<Session>;
  account(): Promise<Account>;
  forgotPassword(request: ForgotPasswordRequest): Promise<void>;
  updateFirebaseToken(request: UpdateFirebaseTokenRequest): Promise<void>;
  getPlayerById(playerId: string): Promise<Player>;
  getPlayers(): Promise<Player[]>;
  myNotificationsSettings(): Promise<Notifications>;
  updateNotificationsSettings(
    request: UpdateNotificationsSettings,
  ): Promise<Notifications>;
  preferences(): Promise<Preferences>;
  updatePreferences(request: UpdatePreferences): Promise<Preferences>;
}
