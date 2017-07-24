import React, {Component} from 'react';
import './Play.css';
import words from '../data/words.json';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import hangmanImg from '../images/hangman.png';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      easy: words.easy,
      medium: words.medium,
      hard: words.hard,
      word: "",
      guesses: [],
      strikes: 0,
      fail: false,
      won: false,
      letter: "",
      isDisabled: false,
      error:""
    }
    this.newGame = this.newGame.bind(this);
    this.checkLetter = this.checkLetter.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.getButton = this.getButton.bind(this);
    this.getSlot = this.getSlot.bind(this);
    this.hasWon = this.hasWon.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.newGame();
    this.input.focus();
  }

  handleChange(e) {
    this.setState({letter: e.target.value})
  }
  newGame() {
    let word = _.sample(words[this.props.match.path.substring(1)]);
    let strikes = 0;
    let letter = "";
    let guesses = [];
    let fail = false;
    let won = false;
    let isDisabled = false;
    let error = "";
    this.setState({
      word,
      strikes,
      letter,
      guesses,
      fail,
      won,
      isDisabled,
      error
    });
  }

  getSlot(letter, index) {
    let {guesses, fail} = this.state;
    let classNames = ['letter-slot'];
    let contents = _.includes(guesses, letter)
      ? letter
      : ' ';

    //when user failed and the  empty places stayed
    if (contents === ' ' && fail) {
      classNames.push('revealed');
      contents = letter;
    }
    return (
      <div key={index} className={classNames.join(' ')}>
        {contents}
      </div>
    );
  }

  getSlots(word) {
    let letters = word.split('');
    return letters.map(this.getSlot);
  }

  hasWon() {
    let {word, guesses} = this.state;
    return !_.chain(word.split('')).map(letter => _.includes(guesses, letter)).includes(false).value();
  }

  checkLetter(e) {
    e.preventDefault();
    let {
      word,
      strikes,
      guesses,
      fail,
      won,
      isDisabled,
      error
    } = this.state;
    error = "";
    let letter = this.input.value.toUpperCase();
    //if word include word next step  otherwise increase strikes
    if (_.includes(word, letter)) {} else {
      strikes++;
    }

    if(guesses.length >=1){
      if(_.includes(guesses,letter)){
        error = "Sorry, but this letter was used!";
        this.setState({error});
        return this.input.value = '';
      }else {
        guesses.push(letter);
      }
    } else {
      guesses.push(letter);
    }

    won = this.hasWon();

    if (won) {
      isDisabled = true;
    }
    //Check if failed
    if (strikes >= 3 && !won) {
      strikes = 3;
      fail = true;
      isDisabled = true;
    }
    this.input.value = '';
    this.input.focus();
    this.setState({
      strikes,
      isDisabled,
      guesses,
      fail,
      won,
      letter: "",
      error
    });
  }

  getButton(letter, index) {
    const inputStyle = {
      textTransform: 'uppercase'
    };
    return (
      <form className="row" onSubmit={this.checkLetter}>
        <div className="input-field">
          <input disabled={this.state.isDisabled} onChange={this.handleChange} name="letter" id="text" style={inputStyle} maxLength="1" type="text" ref={(input) => this.input = input}/>
          <label htmlFor="text">Letter:</label>
          {this.state.error && <span className="error-block">{this.state.error}</span>}
          <div className="section"></div>
        </div>
        <button disabled={!this.state.letter} className="col btn-large hoverable waves-effect waves-light  light-blue darken-3 hoverButton">Check it</button>
      </form>

    )
  }

  getTitle() {
    if (this.state.won) {
      return 'YOU WON!';
    } else if (this.state.fail) {
      return 'Game Over';
    } else {
      if (this.state.strikes === 1) {
        return 'YES YOU CAN';
      }
      if (this.state.strikes === 2) {
        return "DON'T GIVE UP"
      } else {
        return "YOU'LL DO THIS"
      }
    }
  }
  render() {
    return (
      <div className="container">
        <div className="divider light-blue darken-1"></div>
        <div className="rowImg"><img src={hangmanImg} alt="hangman" className="imgPosition"/></div>
        <center>
          <h1>{this.getTitle()}</h1>
          <h2>
            <span className="card light-blue accent-3">{this.state.strikes}/3</span>
          </h2>
        </center>
        <div className='row center'>
          {this.getSlots(this.state.word)}
        </div>
        <div className="row">
          {this.getButton()}
        </div>
        <div>
          <span className="usedLetter card light-blue accent-3">{this.state.guesses}</span>
        </div>
        <div className="section"></div>
        <div className="divider light-blue darken-1"></div>
        <div className="section"></div>
        <div className="row">
          <button onClick={this.newGame} className="col btn-large hoverable waves-effect waves-light light-blue darken-4 hoverButton">New Game</button>
          <Link className="col grey-text text-lighten-4 right" to="/">
            <button onClick={this.newGame} className="btn-large hoverable waves-effect waves-light light-blue darken-4 hoverButton">Choose a level</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Play;
