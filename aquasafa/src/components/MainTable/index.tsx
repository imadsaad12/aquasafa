import React, { ChangeEventHandler, useEffect, useState } from "react";
import Header from "./header/index";
import MTable from "./Table/Index";
import axios from "axios";
type Customer = {
  fullname: string | undefined;
  phone: number | undefined;
  turn: number | undefined;
  tag: string | undefined;
  address: string | undefined;
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
const Index = () => {
  const [values, setvalues] = useState<Customer[] | []>([]);
  const [filtered, setFiltered] = useState<Customer[] | []>([]);
  const [orders,setOrders]=useState<Order[]|[]>([])
  useEffect(() => {
    const getCustomers = () => {
      axios
        .get("http://localhost:4000/customers")
        .then((res) => {
          setvalues(res.data);
          setFiltered(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const getOrders = () => {
      axios
        .get("http://localhost:4000/orders")
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCustomers();
    getOrders();
  }, []);

const handleDateSearch=(date:{from:string,to:string,turn:number})=>{
  const orderslist = orders.filter(
    (i) =>i.date>= date.from && i.date <=date.to
  );
  const filter : Customer[]=[]
   orderslist.map(i=>{
     values.map(j=>{
       if(i.customername===j.fullname && !filter.includes(j) && date.turn==j.turn){
         filter.push(j)
       }
     })
   })
    setFiltered(filter);
    console.log(filter)
  
}
  const handleSearch = (searchinput: string) => {
    const input = searchinput;
    const filter = values.filter(
      (i) =>
        i.fullname?.toLocaleLowerCase().startsWith(input) ||
        i.turn?.toString().toLowerCase().startsWith(input) ||
        i.tag?.toLowerCase().startsWith(input)
    );

    if (input === "" || filtered.length === 0) {
      setFiltered(values);
    } else {
      setFiltered(filter);
    }
  };
  return (
    <div>
      <Header handleSearch={handleSearch} handleDateSearch={handleDateSearch} />
      <MTable customers={filtered} />
    </div>
  );
};
export default Index;
