import React, {useEffect, useState} from 'react';
import {MenuBar, RequireLoadable, TransitionBar} from 'components';
import {MenuBarItems} from 'navigation';
import {View} from 'react-native';
import PlayerList from 'components/playerList/PlayerList';
import {useSelector} from 'react-redux';
import State from 'state/entities/State';
import {useProspectActions} from 'state/hooks/UseActions';
import {useTranslation} from 'react-i18next';
import styles from './EsitProspect.styles';
import {useGuard} from 'state/hooks/UseGuard';
import {useHistory} from 'react-router';

const EditProspect: React.FC = () => {
  const actions = useProspectActions();
  const [playersIds, setPlayersIds] = useState<string[]>([]);
  const {t} = useTranslation('prospect');

  useGuard({requireAuthenticated: true});

  useEffect(() => {
    actions.fetchUserPlayers();
  }, []);

  const {prospect} = useSelector((state: State) => state);
  const history = useHistory();

  return (
    <View style={styles.container}>
      <MenuBar
        leftIcons={[MenuBarItems.Settings(history)]}
        rightIcons={[MenuBarItems.Friends(history)]}
      />
      <RequireLoadable data={prospect}>
        {({players}) => (
          <PlayerList
            players={players}
            title={t('prospect')}
            editAction={() => actions.deletePlayers(playersIds)}
            playersIds={playersIds}
            setPlayersIds={setPlayersIds}
            mode="edit"
          />
        )}
      </RequireLoadable>
      <TransitionBar style={styles.transitionBar} activeProspect />
    </View>
  );
};

export default EditProspect;