import React from 'react';
import './PlayerList.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import firestore from '../../database';

function PlayerList(props) {
  const removePlayer = async () => {
    await firestore.collection('users').doc(props.player.email).delete();
    await firestore.collection('people').doc(props.player.email).delete();
  }

  return (
    <div className="playerList">
      <div className="playerList__name">
        {props.player.name}
      </div>
      <div className="playerList__email">
        {props.player.email}
      </div>
      <div className="playerList__delete">
        <IconButton onClick={removePlayer}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default PlayerList
