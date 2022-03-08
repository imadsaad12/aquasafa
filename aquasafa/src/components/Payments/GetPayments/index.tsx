import React, { useState, useEffect } from "react";
import {
  Button,
  makeStyles,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Typography,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginLeft: "15%",
    marginBottom: "5%",
  },
});

type Payment = {
  description: string;
  cost: string;
  date: string;
};
const Index = () => {
  const classes = useStyles();
  const [values, setValues] = useState({ from: "", to: "" });
  const [total, setTotal] = useState(0);
  const [tableDate, setTableData] = useState<Payment[]>([] as Payment[]);
  
  const [show, setShow] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
    console.log(values);
  };
  const handleSubmit = () => {
    let requiredPayments:Payment[]=[]
  let total:number=0;

    axios
      .get(
        `http://localhost:4000/payments?from=${values.from}&&to=${values.to}`
      )
      .then((res) => {
        setShow(true);
        let requiredPayments:Payment[]=[];
        res.data.map((i : Payment) =>{
          if(i.date >=values.from && i.date<=values.to){
            requiredPayments.push(i)
            total+=parseInt(i.cost)
          }
         })
         if(requiredPayments.length >0){
             setTableData(requiredPayments)
             setTotal(total)
         }else{
            setTableData([])
         }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form className={classes.form}>
        <TextField
          variant="outlined"
          label="From"
          color="primary"
          name="from"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          label="To"
          color="primary"
          name="to"
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Get
        </Button>
      </form>
      {show ? (
          <>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableDate.map((i) => {
              return (
                <TableRow>
                  <TableCell>{i.description}</TableCell>
                  <TableCell>{i.cost}</TableCell>
                  <TableCell>{i.date}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Typography variant="h3" color="primary" style={{textAlign:"center",marginTop:"30px",marginBottom:"30px"}}>Total : {total}</Typography>
        </>
      ) : null}
    </div>
  );
};
export default Index;
