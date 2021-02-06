import React from 'react';
import Layout from "./components/layout/Layout";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/home/Home";
import Page404 from './pages/error404/404'
import TwittByHashTag from "./pages/twittsByHashtag/TwittByHashtag";
import { TwittProvider } from './context/TwittContext';
import LogInPage from './pages/home/login/LogInPage';
import { ToastContainer } from 'react-toastify';
import TwittsByUser from './pages/twittByUser/TwittsByUser';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/login" component={LogInPage}/>
          <PrivateRoute path={"/"} render={() =>
            <TwittProvider>
              <Layout>
                <Switch>
                  <Route exact path={"/"} component={Home}/>
                  <Route exact path={"/hashtags/:hashtag"} component={TwittByHashTag}/>
                  <Route exact path={"/users/:id/:name"} component={TwittsByUser}/>
                  <Route component={Page404}/>
                  {/* <Route path="/Search/:keyword" component={SearchScreen}/> */}

                </Switch>
              </Layout>
            </TwittProvider>
          }/>
        </Switch>
      </BrowserRouter>
      <ToastContainer/>
    </>
  );
};

const isLogin = () => !!localStorage.getItem("x-auth-token");

const PublicRoute = ({component, ...props}) => {
  return <Route {...props} render={(props) => {
    if (isLogin())
      return <Redirect to={"/"}/>
    else {
      return React.createElement(component, props);
    }
  }}/>
};

const PrivateRoute = ({render, ...props}) => {
  return <Route {...props} render={(props) => {
    if (isLogin())
      return render(props);
    else return <Redirect to={"/login"}/>
  }}/>
}

export default App;