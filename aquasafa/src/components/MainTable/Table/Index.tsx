import React from "react";
import {
  TextField,
  Typography,
  makeStyles,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    link:{
        textDecoration:"none",
    }
});

type Customer = {
  fullname: string | undefined;
  phone: number | undefined;
  turn: number | undefined;
  tag: string | undefined;
  address: string | undefined;
  _id: any;
};
type Props = {
  customers: Customer[];
};
const Index = ({ customers }: Props) => {
  const classes = useStyles();
  return (
    <div style={{ marginTop: "50px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>turn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((i,index) => {
            return (
              <TableRow key={index} data-testid="table-rows">
                <TableCell  >
                    <Link to={`/customers/${i._id}`} className={classes.link}>
                     {i.fullname}
                    </Link>
                </TableCell>
                <TableCell> {i.tag} </TableCell>
                <TableCell> {i.turn} </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default Index;
