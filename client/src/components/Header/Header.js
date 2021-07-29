import React, { useState } from "react";
import { AppBar, Container, fade, InputBase, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import logo from "../../kisspng-portable-network-graphics-computer-icons-image-vec-5c1627d8cce628.9645871715449558648393.png";
import SearchIcon from '@material-ui/icons/Search';
import { setFilterText } from '../../redux/features/patients';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: "1",
  },

  navbar: {
    flexGrow: "2",
    width: 100,
  },
  logo: {
    flexGrow: 2,
    height: 50,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    display: 'contents'
  },
  inputRoot: {
    color: "white",
  },
    inputInput: {
      borderRadius: 'solid' ,
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: 'calc(1em + ${theme.spacing(4)}px)',
  transition: theme.transitions.create("width"),
  width: "100%",
  [theme.breakpoints.up("md")]: {
  width: "20ch",
},
},
  active: {
    fontSize: "20px",
    color: "white",
  },
}));


function Header(props) {
   const dispatch = useDispatch()
  const classes = useStyles();
  const filter = useSelector(state => state.patients.filter)
  const [opened, setOpened] = useState(false);
  const { pathname } = useLocation()

  const isActive = (pn) => {
    if (pn === pathname) {
      return classes.active;
    }
  };

  const openStatus = () => {
    if (opened === false) {
      return setOpened(true);
    }
  };

  return (
    <AppBar position="fixed">
      <Container fixed>
        <Toolbar>
          <Typography className={classes.navbar}>
            <img className={classes.logo} alt="logo" src={logo} />
          </Typography>
          <div className={classes.search}>
            <div >
              <SearchIcon />
            </div>
            <InputBase
              value={filter}
              placeholder="Поиск объектов…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={(e) => dispatch(setFilterText(e.target.value))}
            />
          </div>
          <Typography className={classes.navbar}>
            <NavLink className={isActive("/")} to="/">
              Главная
            </NavLink>
          </Typography>
          <Typography className={classes.navbar}>
            <NavLink className={isActive("/admin")}  to="/admin" onClick={openStatus}>
              Админка
            </NavLink>
          </Typography>

          {opened === true ? (
            <Typography className={classes.navbar}>
              <NavLink className={isActive("/status")} to="/status">Статус</NavLink>
            </Typography>
          ) : null}

          <Typography className={classes.navbar}>
            <NavLink className={isActive("/AboutUS")} to="/AboutUS">О нас</NavLink>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
