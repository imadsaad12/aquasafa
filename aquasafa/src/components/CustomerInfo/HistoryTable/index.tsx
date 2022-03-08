import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import axios from "axios";

type Order = {
  _id: any;
  customername: string;
  costOfBigSize: number;
  numberOfBigSize: number;
  costOfMeduimSize: number;
  numberOfMeduimSize: number;
  costOfMyBottles: number;
  numberOfMyBottles: number;
  total: number;
  date: string;
  paid: boolean;
};
type Props = {
  
  name: string;
};
const Index = ({  name }: Props) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [listOfOders, setlistOfOders] = useState<Order[]>([] as Order[]);

  const getOrders = (page:number) => {
    axios
      .get(`http://localhost:4000/orders/${name}?page=${page}&size=4`)
      .then((res) => {
        setlistOfOders(res.data.orders);
        setTotalPages(res.data.totalPages);
        setPage(page);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getOrders(page);
  }, [name]);

  return (
    <div>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Big size</TableCell>
            <TableCell>meduim size</TableCell>
            <TableCell>my bottle</TableCell>
            <TableCell>date</TableCell>
            <TableCell>total</TableCell>
            <TableCell>paid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listOfOders.map((i) => {
            return (
              <TableRow>
                <TableCell>
                  {i.numberOfBigSize} x {i.costOfBigSize}
                </TableCell>
                <TableCell>
                  {i.numberOfMeduimSize} x {i.costOfMeduimSize}
                </TableCell>
                <TableCell>
                  {i.numberOfMyBottles} x {i.costOfMyBottles}
                </TableCell>
                <TableCell>{i.date}</TableCell>
                <TableCell>{i.total}</TableCell>
                <TableCell>{i.paid ? <CheckIcon /> : <ClearIcon />}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
        <Pagination
        style={{marginLeft:"40%",marginTop:"2%"}}
          count={totalPages}
          page={page}
          onChange={(_, page) => {
            getOrders(page);
          }}
        />
    </div>
  );
};
export default Index;
