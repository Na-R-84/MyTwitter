import React from 'react';
import Layout from './components/layout/Layout';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home/Home';
import Page404 from './pages/error404/404';
import TweetByHashTag from './pages/tweetsByHashtag/TweetByHashtag';
import { TweetProvider } from './context/TweetContext';
import LogInPage from './pages/home/login/LogInPage';
import { ToastContainer } from 'react-toastify';
import TweetsByUser from './pages/tweetByUser/TweetsByUser';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/login" component={LogInPage} />
          <PrivateRoute
            path={'/'}
            render={() => (
              <TweetProvider>
                <Layout>
                  <Switch>
                    <Route exact path={'/'} component={Home} />
                    <Route
                      exact
                      path={'/hashtags/:hashtag'}
                      component={TweetByHashTag}
                    />
                    <Route
                      exact
                      path={'/users/:userName'}
                      component={TweetsByUser}
                    />
                    <Route component={Page404} />
                    {/* <Route path="/Search/:keyword" component={SearchScreen}/> */}
                  </Switch>
                </Layout>
              </TweetProvider>
            )}
          />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};
const isLogin = () => !!localStorage.getItem('token');

const PublicRoute = ({ component, ...props }) => {
  return (
    <Route
      {...props}
      render={(props) => {
        if (isLogin()) return <Redirect to={'/'} />;
        else {
          return React.createElement(component, props);
        }
      }}
    />
  );
};

const PrivateRoute = ({ render, ...props }) => {
  return (
    <Route
      {...props}
      render={(props) => {
        if (isLogin()) return render(props);
        else return <Redirect to={'/login'} />;
      }}
    />
  );
};

export default App;
