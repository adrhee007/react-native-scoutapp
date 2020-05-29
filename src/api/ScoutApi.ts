import {IScoutApi} from 'api/IScoutApi';
import RegisterRequest from './entities/RegisterRequest';
import LoginRequest from './entities/LoginRequest';
import RestApi from 'api/rest/RestApi';
import ApiConfiguration from '@spryrocks/react-api/ApiConfiguration';
import ScoutGraphqlApi from 'api/graphql/ScoutGraphqlApi';
import {
  mapAccountFromGQL,
  mapPlayerFromGQL,
  mapPlayersFromGQL,
  mapPreferencesFromGQL,
  mapUserFromGQL,
  mapUsersFromGQL,
} from 'api/Mappers';
import ForgotPasswordRequest from 'api/entities/ForgotPasswordRequest';
import ApiDelegate, {AuthInfo} from '@spryrocks/react-api/ApiDelegate';
import IApiTokenHolder from '@spryrocks/react-api/IApiTokenHolder';
import UpdateFirebaseTokenRequest from 'api/entities/UpdateFirebaseTokenRequest';
import {ApiBase} from '@spryrocks/react-api';
import UpdatePreferences from './entities/UpdatePreferences';

export default class ScoutApi extends ApiBase implements IScoutApi {
  private readonly restApi: RestApi;

  private readonly graphqlApi: ScoutGraphqlApi;

  constructor(
    configuration: ApiConfiguration,
    delegate: ApiDelegate,
    tokenHolder: IApiTokenHolder,
  ) {
    super(configuration, delegate, tokenHolder);
    this.graphqlApi = new ScoutGraphqlApi(
      this.baseUrl,
      configuration.graphql,
      this.delegate,
    );
    this.restApi = new RestApi(this.baseUrl, configuration.rest, this.delegate);
  }

  public async register(request: RegisterRequest) {
    return this.restApi.register(request);
  }

  public async login(request: LoginRequest) {
    return this.restApi.login(request);
  }

  public async account() {
    return this.wrapApiCall(async () =>
      mapAccountFromGQL(await this.graphqlApi.queryAccount(), this.configuration),
    );
  }

  public async uploadFile(uri: string) {
    return this.restApi.uploadFile(uri);
  }

  public async preferences() {
    return this.wrapApiCall(async () =>
      mapPreferencesFromGQL(await this.graphqlApi.queryPreferences()),
    );
  }

  public async updatePreferences(request: UpdatePreferences) {
    return this.wrapApiCall(async () =>
      mapPreferencesFromGQL(await this.graphqlApi.mutationPreferences(request)),
    );
  }

  public async forgotPassword(request: ForgotPasswordRequest) {
    return this.restApi.forgotPassword(request);
  }

  public async updateUserPassword(oldPassword: string, password: string) {
    return this.wrapApiCall(async () =>
      this.restApi.changePassword({oldPassword, password}),
    );
  }

  public async updateFirebaseToken(request: UpdateFirebaseTokenRequest) {
    return this.wrapApiCall(async () => this.restApi.updateFirebaseToken(request));
  }

  public async getPlayerById(playerId: string) {
    return this.wrapApiCall(async () =>
      mapPlayerFromGQL(
        await this.graphqlApi.queryPlayerById(playerId),
        this.configuration,
      ),
    );
  }

  public async getUserPlayers() {
    return this.wrapApiCall(async () =>
      mapPlayersFromGQL(await this.graphqlApi.queryUserPlayers(), this.configuration),
    );
  }

  protected async refreshToken(refreshToken: string): Promise<AuthInfo> {
    const session = await this.restApi.refresh({refreshToken});
    return {accessToken: session.jwt, refreshToken: session.refreshToken};
  }

  public async deletePlayers(playersIds: string[]) {
    await this.wrapApiCall(async () => this.graphqlApi.mutationDeletePlayers(playersIds));
  }

  public async deletePlayer(playerId: string) {
    await this.wrapApiCall(async () => this.graphqlApi.mutationDeletePlayer(playerId));
  }

  public async addPlayer(playerId: string) {
    await this.wrapApiCall(async () => this.graphqlApi.mutationAddPlayer(playerId));
  }

  public async addPlayerImage(playerId: string, imageId: string) {
    await this.wrapApiCall(async () =>
      this.graphqlApi.mutationAddPlayerImage(playerId, imageId),
    );
  }

  public async addFriend(friendId: string) {
    await this.wrapApiCall(async () => this.graphqlApi.mutationAddFriend(friendId));
  }

  public async deleteFriend(friendId: string) {
    await this.wrapApiCall(async () => this.graphqlApi.mutationDeleteFriend(friendId));
  }

  public async getFriend(friendId: string) {
    return this.wrapApiCall(async () =>
      mapUserFromGQL(await this.graphqlApi.queryFriend(friendId), this.configuration),
    );
  }

  public async getFriends() {
    return this.wrapApiCall(async () => {
      const friends = await this.graphqlApi.queryFriends();
      return friends ? mapUsersFromGQL(friends, this.configuration) : [];
    });
  }

  public async getPlayers() {
    return this.wrapApiCall(async () =>
      mapPlayersFromGQL(await this.graphqlApi.queryPlayers(), this.configuration),
    );
  }

  public async getPlayersBySearchParameters(
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
  ) {
    return this.wrapApiCall(async () =>
      mapPlayersFromGQL(
        await this.graphqlApi.queryPlayersBySearchParameters(
          name,
          height,
          weight,
          position,
          graduatingClass,
          commitment,
          bat,
          playerThrows,
          sixtyTime,
          positionVelocity,
          tenYard,
          exitVelocity,
        ),
        this.configuration,
      ),
    );
  }

  public async addGeneralReports(
    filesIds: string[] | undefined,
    date: Date,
    notes: string,
    playerId: string,
  ) {
    return this.wrapApiCall(async () =>
      this.graphqlApi.mutationAddGeneralReports(filesIds, date, notes, playerId),
    );
  }
}
