import React, { useEffect, useState } from "react";
import {
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadPatientId } from "../../../redux/features/patients";
import Preloader from "../../Preloader/preloader";
import { loadComment, postComment } from "../../../redux/features/comments";
import { loadStatus } from "../../../redux/features/statuses";
import dayjs from "dayjs";
import PatchComment from './PatchComment';

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: 100,
    margin: "auto",
    width: 800,
  },

  divTable: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },

  divTextFieldInput: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'space-between'

  },

  inputComment: {
    width: 400
  },

  buttonAdd: {
    marginLeft: 10
  }
}));

function PatientId() {
  const classes = useStyles();

  const { id } = useParams();

  const dispatch = useDispatch();

  const patients = useSelector((state) => {
    return state.patients.items.find((item) => item._id === id);
  });

  const status = useSelector((state) => state.statuses.items);
  const comments = useSelector((state) => state.comments.items);
  const loading = useSelector((state) => state.comments.loading);

  const [comment, setComment] = useState("");
  const [stat, setStat] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handlePostComment = (id) => {
    if (comment.length < 6 || stat.length === 0){
      return null
    }else {
      return  dispatch(postComment(id, { comment: comment, stat: stat }));
    }

  };

  useEffect(() => {
    dispatch(loadPatientId(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadComment(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadStatus());
  }, [dispatch]);

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleChangeStatus = (e) => {
    setStat(e.target.value);
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <main className={classes.main}>
      <div>Все записи: {patients.name}</div>
      <div><img src={patients.pathToImage}/></div>
      <div className={classes.divTextFieldInput}>
        <div>
          <TextField
            className={classes.inputComment}
            id="outlined-basic"
            label="Введите комментарий"
            value={comment}
            variant="outlined"
            inputMode={"text"}
            onChange={handleChangeComment}
          />
        </div>
        <div>
          <TextField
            id="outlined-select-currency-native"
            select
            SelectProps={{
              native: true,
            }}
            helperText="Выберите статус"
            variant="outlined"
            onChange={handleChangeStatus}
          >
            <option disabled selected>Выберите статус</option>
            {status.map((item) => {
              return (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              );
            })}
          </TextField>
          <Button
            onClick={() => handlePostComment(patients._id)}
            className={classes.buttonAdd}
            variant="contained"
            color="primary"
            type="submit"
          >
            Добавить
          </Button>
        </div>
      </div>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Статус обращения</TableCell>
              <TableCell>Комментарий</TableCell>
              <TableCell>Изменить</TableCell>
            </TableRow>
          </TableHead>
          {comments.map((item, index) => {
            const element = status.find((elem) => elem._id === item.status);
            return (
              <TableBody key={item._id}>
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell bgColor={element?.color}>
                    {dayjs(comments[index].lastComment?.updatedAt).format(
                      "DD.MM.YYYY HH:mm"
                    )}
                    <h4>{element?.title}</h4>
                  </TableCell>
                  <TableCell>{item.text}</TableCell>
                  <TableCell>
                    <PatchComment comments={item}/>
                  </TableCell>
                </TableRow>
              </TableBody>
            );
          })}
        </Table>
      </div>

      {/*{comments.map((item) => {*/}
      {/*  return (*/}
      {/*    <div className={classes.divTable}>*/}
      {/*      <div>{item.title}</div>*/}
      {/*      <div>{item.text}</div>*/}
      {/*      <div>*/}
      {/*        <button className={classes.commentBtn}>*/}
      {/*          <HiPencilAlt />*/}
      {/*        </button>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  );*/}
      {/*})}*/}
    </main>
  );
}

export default PatientId;
