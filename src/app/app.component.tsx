import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./styles/app.css";
import { AppDispatch, GlobalState } from "./store/global.store";
import { getAccount } from "./store/user/user.action";
import SignUpPage from "./modules/signup";
import SignInPage from "./modules/signin";
import HomePage from "./modules/home";

const App = () => {
  const { account } = useSelector(userSelector);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAccount());
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
      <Switch>
        {redirectToHome("/signup")}
        {redirectToHome("/signin")}

        <Route path="/signup" component={SignUpPage} exact />
        <Route path="/signin" component={SignInPage} exact />

        {generateRoute("/home", HomePage)}
      </Switch>
    </Router>
  );
};

const userSelector = (state: GlobalState) => state.user;

export default App;
