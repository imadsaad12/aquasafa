import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
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
  orders: Order[];
  name: string;
  from: string;
  to: string;
};

const useStyles = makeStyles({
  root: {
    marginTop: "10%",
  },
});
const Index = ({ orders, name, from, to }: Props) => {
  const classes = useStyles();
  const [total, setTotal] = useState({ paid: 0, nonpaid: 0, total: 0 });
  const printDocument = () => {
    const input: any = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData: any = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        format: [1000, 600],
      });
      pdf.addImage(imgData, "JPEG", 50, 0, 900, 400);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  };
  useEffect(() => {
    calculateTotals();
  });
  const calculateTotals = () => {
    let paid = 0;
    let nonpaid = 0;

    orders.map((i) => {
      switch (i.paid) {
        case true:
          paid += i.total;
          break;
        case false:
          nonpaid += i.total;
          break;
        default:
          break;
      }
    });
    setTotal({ total:paid+nonpaid,nonpaid:nonpaid,paid:paid });
  };
  console.log(total);
  return (
    <div>
      <div id="divToPrint">
     
        <div style={{ display: "flex", flexDirection: "row" ,width:800,height:100,justifyContent:"space-between",marginTop:"3%"}}>
            <div style={{ display: "flex", flexDirection: "column",justifyContent:"space-between",height:60}}>
          <Typography variant="body1" color="textSecondary">
            Customer name : {name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Company name : Aqua Safa
          </Typography>
            </div>
            <div style={{ display: "flex", flexDirection: "column",justifyContent:"space-between",height:60}}>
          <Typography variant="body1" color="textSecondary">
            From : {from}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            To : {to}
          </Typography>
          </div>
           
            <div style={{ display: "flex", flexDirection: "column",justifyContent:"space-between",height:60}}>
          <Typography variant="body1" color="textSecondary">
            Address : Hay-made
          </Typography>
          <Typography variant="body1" color="textSecondary">
         Telephone : +961 03 893 511
          </Typography>
          
          </div>
        </div>
           
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
            {orders.map((i: Order) => {
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
                  <TableCell>
                    {i.paid ? <CheckIcon /> : <ClearIcon />}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div style={{ display: "flex", flexDirection: "row",justifyContent:"space-between",width:500}}>
          <Typography variant="body1" color="textSecondary">
            Total Paid : {total.paid}
          </Typography>
          <Typography variant="body1" color="textSecondary">
          Total non-Paid : {total.nonpaid}
          </Typography>
          <Typography variant="body1" color="textSecondary">
          Total : {total.total}
          </Typography>
          </div>
      </div>
      <Button onClick={printDocument} variant="contained" color="primary">
        Download PDF
      </Button>
    </div>
  );
};
export default Index;
