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
import { api } from "../../../costants";

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

const Index = () => {
  const classes = useStyles();
  const [values, setValues] = useState({ from: "", to: "" });
  const [tableDate, setTableData] = useState<Order[]>([] as Order[]);
  const [total, setTotal] = useState({ paid: 0, nonpaid: 0, total: 0 });
  
  const [show, setShow] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
    console.log(values);
  };
  const calculateTotals = (array:Order[]) => {
    let paid = 0;
    let nonpaid = 0;
    array.map((i) => {
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
  const handleSubmit = () => {
    let requiredPayments:Order[]=[]
  let total:number=0;
    axios
      .get(
        `${api}/orders`
      )
      .then((res) => {
        setShow(true);
        let requiredPayments:Order[]=[];
        res.data.map((i : Order) =>{
          if(i.date >=values.from && i.date<=values.to){
            requiredPayments.push(i)
          }
         })
         if(requiredPayments.length >0){
             setTableData(requiredPayments)
             calculateTotals(requiredPayments)
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
          <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"60%",marginLeft:"15%"}}>
        <Typography variant="h5" color="textSecondary" style={{textAlign:"center",marginTop:"30px",marginBottom:"30px"}}>Total Paid : {total.paid}</Typography>
        <Typography variant="h5" color="textSecondary"  style={{textAlign:"center",marginTop:"30px",marginBottom:"30px"}}>Total non-paid : {total.nonpaid}</Typography>
        <Typography variant="h5" color="textSecondary"  style={{textAlign:"center",marginTop:"30px",marginBottom:"30px"}}>Total : {total.total}</Typography>
        </div>
      ) : null}
    </div>
  );
};
export default Index;
