import { Button, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../../../costants";
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

const Index = ({ name }: { name: string }) => {
  const [orders, setOrders] = useState<Order[]>({} as Order[]);
  const [date, setDate] = useState({ from: "", to: "" });
  useEffect(() => {
    const getOrders = () => {
      axios
        .get(`${api}/orders/${name}`)
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getOrders();
  }, [name]);
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
      const name=e.target.name;
      const value=e.target.value
      setDate({...date,[name]:value})
  };
const handleSubmit=()=>{
    let total=0;
    orders.map(i=>{
        if(i.date>=date.from && i.date<=date.to){
            total+=i.total;
        }
    })
    console.log(total)
}
  return (
    <div style={{ marginTop: "10%", marginBottom: "10%" }}>
      <TextField
        variant="outlined"
        label="From"
        placeholder="DD/MM/YY"
        name="from"
        value={date.from}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        label="To"
        placeholder="DD/MM/YY"
        name="to"
        value={date.to}
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
    </div>
  );
};
export default Index;
