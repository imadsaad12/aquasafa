import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import TableInfo from "./InfoTable/index"
import HistoryTable from "./HistoryTable/index";
import Calc from "./CalcTotalMonthly/index" ;
import { api } from "../../costants";

type Customer = {
  fullname: string ;
  phone: number | undefined;
  tag: string | undefined;
  address: string | undefined;
  turn: number | undefined;
  _id: any;
};
type Order={
  _id:any
customername:string,
costOfBigSize:number,
numberOfBigSize:number,
costOfMeduimSize:number,
numberOfMeduimSize:number,
costOfMyBottles:number,
numberOfMyBottles:number,
total:number,
date:string,
paid:boolean
}

const useStyles=makeStyles({
  root:{
    marginTop:"10%",
  }
})
const Index = () => {
  const classes=useStyles()
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const { id } = useParams();
  useEffect(() => {
    const getCustomer = () => {
      axios
        .get(`${api}/customers/${id}`)
        .then((res) => {
          setCustomer(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCustomer();
  },[]);
  
  return (
    <div className={classes.root} >
      <Typography variant="h4" color="primary" style={{textAlign:"center"}}>Customer Info</Typography>
       <TableInfo info={customer} /> 
      <Typography variant="h4" color="primary" style={{textAlign:"center",marginTop:"5%",marginBottom:"3%"}}>Orders history</Typography>
       <HistoryTable  name={customer.fullname} /> 
       {/* <Calc name={customer.fullname} /> */}
    </div>
  );
};
export default Index;
