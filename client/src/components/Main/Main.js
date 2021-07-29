import React from 'react';
import { Route } from 'react-router-dom';
import Patients from './container/Patients';
import { makeStyles } from '@material-ui/core';
import AboutUs from './container/AboutUs';
import Admin from './container/Admin';
import Status from './container/Status';
import PatientId from './container/PatientId';
import FilterPatient from './container/FilterPatient';

const useStyles = makeStyles((theme)=>({
  main: {
    marginTop: 100
  }
}))


function Main(props) {
  const classes = useStyles()

  return (
    <main className={classes.main} >

      <Route exact path='/'>
        <Patients />
      </Route>

      <Route exact path='/aboutUs'>
        <AboutUs />
      </Route>

      <Route exact path='/admin'>
        <Admin />
      </Route>

      <Route exact path='/status'>
        <Status />
      </Route>

      <Route exact path='/patient/:id'>
        <PatientId />
      </Route>

      <Route exaxt path='filterPatient'>
        <FilterPatient/>
      </Route>

    </main>
  );
}

export default Main;