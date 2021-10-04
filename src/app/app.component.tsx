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
import PostDetailsPage from "./modules/post/post-details";
import BookmarksPage from "./modules/bookmarks";
import { getNotifies } from "./store/notify/notify.action";
import GroupsPage from "./modules/groups";
import MessagesPage from "./modules/messages";

const App = () => {
  const { token, account } = useSelector(userSelector);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAccount());

    if (token) {
      dispatch(getNotifies(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
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
        {redirectToHome("/")}
        {redirectToHome("/signin")}

        <Route path="/signup" component={SignUpPage} exact />
        <Route path="/signin" component={SignInPage} exact />

        {generateRoute("/home", HomePage)}
        {generateRoute("/connect_people", ConnectPeoplePage)}
        {generateRoute("/notifications", NotificationsPage)}
        {generateRoute("/bookmarks", BookmarksPage)}
        {generateRoute("/groups", GroupsPage)}
        {generateRoute("/messages", MessagesPage)}

        {generateRoute("/post/:postId", PostDetailsPage)}
        {generateRoute("/:studentID/following", FollowPage)}
        {generateRoute("/:studentID/followers", FollowPage)}

        <Route path="/" component={SignInPage} exact />
        <Route path="/:studentID" component={ProfilePage} exact />
      </Switch>
    </Router>
  );
};

const userSelector = (state: GlobalState) => state.user;

export default App;
