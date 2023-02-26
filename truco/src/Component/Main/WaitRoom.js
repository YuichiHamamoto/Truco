import React, { useState } from 'react';
import './WaitRoom.css';
import { connect } from 'react-redux';
import PlayerList from './PlayerList';
import Button from '@mui/material/Button';
import firestore from '../../database';
import { shuffle } from '../../Functions/Shuffle';
import { useNavigate } from 'react-router-dom';


function WaitRoom(props) {
  const navigate = useNavigate();

  const startGame = () => {
    if (props.people?.length > 2) {
      alert("Only two players can play truco at the same time.")
    }
    else if (props.people?.length < 2) {
      alert("You need exactly two players to start game")
    }
    initializeGame()
  }

  const initializeGame = async () => {
    const deck = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
    const hand1 = [];
    const hand2 = [];
    for (let i = 0; i < 6; i++) {
      if (i % 2 === 0) {
        hand1.push(deck.pop());
      }
      else {
        hand2.push(deck.pop());
      }
    }
    await firestore.collection('people').doc(props.people[0]?.email).update({
      hand: hand1
    })
    await firestore.collection('people').doc(props.people[1]?.email).update({
      hand: hand2
    })

    await firestore.collection('game').doc('master').set({
      deck: deck,
      gameCount: 1,
      point: 0,
    })

    navigate("/game");
  }

  return (
    <div className="waitRoom">
      <div className="waitRoom__header">
        <h2>Waiting Room</h2>
      </div>
      <div className="waitRoom__body">
        {props.people?.map(player =>
          <PlayerList player={player} />
        )}
      </div>
      <div className="waitRoom__button">
        <Button variant="contained" onClick={startGame}>Start Truco</Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    people: state.people
  };
};

export default connect(mapStateToProps)(WaitRoom)
