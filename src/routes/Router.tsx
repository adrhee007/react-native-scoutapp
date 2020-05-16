import React, {useEffect} from 'react';
import {NativeRouter, Redirect, Route, Switch, MemoryRouter} from 'react-router-native';
import AppRoute from './AppRoute';
import Auth from 'routes/auth';
import Main from 'routes/main';
import Layout from '../navigation/layouts';
import {View} from 'react-native';
import {useAuthActions} from '../state/hooks/UseActions';
import styles from './Router.styles';

const Logout = () => {
  const actions = useAuthActions();
  useEffect(() => {
    actions.logout();
  }, []);
  return <></>;
};

const Router: React.FC = () => {
  const {AuthLayout} = Layout;
  const {MainLayout} = Layout;
  return (
    <MemoryRouter>
      <NativeRouter>
        <View style={styles.container}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/auth" />
            </Route>
            <Route exact path="/main/logout">
              <Logout />
            </Route>
            <Route path="/main">
              <Redirect to="/main/prospect" />
              <AppRoute
                exact
                path="/main/player"
                component={Main.Prospect}
                layout={MainLayout}
              />
              <AppRoute
                exact
                path="/main/player:id"
                component={Main.PlayerCard}
                layout={MainLayout}
              />
            </Route>
            <Route path="/auth">
              <Redirect to="/auth/login" />
              <AppRoute
                exact
                path="/auth"
                component={Auth.LogIn}
                layout={Layout.AuthLayout}
              />
              <AppRoute
                exact
                path="/auth/registration"
                component={Auth.Registration}
                layout={AuthLayout}
              />
              <AppRoute
                exact
                path="/auth/forgotPassword"
                component={Auth.ForgotPassword}
                layout={AuthLayout}
              />
              <AppRoute
                exact
                path="/auth/login"
                component={Auth.LogIn}
                layout={AuthLayout}
              />
            </Route>
          </Switch>
        </View>
      </NativeRouter>
    </MemoryRouter>
  );
};

export default Router;
