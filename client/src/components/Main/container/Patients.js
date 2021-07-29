import React, { useEffect } from "react";
import {
  Avatar,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { loadPatients } from "../../../redux/features/patients";
import Preloader from "../../Preloader/preloader";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";
import { BsSquareFill } from "react-icons/all";
import { loadStatus } from "../../../redux/features/statuses";

const useStyles = makeStyles((theme) => ({
  main: {
    width: 800,
    margin: "auto",
  },

  img: {
    width: 70,
    height: 50,
    borderRadius: 100,
    // border: 3, solid, green,
  },
}));

function Patients() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.patients.loading);
  const status = useSelector((state) => state.statuses.items);
  const patients = useSelector((state) => {
    const { patients } = state;

    if(patients.filter === '') {
      return patients.items;
    }

    return patients.items.filter(patient => {
      return patient.name.toLowerCase().indexOf(patients.filter.toLowerCase()) !== -1
    })
  });



  useEffect(() => {
    dispatch(loadStatus());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadPatients());
  }, [dispatch]);

  const classes = useStyles();

  if (loading) {
    return <Preloader />;
  }

  return (
    <main className={classes.main}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell align="right">ФИО</TableCell>
              <TableCell align="right">Последнее изменение</TableCell>
              <TableCell align="right">Статус</TableCell>
              <TableCell align="right">Количество записей</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((item,index) => {
              console.log(patients)
              const element = status.find(
                (stat) => stat._id === item.lastComment?.status
              );
              return (
                <TableRow key={item._id}>
                  <TableCell component="th" scope="row">
                   <Avatar>
                     <img
                       className={classes.img}
                       src={`${item.pathToImage}`}
                       alt="logo"
                     />
                   </Avatar>
                  </TableCell>
                  <TableCell align="right">
                    <NavLink to={`/patient/${item._id}`}>{item.name}</NavLink>
                  </TableCell>
                  <TableCell align="right">
                    {dayjs(patients[index].lastComment?.updatedAt).format(
                      "DD.MM.YYYY HH:mm"
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {patients[index].comments?.length > 0 ? (<div>
                      <BsSquareFill color ={element?.color} />
                      {element?.title}
                    </div>) : 'нет заметок'}

                  </TableCell>
                  <TableCell align="right">{item.comments?.length}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}

export default Patients;
