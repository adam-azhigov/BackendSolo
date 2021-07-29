import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@material-ui/core";
import { loadStatus } from "../../../redux/features/statuses";
import { editReport } from "../../../redux/features/comments";
import Preloader from "../../Preloader/preloader";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },

  dialogContent: {
    display: "flex",
  },
}));

export default function CommentEdit({ comments }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState(comments.status);
  const [fullWidth] = React.useState(true);
  const statuses = useSelector((state) => state.statuses.items);
  const dispatch = useDispatch();
  const [comment, setComment] = useState(comments.text);
  const loading = useSelector((state) => state.comments.loading);

  useEffect(() => {
    dispatch(loadStatus());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleMaxWidthChange = (event) => {
  //   setMaxWidth(event.target.value);
  // };
  //
  // const handleFullWidthChange = (event) => {
  //   setFullWidth(event.target.checked);
  // };

  const handleChangeReport = (e) => {
    setComment(e.target.value);
  };

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleEditComment = () => {
    dispatch(editReport(comments._id, { comment, status })).then(() => {
      handleClose();
    });
  };

  if (loading) {
    return <Preloader />;
  }
  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Изменить
      </Button>
      <Dialog
        fullWidth={fullWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          Изменить заметки к пациенту
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            label="Комментарий"
            variant="outlined"
            value={comment}
            name="text"
            onChange={handleChangeReport}
          />
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="max-width">Статусы</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                onChange={handleChangeStatus}
                SelectProps={{
                  native: true,
                }}
              >
                <option disabled selected>
                  Выберите статус
                </option>
                {statuses.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.title}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </form>
          <Button onClick={handleEditComment}>Изменить</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
