import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LandingPage from './pages/LandingPage'
import createBrowserHistory from 'history/createBrowserHistory';
import {syncHistoryWithStore} from 'mobx-react-router';
import rootStore from './stores';
import ScrollToTop from './components/layout/ScrollToTop';
import posed, {PoseGroup} from 'react-pose';
import  Home  from "./pages/Home"
import './css/App.css';


const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, rootStore.routingStore);
const RoutesContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0, transition: {
    duration: 200
  } }
});

class App extends Component {

  render() {
    return (
      <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
        <ScrollToTop>
          <Navbar />
          <Route
            render={({location}) => (
              <div id='main-container' className='main-container-full'>
                <ToastContainer />
                <PoseGroup style={{height: '100%'}}>
                  <RoutesContainer key={location.pathname}>
                    <Switch location={location}>                
                      <Route path='/home' component={Home} key='home' />
                      <Route exact path='/' component={LandingPage} key='landingPage' />
                    </Switch>
                  </RoutesContainer>
                </PoseGroup>
              </div>
            )}
          />
        </ScrollToTop>
      </Router>
    
    );
  }
}

export default App;
