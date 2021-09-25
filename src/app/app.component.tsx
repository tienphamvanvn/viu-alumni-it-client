import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import "./styles/app.css";
import { AppDispatch, GlobalState } from "./store/global.store";
import { getAccount } from "./store/user/user.action";
import { sockettt } from "./store/socket/socket.action";
import Alert from "@/app/components/alert";
import SocketClient from "./socket-client";
import SignUpPage from "./modules/signup";
import SignInPage from "./modules/signin";
import HomePage from "./modules/home";
import ProfilePage from "./modules/profile";
import FollowPage from "./modules/follow";
import ConnectPeoplePage from "./modules/connect-people";
import NotificationsPage from "./modules/notifications";

const App = () => {
  const { token, account } = useSelector(userSelector);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAccount());

    const socket = io();

    dispatch(sockettt(socket));

    return () => {
      socket.close();
    };
  }, [dispatch]);

  const generateRoute = (path: string, compt: any) => {
    if (account) {
      return <Route path={path} component={compt} exact />;
    }
  };

  const redirectToHome = (path: string) => {
    return (
      account && (
        <Route path={path} exact>
          <Redirect to="/home" />
        </Route>
      )
    );
  };
  return (
    <Router>
      <Alert />
      {token && <SocketClient />}
      <Switch>
        {redirectToHome("/signup")}
        {redirectToHome("/signin")}

        {generateRoute("/home", HomePage)}
        {generateRoute("/connect_people", ConnectPeoplePage)}
        {generateRoute("/:studentID/following", FollowPage)}
        {generateRoute("/:studentID/followers", FollowPage)}
        {generateRoute("/notifications", NotificationsPage)}

        <Route path="/signup" component={SignUpPage} exact />
        <Route path="/signin" component={SignInPage} exact />
        <Route path="/:studentID" component={ProfilePage} exact />
      </Switch>
    </Router>
  );
};

const userSelector = (state: GlobalState) => state.user;

export default App;
