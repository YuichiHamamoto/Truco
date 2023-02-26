import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainRoom from './Component/Main/MainRoom';
import Login from './Component/Other/Login';
import { Helmet } from 'react-helmet';
import firestore from './database';
import { connect } from 'react-redux';
import { setPeople, setUser } from './Store/actioncreator';

function App(props) {

  useEffect(() => {
    console.log("user: ", props.user);
  }, [props.user])

  useEffect(() => {
    console.log("ppl: ", props.people);
  }, [props.people])

  useEffect(() => {
    firestore.collection('people').onSnapshot(() => {
      getPeople();
    });
  }, [])

  const getPeople = async () => {
    await firestore.collection('people').get().then((querySnapshot) => {
      const people = []
      querySnapshot.forEach((doc) => {
        people.push(doc.data())
      })
      props.setPeople(people);
    })
  }

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Truco</title>
        <meta name="description" content="mugNet application" />
      </Helmet>
      <BrowserRouter>
        {props.user ? (<>
          <MainRoom />
        </>) : (<>
          <Login />
        </>)}
      </BrowserRouter>
    </div>
  );
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
    setPeople: (people) => dispatch(setPeople(people)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
