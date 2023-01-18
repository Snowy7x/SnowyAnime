import * as React from 'react';
import {Route, Switch} from "react-router-dom";
// 1. import `NextUIProvider` component
import {Button, NextUIProvider, styled} from '@nextui-org/react';
import theme from "./theme";
import Nav from "./Components/Nav";
import {Layout} from "./Components/Layout";
import Home from "./Pages/Home";
import Anime from "./Pages/Anime";
import Search from "./Pages/Seaech";
import Watch from "./Pages/Watch";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/Signup";
import {AuthProvider} from "./contexts/AuthContext";
import Login from "./Pages/Login";
import Favourites from "./Pages/Favourites";
import Schedule from "./Pages/Schedule";

const Box = styled("div", {
    boxSizing: "border-box",
});

function App() {
  // 2. Use at the root of your app
  return (
      <NextUIProvider theme={theme}>
          <AuthProvider>
              <Box css={{
                  maxW: "100%"
              }}>
                  <Nav/>
              </Box>
              <Layout>
                  <div id="wrapper">
                      <Switch>
                          <Route exact path="/" component={Home} />
                          <Route exact path="/anime/:animeId" component={Anime} />
                          <Route exact path="/anime" component={Search} />
                          <Route exact path="/search" component={Search} />
                          <Route path="/search/:query_">
                              <Search isSearch={true}/>
                          </Route>
                          <Route exact path="/watch/:animeId/:ep" component={Watch} />
                          <Route exact path="/signup" component={Signup}/>
                          <Route exact path="/login" component={Login}/>
                          <Route exact path="/favourites" component={Favourites}/>
                          <Route exact path="/schedule" component={Schedule}/>
                          <Route path='*' component={NotFound}/>
                      </Switch>
                  </div>
              </Layout>
          </AuthProvider>
      </NextUIProvider>
  );
}
export default App;
