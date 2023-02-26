import React, { useState } from 'react';
import './Login.css';
import firestore from '../../database';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import validator from 'validator';
import { setUser } from '../../Store/actioncreator';
import { connect } from 'react-redux';

function Login(props) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const signup = async () => {
    if (!(name && validator.isEmail(email))) {
      alert("Please fill out your name and email address😎");
    }
    await firestore.collection('users').doc(email).set({
      name: name,
      email: email
    }).then(() => {
      const data = { name: name, email: email }
      props.setUser(data);
    })

    await firestore.collection('people').doc(email).set({
      name: name,
      email: email
    })
  }

  return (
    <div className="login">
      <div className="login__body">
        <div className="login__body__header">
          <div className="login__body__header__main">
            <h2>Sign up</h2>
          </div>
          <div className="login__body__header__sub">
            <p>Start Truco by entering your name and email address</p>
          </div>
        </div>
        <div className="login__body__input">
          <div className="login__body__input__name">
            <TextField fullWidth label="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
          </div>
          <div className="login__body__input__email">
            <TextField fullWidth label="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          </div>
        </div>
        <div className="login__body__button">
          <Button variant="contained" onClick={signup}>Sign Up</Button>
        </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
