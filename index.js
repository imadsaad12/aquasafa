const express = require("express");
const app = express();
const cors = require("cors");
const Customers = require("./models/Customer");
const Order = require("./models/Orders");
const mongoose = require("mongoose");
const Payments = require("./models/Payments");
const MyBottles = require("./models/MyBottles");
const Admins = require("./models/Admins");
const jwt =require('jsonwebtoken')
const bcrypt =require('bcrypt')

const Port=process.env.PORT || 4000
// middlewares
app.use(cors());
app.use(express.json());

//connect to DB
mongoose
  .connect("mongodb+srv://mydb:93928@cluster0.g0he0.mongodb.net/Aquasafa?retryWrites=true&w=majority")
  .then(() => app.listen(Port, console.log("Listining on port 4000")));
// mongoose
//   .connect("mongodb://localhost:27017/mydbname")
//   .then(() => app.listen(4000, console.log("Listining on port 4000")));

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
    if(req.body.numberOfMyBottles >=1){
      const mybottle = await new MyBottles({fullname:req.body.customername,numberofbottles:req.body.numberOfMyBottles});
      await mybottle.save();
    }
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

// mybottles route
app.get("/mybottles",async(req,res)=>{
  try {
    const mybottles=await MyBottles.find()
    res.json(mybottles)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})
app.delete("/mybottles/:id",async(req,res)=>{
  const { id } = req.params;
  try {
    const mybottles=await MyBottles.findOneAndDelete({_id:id})
    res.status(200).send("deleted successfully")
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})
app.post("/", async (req, res) => {
  
  const { username, password } = req.body;

  const user = await Admins.findOne({ username });
  console.log(user);
  if (!user) {
    return res.status(404).send(`No user exists with username ${username}`);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const token = jwt.sign({ userId: user._id }, "XYZABC3366", {
      expiresIn: "7d",
    });
    res.status(200).json(token);
  } else {
    res.status(401).send("password do not matches");
  }
});

app.post("/signup", async (req, res) => {
  const {password,username} = req.body;
  //1) check if user already exist
  const user = await Admins.findOne({ username });
  if (user) {
    return res.status(422).send(`User already exists with username ${username}`);
  }
  //2)if not hash their password
  const hash = await bcrypt.hash(password, 10);
  //3))create user
  const newuser = await new Admins({password: hash,username:username}).save();

  //4)create token for the new user
  const token = jwt.sign({ userId: newuser._id }, "XYZABC3366", {
    expiresIn: "7d",
  });
  res.status(201).json(token);
  //5)send back token
});

if(process.env.NODE_ENV==="production"){
  app.use(express.static("aquasafa/build"))
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'aquasafa','build','index.html'))
  })
}