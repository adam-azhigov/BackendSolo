import React, { useEffect, useState } from "react";
import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab, Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { RiPlayListAddFill } from "react-icons/all";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { loadStatus, postStatus } from "../../../redux/features/statuses";
import Preloader from "../../Preloader/preloader"
import * as PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 100,
    width: 800,
    margin: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "space-between",
  },
  addLogo: {
    fontSize: 40,
  },
}));

function Gr(props) {
  return null;
}

Gr.propTypes = {
  spacing: PropTypes.number,
  container: PropTypes.bool,
  children: PropTypes.node,
};

function Status(props) {
  const classes = useStyles();
  const statuses = useSelector((state) => state.statuses.items);
  const loading = useSelector((state) => state.statuses.loading);
  const dispatch = useDispatch();

  const [title, setTitle] = useState([]);
  const [color, setColor] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(loadStatus());
  }, [dispatch]);

  const handleAddTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleAddImage = (e) => {
    setColor(e.target.value);
  };

  const handlePostPatient = () => {
    dispatch(postStatus({ title, color })).then(() => {
      handleClose();
    });
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className={classes.container}>
      <Container className={classes.paper}>
        <div container spacing={6}>
          <h3>Статусы</h3>
        </div>
        <div container spacing={6} className={classes.addLogo}>
          <Fab variant="outlined" color="primary" onClick={handleClickOpen}>
            <RiPlayListAddFill />
          </Fab>
        </div>
      </Container>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Статус</TableCell>
              <TableCell>Цвет статуса</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statuses.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.title}</TableCell>
                  <TableCell bgColor={item?.color}>{item.color}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Новое обращение</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ведите статус и цвет статуса в формате #F1F2F3
          </DialogContentText>
          <TextField
            value={title}
            autoFocus
            margin="dense"
            id="name"
            label=""
            type="text"
            fullWidth
            onChange={handleAddTitle}
          />
          <TextField
            value={color}
            autoFocus
            margin="dense"
            id="name"
            label=""
            type="text"
            fullWidth
            onChange={handleAddImage}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
          <Button onClick={handlePostPatient} color="primary">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Status;
