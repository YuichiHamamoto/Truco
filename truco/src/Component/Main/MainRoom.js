import React, { useEffect } from 'react';
import './MainRoom.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import WaitRoom from './WaitRoom';
import Game from './Game';
import { connect } from 'react-redux';
import { setGame } from '../../Store/actioncreator';
import firestore from '../../database';

function MainRoom(props) {
  useEffect(() => {

  }, [])

  return (
    <div className="mainRoom">
      <Routes>
        <Route path="/" element={<WaitRoom />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    people: state.people
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGame: (game) => dispatch(setGame(game)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainRoom)
