export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Notification = {
   __typename?: 'Notification';
  id: Scalars['ID'];
  date: Scalars['String'];
  state: Scalars['String'];
  text: Scalars['String'];
  route: Scalars['String'];
};

export type CareerProgressions = {
   __typename?: 'CareerProgressions';
  id: Scalars['String'];
  progress: Scalars['String'];
};

export type Ranking = {
   __typename?: 'Ranking';
  id: Scalars['String'];
  top: Scalars['String'];
  percentile: Scalars['String'];
  average: Scalars['String'];
};

export type PercentileRankings = {
   __typename?: 'PercentileRankings';
  id: Scalars['String'];
  FB?: Maybe<Ranking>;
  C?: Maybe<Ranking>;
  oneB?: Maybe<Ranking>;
  tenSPL?: Maybe<Ranking>;
  sixty?: Maybe<Ranking>;
  IF?: Maybe<Ranking>;
  pop?: Maybe<Ranking>;
};

export type PgEventResults = {
   __typename?: 'PGEventResults';
  id: Scalars['String'];
  fastballVelocity?: Maybe<Scalars['String']>;
  tenYdSplit?: Maybe<Scalars['String']>;
  infieldVelocity?: Maybe<Scalars['String']>;
  exitVelocity?: Maybe<Scalars['String']>;
  sixtyYdDash?: Maybe<Scalars['String']>;
};

export type Player = {
   __typename?: 'Player';
  id: Scalars['ID'];
  name: Scalars['String'];
  externalId: Scalars['String'];
  height: Scalars['String'];
  weight: Scalars['String'];
  bats: Scalars['String'];
  throws: Scalars['String'];
  graduatingClass: Scalars['String'];
  primaryPosition: Scalars['String'];
  highSchool: Scalars['String'];
  contactPhone: Scalars['String'];
  highSchoolContactPhone: Scalars['String'];
  statePositionRanking: Scalars['String'];
  stateOverallRanking: Scalars['String'];
  nationalPositionRanking: Scalars['String'];
  nationalOverallRanking: Scalars['String'];
  collegeCommitment: Scalars['String'];
  careerProgressions?: Maybe<CareerProgressions>;
  percentileRankings?: Maybe<PercentileRankings>;
  pGEventResults?: Maybe<PgEventResults>;
  images: Array<Scalars['String']>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  preferencesId: Scalars['String'];
  phoneNumber: Scalars['String'];
  education: Scalars['String'];
  players?: Maybe<Array<Player>>;
  notifications?: Maybe<Array<Notification>>;
  image?: Maybe<Scalars['String']>;
};

export type Preferences = {
   __typename?: 'Preferences';
  id: Scalars['String'];
  enableFriendRequestNotification: Scalars['Boolean'];
  enablePlayerMatchingNotification: Scalars['Boolean'];
  enableMessageNotification: Scalars['Boolean'];
  sendNotificationsToEmail: Scalars['Boolean'];
  players: Array<Scalars['String']>;
};

export type Account = {
   __typename?: 'Account';
  user: User;
  preferences: Preferences;
};

export type Query = {
   __typename?: 'Query';
  account: Account;
  friends: Array<User>;
  friendById: User;
  playerById: Player;
  getPlayers: Array<Player>;
  playersFromUser: Array<Player>;
  playersBySearchParameters: Array<Player>;
  preferences: Preferences;
  getNotifications: Array<Notification>;
};


export type QueryFriendByIdArgs = {
  friendId: Scalars['String'];
};


export type QueryPlayerByIdArgs = {
  playerId: Scalars['String'];
};


export type QueryPlayersBySearchParametersArgs = {
  exitVelocity: Array<Scalars['Float']>;
  tenYard: Array<Scalars['Float']>;
  positionVelocity?: Maybe<Scalars['String']>;
  sixtyTime: Array<Scalars['Float']>;
  playerThrows?: Maybe<Scalars['String']>;
  bat?: Maybe<Scalars['String']>;
  commitment?: Maybe<Scalars['String']>;
  graduatingClass: Array<Scalars['Float']>;
  position?: Maybe<Array<Scalars['String']>>;
  weight: Array<Scalars['Float']>;
  height: Array<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  addFriend: Scalars['Boolean'];
  deleteFriend: Scalars['Boolean'];
  addPlayerToUser: Scalars['Boolean'];
  deletePlayersToUser: Scalars['Boolean'];
  deletePlayerToUser: Scalars['Boolean'];
  addPlayerImage: Scalars['Boolean'];
  updatePreferences: Preferences;
  addGeneralReports: Scalars['Boolean'];
  addProReports: Scalars['Boolean'];
  addNotification: Scalars['Boolean'];
  addNotificationToUser: Scalars['Boolean'];
  deleteNotificationToUser: Scalars['Boolean'];
};


