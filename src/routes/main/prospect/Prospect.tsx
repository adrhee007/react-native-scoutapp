import React, {useEffect} from 'react';
import {MenuBar, TransitionBar} from 'components';
import {MenuBarItems} from 'navigation';
import {View} from 'react-native';
import PlayerList from 'components/playerList/PlayerList';
import {useSelector} from 'react-redux';
import State from 'state/entities/State';
import {useProspectActions} from 'state/hooks/UseActions';
import {useTranslation} from 'react-i18next';
import styles from './Prospect.styles';
import {useGuard} from 'state/hooks/UseGuard';

const Prospect: React.FC = () => {
  const actions = useProspectActions();
  const {t} = useTranslation('prospect');

  useGuard({requireAuthenticated: true});

  useEffect(() => {
    actions.fetchPlayers();
  }, []);

  const {players} = useSelector((state: State) => state);

  return (
    <View style={styles.container}>
      <MenuBar leftIcons={[MenuBarItems.Settings]} rightIcons={[MenuBarItems.Friends]} />
      <PlayerList players={players} title={t('prospect')} />
      <TransitionBar style={styles.transitionBar} activeProspect />
    </View>
  );
};

export default Prospect;
