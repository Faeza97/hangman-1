import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Level.css';

class Level extends Component {

  render() {
    return (
      <div className="container position">
        <section>
          <center>
            <h1>Please, choose a level</h1>
          </center>
        </section>
        <ul className="">
          <li className="row"><Link to='/easy'><button className="col xl8 l8 m8 s8 offset-xl2 offset-l2 offset-m2 offset-s2 waves-effect waves-light btn-large  light-blue darken-3">Easy</button></Link></li>
          <li className="row"><Link to="/medium"><button className="col xl8 l8 m8 s8 offset-xl2 offset-l2 offset-m2 offset-s2 waves-effect waves-light btn-large  light-blue darken-3">Medium</button></Link></li>
          <li className="row"><Link to="/hard"><button className="col xl8 l8 m8 s8 offset-xl2 offset-l2 offset-m2 offset-s2 waves-effect waves-light btn-large  light-blue darken-3">Hard</button></Link></li>
        </ul>
      </div>
    );
  }
}

export default Level;