export type MutationAddFriendArgs = {
  friendId: Scalars['String'];
};


export type MutationDeleteFriendArgs = {
  friendId: Scalars['String'];
};


export type MutationAddPlayerToUserArgs = {
  playerId: Scalars['String'];
};


export type MutationDeletePlayersToUserArgs = {
  playersIds: Array<Scalars['String']>;
};


export type MutationDeletePlayerToUserArgs = {
  playerId: Scalars['String'];
};


export type MutationAddPlayerImageArgs = {
  playerId: Scalars['String'];
  imageId: Scalars['String'];
};


export type MutationUpdatePreferencesArgs = {
  sendNotificationsToEmail?: Maybe<Scalars['Boolean']>;
  enableMessageNotification?: Maybe<Scalars['Boolean']>;
  enablePlayerMatchingNotification?: Maybe<Scalars['Boolean']>;
  enableFriendRequestNotification?: Maybe<Scalars['Boolean']>;
};


export type MutationAddGeneralReportsArgs = {
  playerId: Scalars['String'];
  videosIds?: Maybe<Array<Scalars['String']>>;
  notes: Scalars['String'];
  date: Scalars['DateTime'];
};


export type MutationAddProReportsArgs = {
  signAbilityComment: Scalars['String'];
  signAbility: Scalars['String'];
  howWellSeenComment: Scalars['String'];
  howWellSeen: Scalars['String'];
  howWellKnownComment: Scalars['String'];
  howWellKnown: Scalars['String'];
  ETA: Scalars['String'];
  playerId: Scalars['String'];
  entryLevel: Scalars['String'];
  character: Scalars['String'];
  posInOrder: Scalars['String'];
  fortyYard: Scalars['String'];
  sixtyYard: Scalars['String'];
  homeToFirst: Scalars['String'];
  OFPDefense: Scalars['String'];
  OFPOffense: Scalars['String'];
  infield: Scalars['String'];
  BP: Scalars['String'];
  handEyeControl: Scalars['String'];
  baseballIQ: Scalars['String'];
  competitiveness: Scalars['String'];
  instincts: Scalars['String'];
  bodyControl: Scalars['String'];
  athleticism: Scalars['String'];
  aggressiveness: Scalars['String'];
  canHePlayAbj: Scalars['String'];
  canHePlayF: Scalars['String'];
  canHePlayP: Scalars['String'];
  feetAbj: Scalars['String'];
  feetF: Scalars['String'];
  rangeAbj: Scalars['String'];
  feetP: Scalars['String'];
  rangeF: Scalars['String'];
  rangeP: Scalars['String'];
  handsAbj: Scalars['String'];
  handsF: Scalars['String'];
  handsP: Scalars['String'];
  fieldingAbilityAbj: Scalars['String'];
  fieldingAbilityF: Scalars['String'];
  fieldingAbilityP: Scalars['String'];
  armStrengthAbj: Scalars['String'];
  armStrengthF: Scalars['String'];
  armStrengthP: Scalars['String'];
  baseStealerAbj: Scalars['String'];
  baseStealerF: Scalars['String'];
  baseStealerP: Scalars['String'];
  runningAbilityAbj: Scalars['String'];
  runningAbilityF: Scalars['String'];
  runningAbilityP: Scalars['String'];
  rawPwrAbj: Scalars['String'];
  rawPwrF: Scalars['String'];
  rawPwrP: Scalars['String'];
  powerFreqAbj: Scalars['String'];
  powerFreqF: Scalars['String'];
  powerFreqP: Scalars['String'];
  hitAppTypeAbj: Scalars['String'];
  hitAppTypeF: Scalars['String'];
  hitAppTypeP: Scalars['String'];
  hittingAbilityAdj: Scalars['String'];
  hittingAbilityF: Scalars['String'];
  hittingAbilityP: Scalars['String'];
  playerComp: Scalars['String'];
  physicalDest: Scalars['String'];
  future: Scalars['String'];
  current: Scalars['String'];
  adj: Scalars['String'];
  raw: Scalars['String'];
  ABs: Scalars['String'];
  innings: Scalars['String'];
  games: Scalars['String'];
  round: Scalars['String'];
  position: Scalars['String'];
  matchDate: Scalars['DateTime'];
  date: Scalars['DateTime'];
};


export type MutationAddNotificationToUserArgs = {
  notificationId: Scalars['String'];
};


export type MutationDeleteNotificationToUserArgs = {
  notificationId: Scalars['String'];
};

