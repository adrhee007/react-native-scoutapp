import React, {useEffect} from 'react';
import {RequireLoadable} from 'components';
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {usePlayerActions, useRouterActions} from 'state/hooks/UseActions';
import {useSelector} from 'react-redux';
import State from 'state/entities/State';
import styles from './PlayerCard.styles';
import {useParams} from 'react-router-native';
import * as PlayerImages from './assets';
import {useTranslation} from 'react-i18next';

const PlayerCard: React.FC = () => {
  const actions = usePlayerActions();
  const routerAction = useRouterActions();
  const {t} = useTranslation('player');

  const {id} = useParams();

  useEffect(() => {
    actions.fetchPlayer(id);
  }, []);

  const {player} = useSelector((state: State) => state);

  const renderInfo = (title: string, item: string | undefined) => (
    <View style={styles.renderInfoContainer}>
      <Text>{title}: </Text>
      {item ? <Text>{item}</Text> : <Text> -</Text>}
    </View>
  );

  const renderSmallImage = (image: ImageSourcePropType | undefined) => (
    <TouchableOpacity style={styles.smallImage} onPress={() => undefined}>
      <Image source={image || PlayerImages.SmallEmptyImage} />
    </TouchableOpacity>
  );

  const renderAdditionalInfoItem = (title: string, item: string | undefined) => (
    <View style={styles.additionalInfoContext}>
      <Text style={styles.additionalInfoLeftItem}>{title}: </Text>
      {item ? (
        <Text style={styles.additionalInfoRightItem}>{item}</Text>
      ) : (
        <Text style={styles.additionalInfoRightItem}> -</Text>
      )}
    </View>
  );

  return (
    <View style={styles.flexOne}>
      <RequireLoadable data={player}>
        {(player) => {
          return (
            <ScrollView>
              <View style={styles.container}>
                <View style={styles.backContainer}>
                  <View>
                    <TouchableOpacity
                      style={styles.backTouchableOpacity}
                      onPress={() => routerAction.goBack()}
                    >
                      <Image source={PlayerImages.Back} />
                      <Text style={styles.back}> {t('back')}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.backTouchableOpacity}>
                    <TouchableOpacity style={styles.contact} onPress={() => undefined}>
                      <Image source={PlayerImages.Contact} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => undefined}>
                      <Image source={PlayerImages.Share} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.topContainer}>
                  <Text style={styles.name}>{player.name}</Text>
                  <TouchableOpacity>
                    <Image source={PlayerImages.EmptyStar} />
                  </TouchableOpacity>
                </View>
                <View style={styles.playerInfo}>
                  <View style={styles.playerImages}>
                    <TouchableOpacity
                      style={styles.playerAvatar}
                      onPress={() => undefined}
                    >
                      <Image source={PlayerImages.EmptyImage} />
                    </TouchableOpacity>
                    <View style={styles.smallImagesContainer}>
                      {renderSmallImage(undefined)}
                      {renderSmallImage(undefined)}
                      {renderSmallImage(undefined)}
                      {renderSmallImage(undefined)}
                    </View>
                  </View>
                  <View style={styles.info}>
                    {renderInfo(t('class'), player.graduatingClass)}
                    {renderInfo(t('position'), player.primaryPosition)}
                    {renderInfo(t('age'), undefined)}
                    {renderInfo(t('height'), player.height)}
                    {renderInfo(t('weight'), player.weight)}
                    {renderInfo(t('commited'), undefined)}
                    {renderInfo(t('highSchool'), player.highSchool)}
                    {renderInfo(t('summerTeam'), undefined)}
                    {renderInfo(t('throw'), player.throws)}
                    {renderInfo(t('ofp'), undefined)}
                  </View>
                </View>
                <View style={styles.additionalInfo}>
                  <View style={styles.additionalInfoTitle}>
                    <Text style={styles.additionalInfoLeftItem}>
                      {t('positionPlayer')}
                    </Text>
                    <Text style={styles.additionalInfoRightItem}>{t('pitcher')}</Text>
                  </View>
                  <View style={styles.additionalInfoTContext}>
                    {renderAdditionalInfoItem(t('60Time'), undefined)}
                    {renderAdditionalInfoItem(t('10YardSplit'), undefined)}
                    {renderAdditionalInfoItem(t('positionVelocity'), undefined)}
                    {renderAdditionalInfoItem(t('popTime'), undefined)}
                  </View>
                </View>
                <View style={styles.bottomContainer}>
                  <View style={styles.additionalInfoTitle}>
                    <Text style={styles.bottomContainerText}>{t('reports')}</Text>
                  </View>
                  <View style={styles.reportsItemContainer}>
                    <TouchableOpacity style={styles.reportsItem}>
                      <Image source={PlayerImages.Plus} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.bottomContainer}>
                  <View style={styles.additionalInfoTitle}>
                    <Text style={styles.bottomContainerText}>{t('upcomingGames')}</Text>
                  </View>
                  <View style={styles.upcomingGamesContainer}>
                    <Text style={styles.upcomingGamesText}>{t('noUpcomingGame')}</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          );
        }}
      </RequireLoadable>
    </View>
  );
};

export default PlayerCard;
