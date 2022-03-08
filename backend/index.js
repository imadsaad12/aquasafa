const express = require("express");
const app = express();
const cors = require("cors");
const Customers = require("./models/Customer");
const Order = require("./models/Orders");
const mongoose = require("mongoose");
const Payments = require("./models/Payments");
// middlewares
app.use(cors());
app.use(express.json());

//connect to DB
mongoose
  .connect("mongodb://localhost:27017/mydbname")
  .then(() => app.listen(4000, console.log("Listining on port 4000")));

//customers routes
app.get("/customers", async (req, res) => {
  try {
    const customers = await Customers.find({});
    res.json(customers);
  } catch (error) {
    res.status(500).send("failed to get customers");
  }
});
app.post("/customers", async (req, res) => {
  try {
    const customer = await new Customers(req.body);
    await customer.save();
    res.send("Customer added succesfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to save customer");
  }
});
app.get("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Customers.findById({ _id: id });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(401).send("not found");
  }
});

//orders routes
app.post("/orders", async (req, res) => {
  try {
    const today = Date.now();
    const date = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
     
    }).format(today);
    console.log(req.body, date);
    const order = await new Order({ ...req.body, date: date });
    await order.save();
    res.send("order added succesfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to save customer");
  }
});

app.get("/orders",async(req,res)=>{
  try {
    const orders=await Order.find();
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.status(500).send("Failed to fetch data");
  }
})

app.get("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { page, size } = req.query;
    const allOrders= await Order.find({ customername: id });
    if(page===undefined && size===undefined){
      res.json(allOrders)
    }
    else{
      const pageNum = Number(page);
      const pageSize = Number(size);
      const totalDocs = await Order.find({ customername: id }).countDocuments();
      const totalPages = Math.ceil(totalDocs / pageSize);
      let orders = [];
      if (pageNum === 1) {
        orders = await Order.find({ customername: id }).limit(pageSize);
      } else {
        const skips = pageSize * (pageNum - 1);
        orders = await Order.find({ customername: id })
          .skip(skips)
          .limit(pageSize);
      }
      res.status(200).json({ orders, totalPages,allOrders});
    }
  
  } catch (error) {
    console.log(error);
    res.status(401).send("Cannot fetch orders");
  }
});

//Payments routes
app.post("/payments",async(req,res)=>{
  try {
    const today = Date.now();
    const date = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(today);
    const payment= await new Payments({...req.body,date:date})
    await payment.save()
    res.send("Payments added succesfully")
  } catch (error) {
    console.log(err)
    res.send(error)
  }
})

app.get("/payments",async(req,res)=>{
  try {
    const payments=await Payments.find();
    res.json(payments)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})