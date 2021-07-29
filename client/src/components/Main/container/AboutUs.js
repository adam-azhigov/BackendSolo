import React from 'react';
import { Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Preloader from '../../Preloader/preloader';

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: 100,
    margin: "auto",
    background:
      "linear-gradient(90deg, rgba(9, 149, 200, 1) 0%, rgba(9,120,180,1) 100%)",
    borderRadius: 4,
  },

  paperGrid: {
    marginTop: 10,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "space-between",
  },
  paperContact: {
    height: 60,
    lineHeight: 4,
    backgroundColor: "gray",
    textAlign: "center",
  },
  divContact: {
    width: 300,
  },
}));




function AboutUs() {
  const classes = useStyles();

  return (
    <Container>
      <Paper className={classes.paperContact}>
        <div className={classes.main}>КОНТАКТЫ</div>
      </Paper>
      <Paper className={classes.paperGrid}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div className={classes.divContact}>
              Адрес: 125284, Москва, 2-й Боткинский проезд, дом 5, корпус 5
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div className={classes.divContact}>
              Время работы: Стационар: круглосуточно. Отделение амбулаторного
              приема: Пн.-Пт.: 8:00-16:00.
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div className={classes.divContact}>
              Телефон: Приемное отделение стационара: +7 (495) 945-79-82.
              Отделение амбулаторного приема: +7 (495) 653-14-57. Электронная
              почта: main@medin.ru
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default AboutUs;