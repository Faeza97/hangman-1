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
      isDisabled: false
    }
    this.newGame = this.newGame.bind(this);
    this.checkLetter = this.checkLetter.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.getButton = this.getButton.bind(this);
    this.getSlot = this.getSlot.bind(this);
    this.hasWon = this.hasWon.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.newGame();
    this.input.focus();
  }

  handleSubmit(e) {
    e.preventDefault();
  }
  newGame() {
    let word = _.sample(words[this.props.match.path.substring(1)]);
    let strikes = 0;
    let letter = "";
    let guesses = [];
    let fail = false;
    let won = false;
    let isDisabled = false;
    this.setState({
      word,
      strikes,
      letter,
      guesses,
      fail,
      won,
      isDisabled
    });
    console.log(word);
  }

  getSlot(letter, index) {
    let {guesses, fail} = this.state;
    let classNames = ['letter-slot'];
    let contents = _.includes(guesses, letter)
      ? letter
      : ' ';

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
      letter,
      strikes,
      guesses,
      fail,
      won,
      isDisabled
    } = this.state;

    if (_.includes(word, this.input.value.toUpperCase())) {} else {
      strikes++;
    }

    guesses.push(this.input.value.toUpperCase());

    won = this.hasWon();

    console.log(guesses, letter);

    if (strikes >= 6 && !won) {
      strikes = 6;
      fail = true;
      isDisabled = true;
    }
    this.input.value = '';
    this.setState({strikes, isDisabled, guesses, fail, won});
  }

  getButton(letter, index) {
    const inputStyle = {
      textTransform: 'uppercase'
    };
    return (
      <form onSubmit={this.checkLetter}>
        <div className="input-field">
          <input  id="text" style={inputStyle} maxLength="1" type="text" ref={(input) => this.input = input}/>
        <label htmlFor="text">Letter:</label>
      </div>
        <input className="btn hoverable waves-effect waves-light  light-blue darken-3 hoverButton" type="submit" value="Check it"/>
      </form>

    )
  }

  getTitle() {
    if (this.state.won) {
      return 'YOU WON!';
    } else if (this.state.fail) {
      return 'Game Over';
    } else {
      if (this.state.strikes >= 1 && this.state.strikes < 3) {
        return 'YES YOU CAN';
      }
      if (this.state.strikes === 3) {
        return "DON'T GIVE UP"
      }
      if (this.state.strikes === 5) {
        return 'YOU WILL ALWAYS SUCK AT WHAT YOU DO UNTIL YOU DO THIS'
      } else {
        return "YOU'LL DO THIS"
      }
    }
  }
  render() {
    return (
      <div className="container">
        <div className="divider light-blue darken-1"></div>
        <div className = "rowImg"><img src={hangmanImg} alt="hangman" className="imgPosition"/></div>
        <center>
          <h1>{this.getTitle()}</h1>
          <h2>
            <span className="card light-blue accent-3">{this.state.strikes}/6</span>
          </h2>
        </center>
        <div className='row center'>
          {this.getSlots(this.state.word)}
        </div>
        <div className="row">
          {this.getButton()}
        </div>
        <div className="divider light-blue darken-1"></div>
        <div className="section"></div>
        <center>
          <div className="row">
            <button onClick={this.newGame} className="col btn-large hoverable waves-effect waves-light light-blue darken-4 hoverButton">New Game</button>
            <Link className="col grey-text text-lighten-4 right" to="/">
              <button onClick={this.newGame} className="btn-large hoverable waves-effect waves-light light-blue darken-4 hoverButton">Choose a level</button>
            </Link>
          </div>
        </center>
      </div>
    );
  }
}

export default Play;
