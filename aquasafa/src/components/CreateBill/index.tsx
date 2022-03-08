import { Button, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import OrdersTable from "./Table/index";
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
  const [orders, setOrders] = useState<Order[]>({} as Order[]);
  const [bill, setBill] = useState<Order[] | [] >([]);
  const [formvalues, setFormValues] = useState({ from: "", to: "", name: "" });
  const getOrders = async () => {
    axios
      .get(`http://localhost:4000/orders/${formvalues.name}`)
      .then((res) => {
        let temp: Order[] = [];
        setOrders(res.data);
        res.data.map((i: Order) => {
          if (i.date >= formvalues.from && i.date <= formvalues.to) {
            temp.push(i);
          }
        });
        setBill(temp);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(bill, orders);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({ ...formvalues, [name]: value });
  };
  const handleSubmit = () => {
    let total = 0;
    orders.map((i) => {
      if (i.date >= formvalues.from && i.date <= formvalues.to) {
        total += i.total;
      }
    });
    console.log(total);
  };
  return (
    <div>
      <div
        style={{
          marginTop: "10%",
          marginBottom: "10%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <TextField
          variant="outlined"
          label="From"
          placeholder="DD/MM/YY"
          name="from"
          value={formvalues.from}
          onChange={handleChange}
          style={{ marginLeft: "3%" }}
        />
        <TextField
          variant="outlined"
          label="To"
          placeholder="DD/MM/YY"
          name="to"
          value={formvalues.to}
          onChange={handleChange}
          style={{ marginLeft: "3%" }}
        />
        <TextField
          variant="outlined"
          label="Full name"
          placeholder=""
          name="name"
          value={formvalues.name}
          onChange={handleChange}
          style={{ marginLeft: "3%" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={getOrders}
          style={{ marginLeft: "3%" }}
        >
          Submit
        </Button>
      </div>
      {orders.length >= 0 ? <OrdersTable orders={bill} name={formvalues.name} from={formvalues.from} to={formvalues.to} />: null }
      
    </div>
  );
};
export default Index;
