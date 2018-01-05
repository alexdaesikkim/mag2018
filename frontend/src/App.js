import React from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

var createReactClass = require('create-react-class');

var App = createReactClass({
  getInitialState(){
    return{
      manual: false,
      game_name: 'Something something randomizer',
      min_level: 0,
      max_level: 0,
      abs_min: 0,
      abs_max: 4,
      song_num: 1,
      songs: [],
      status: "",
      errors:{
        error_message: "",
        error_class: ""
      }
    }
  },

  changeManualBox(){
    this.setState({
      manual: !this.state.manual
    })
  },

  changeMinLevel(event){
    this.setState({
      min_level: event.target.value
    })
  },

  changeMaxLevel(event){
    this.setState({
      max_level: event.target.value
    })
  },

  changeMinDifficulty(event){
    this.setState({
      abs_min: event.target.value
    })
  },

  changeMaxDifficulty(event){
    this.setState({
      abs_max: event.target.value
    })
  },

  changeSongNum(event){
    this.setState({
      song_num: event.target.value
    })
  },

  event_prelim(){
    this.setState({
      min_level: 7,
      max_level: 7,
      abs_min: 0,
      abs_max: 4,
      song_num: 1
    },
    this.handleRandomCall
    )
  },

  event_diff_7_8(){
    this.setState({
      min_level: 7,
      max_level: 8,
      abs_min: 0,
      abs_max: 4,
      song_num: 1
    },
    this.handleRandomCall
    )
  },

  event_9_11(){
    this.setState({
      min_level: 9,
      max_level: 11,
      abs_min: 0,
      abs_max: 4,
      song_num: 1
    },
    this.handleRandomCall
    )
  },

  event_final(){
    this.setState({
      min_level: 11,
      max_level: 12,
      abs_min: 0,
      abs_max: 4,
      song_num: 2
    },
    this.handleRandomCall
    )
  },

  handleRandomCall(){
    var that = this;
    var song_class = "";
    var query = {
      count: that.state.song_num,
      min: that.state.abs_min,
      max: that.state.abs_max,
      min_level: that.state.min_level,
      max_level: that.state.max_level
    }
    console.log(query);
    $.ajax({
      url: '/get_random_song/' + that.state.song_num + "/" + that.state.min_level + "/" + that.state.max_level + "/" + that.state.abs_min + "/" + that.state.abs_max,
      method: 'GET',
      success: function(data){
        var songs = data.songs;
        console.log(data);
        songs = songs.map(function(obj){
          var object = {
            name: obj.title,
            artist: obj.artist,
            bpm: obj.bpm,
            genre: obj.genre,
            level: obj.level,
            difficulty: obj.difficulty,
            version: obj.version
          }
          return object;
        })
        that.setState({
          songs: songs,
          status: ""
        });
      },
      error: function(data){
        that.setState({
          error_message: "There was an error. Please try reloading the page or tweet @supernovamaniac for support",
          error_class: "alert-danger"
        })
      }
    })
  },


  displayLevelForm(){
    if(this.state.manual){
      return(
        //form for min_level
        <div>
          <div>
            <div className="row">
              <div className="col s6">
                Min Level:
                <input type="number" className="form-control" value={this.state.min_level} onChange={this.changeMinLevel}></input>
              </div>
              <div className="col s6">
                Max Level:
                <input type="number" className="form-control" value={this.state.max_level} onChange={this.changeMaxLevel}></input>
              </div>
            </div>
            <div className="row">
              <div className="col s6">
                Min Difficulty:
                <input type="number" className="form-control" value={this.state.abs_min} onChange={this.changeMinDifficulty}></input>
              </div>
              <div className="col s6">
                Max Difficulty:
                <input type="number" className="form-control" value={this.state.abs_max} onChange={this.changeMaxDifficulty}></input>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col s12">
              Number of Songs:
              <input type="number" className="form-control" value={this.state.song_num} onChange={this.changeSongNum}></input>
            </div>
          </div>
          <button className="btn btn-primary" onClick={this.handleRandomCall}>Submit</button>
        </div>
      );
    }
    else return null;
  },

  render() {
    var song_cards = this.state.songs.map(function(obj){
      return(
        <Song song={obj} key={obj.name + "_" + obj.difficulty} />
      )
    })
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <br/>
              <h3>{this.state.game_name}</h3>
            <br/>
            <div className="row">
              <div className="col s12">
                <button className="waves-effect waves-light btn-large" onClick={this.event_prelim}>Lvl 7</button>
                <button className="waves-effect waves-light btn-large" onClick={this.event_diff_7_8}>Lvl 7-8</button>
                <button className="waves-effect waves-light btn-large" onClick={this.event_9_11}>Lvl 9~11</button>
                <button className="waves-effect waves-light btn-large" onClick={this.event_final}>Lvl 11+</button>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <button className="waves-effect waves-light btn-large red" onClick={this.changeManualBox}>Manual</button>
              </div>
            </div>
            {this.displayLevelForm()}
            <br/>
          </div>
        </header>
        <div className="row align-center">
          {song_cards}
        </div>
        <br/>
      </div>
    );
  }
});

var Song = createReactClass({
  getInitialState(){
    return{
      class: this.props.song.card_class
    }
  },

  render() {
    var difficulty = "";
    if(this.props.song.difficulty === 0) difficulty = "Beginner";
    if(this.props.song.difficulty === 1) difficulty = "Normal";
    if(this.props.song.difficulty === 2) difficulty = "Hyper";
    if(this.props.song.difficulty === 3) difficulty = "Another";
    if(this.props.song.difficulty === 4) difficulty = "Black Another";

    return (
        <div className="col s4 offset-s4">
          <div className="card-body white">
            <div className="card-content align-center">
              <br/>
              <h3>{this.props.song.name}</h3>
              <h5>{this.props.song.artist}</h5>
              <h5>{difficulty + " " + this.props.song.level}</h5>
              <h7>{this.props.song.genre}</h7>
              <br/>
              <h7>{"BPM: " + this.props.song.bpm}</h7>
              <h6>{this.props.song.version}</h6>
              <br/>
            </div>
          </div>
        </div>
    );
  }
});

export default App;
