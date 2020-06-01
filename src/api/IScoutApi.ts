import RegisterRequest from './entities/RegisterRequest';
import LoginRequest from './entities/LoginRequest';
import {Account} from 'entities/Account';
import ForgotPasswordRequest from 'api/entities/ForgotPasswordRequest';
import UpdateFirebaseTokenRequest from 'api/entities/UpdateFirebaseTokenRequest';
import Player from 'entities/Player';
import Session from '@spryrocks/react-auth/Session';
import Preferences from 'entities/Preferences';
import UpdatePreferences from './entities/UpdatePreferences';
import User from '../entities/User';
import ProReportsRequest from '../entities/proReportsRequest';

export interface IScoutApi {
  register(request: RegisterRequest): Promise<Session>;

  login(request: LoginRequest): Promise<Session>;

  account(): Promise<Account>;

  forgotPassword(request: ForgotPasswordRequest): Promise<void>;

  updateFirebaseToken(request: UpdateFirebaseTokenRequest): Promise<void>;

  getPlayerById(playerId: string): Promise<Player>;

  getUserPlayers(): Promise<Player[]>;

  preferences(): Promise<Preferences>;

  updatePreferences(request: UpdatePreferences): Promise<Preferences>;

  deletePlayers(playersIds: string[]): Promise<void>;

  deletePlayer(playerId: string): Promise<void>;

  addPlayer(playerId: string): Promise<void>;

  uploadFile(uri: string): Promise<void>;

  addPlayerImage(playerId: string, imageId: string): Promise<void>;

  getFriend(friendId: string): Promise<User>;

  getFriends(): Promise<User[]>;

  addFriend(friendId: string): Promise<void>;

  deleteFriend(friendId: string): Promise<void>;

  getPlayers(): Promise<Player[]>;

  getPlayersBySearchParameters(
    name: string | undefined,
    height: number[],
    weight: number[],
    position: string[] | undefined,
    graduatingClass: number[],
    commitment: string | undefined,
    bat: string | undefined,
    playerThrows: string | undefined,
    sixtyTime: number[],
    positionVelocity: string | undefined,
    tenYard: number[],
    exitVelocity: number[],
  ): Promise<Player[]>;

  addGeneralReports(
    filesIds: string[] | undefined,
    date: Date,
    notes: string,
    playerId: string,
  ): Promise<void>;

  addProReports(request: ProReportsRequest): Promise<void>;
}
