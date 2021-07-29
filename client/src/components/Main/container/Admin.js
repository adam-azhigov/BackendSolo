import React, { useEffect, useState } from "react";
import {
  Avatar,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Fab,
  makeStyles, Table, TableBody,
  TableCell, TableContainer, TableRow,
  TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePatient,
  loadPatients,
  postPatient,
} from "../../../redux/features/patients";
import Preloader from "../../Preloader/preloader";
import { RiPlayListAddFill } from "react-icons/all";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 100,
    width: 800,
    margin: "auto",
  },
  img: {
    width: 70,
    height: 50,
    borderRadius: 100,
    // border: 3, solid, green,
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

function Admin(props) {
  const dispatch = useDispatch();

  const patients = useSelector((state) => state.patients.items);
  const loading = useSelector((state) => state.patients.loading);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(loadPatients());
  }, [dispatch]);

  const classes = useStyles();

  if (loading) {
    return <Preloader />;
  }

  const handleDelete = (id) => {
    dispatch(deletePatient(id));
  };

  const handleAddTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleAddImage = (e) => {
    setImage(e.target.value);
  };

  const handlePostPatient = () => {
    dispatch(postPatient({ title: title, image: image }));
  };

  return (
    <div className={classes.container}>
      <Container className={classes.paper}>
        <grid container spacing={6}>
          <h3>Админка</h3>
        </grid>
        <grid container spacing={6} className={classes.addLogo}>
          <Fab variant="outlined" color="primary" onClick={handleClickOpen}>
            <RiPlayListAddFill />
          </Fab>
        </grid>
      </Container>

      <TableContainer component={classes.paper}>
        <Table size="small" aria-label="a dense table">
          <TableBody>
            {patients.map((item) => {
              return (
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Avatar>
                      <img
                        className={classes.img}
                        src={`${item.pathToImage}`}
                        alt="logo"
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell>
                    <button onClick={() => handleDelete(item._id)}>
                      удалить
                    </button>
                  </TableCell>
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
          <DialogContentText>Ведите имя и путь к изображению</DialogContentText>
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
            value={image}
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

export default Admin;
