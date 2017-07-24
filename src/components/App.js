import React, {Component} from 'react';
import './App.css';
import Level from './Level';
import Play from './Play';
import { BrowserRouter as Router} from 'react-router-dom';
import {Route, Switch,Link } from 'react-router-dom';

function Nav(props) {
  return (
    <nav className="title-center light-blue darken-1">
      <h1 className=""><Link to='/'>Hangman</Link></h1>
    </nav>
  )
}

function Footer(props) {
  return (
    <footer className="page-footer  light-blue darken-1">
      <div className="container">
        <div className="row">
          <div className="col l6 s12"></div>
          <div className="col l4 offset-l2 s12"></div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2017 Copyright Text
          <Link className="grey-text text-lighten-4 right" to="/">Choose a level</Link>
        </div>
      </div>
    </footer>
  )
}

class App extends Component {
  render() {
    return (
      <Router >
        <div className="stickyFooter light-blue accent-2">
          <Nav/>
          <main>
            <Switch>
              <Route path={'/easy'} params={"easy"} component={Play}/>
              <Route path={'/medium'} params={"medium"} component={Play}/>
              <Route path={'/hard'} params={"hard"} component={Play}/>
              <Route path={'/'} component={Level}/>
            </Switch>
          </main>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
