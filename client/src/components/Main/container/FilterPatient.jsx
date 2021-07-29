import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import dayjs from "dayjs";
import { BsSquareFill } from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";
import { loadStatus } from "../../../redux/features/statuses";
import { loadPatients } from "../../../redux/features/patients";
import Preloader from "../../Preloader/preloader";

const useStyles = makeStyles((theme) => ({
  main: {
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
}));

function FilterPatient(props) {

  const classes = useStyles()
  const dispatch = useDispatch();

  const patients = useSelector((state) => state.patients.items);
  const loading = useSelector((state) => state.patients.loading);

  const status = useSelector((state) => state.statuses.items);

  useEffect(() => {
    dispatch(loadStatus());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadPatients());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <main className={classes.main}>
      <NavLink to="/filterPatient">Показать фильтр</NavLink>

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
            {patients.map((item, index) => {
              console.log(patients);
              const element = status.find(
                (stat) => stat._id === item.lastComment?.status
              );
              return (
                <TableRow key={item._id}>
                  <TableCell component="th" scope="row">
                    <img
                      className={classes.img}
                      src={`${item.pathToImage}`}
                      alt="logo"
                    />
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
                    {patients[index].comments.length > 0 ? (
                      <div bgColor={element.color}>
                        <BsSquareFill color={element?.color} />
                        {element?.title}
                      </div>
                    ) : (
                      "нет заметок"
                    )}
                  </TableCell>
                  <TableCell align="right">{item.comments.length}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}

export default FilterPatient;
