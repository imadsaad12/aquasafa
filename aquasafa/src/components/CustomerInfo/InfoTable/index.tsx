import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
type Customer = {
  fullname: string | undefined;
  phone: number | undefined;
  tag: string | undefined;
  address: string | undefined;
  turn: number | undefined;
  _id: any;
};
 type Props={
     info:Customer
 }

const useStyles=makeStyles({
  root:{
    marginTop:"10%"
  }
})
const Index = ({info}:Props) => {
  const classes=useStyles()
  return (
   
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Turn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
            <TableCell>{info.fullname}</TableCell>
            <TableCell>{info.address}</TableCell>
            <TableCell>{info.phone}</TableCell>
            <TableCell>{info.tag}</TableCell>
            <TableCell>{info.turn}</TableCell>
          </TableRow>
        </TableBody>
        </Table>
        
  );
};
export default Index;
