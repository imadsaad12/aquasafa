import React, { useState, useEffect } from "react";
import { Divider, makeStyles, TextField, Typography } from "@material-ui/core";
import AddPayments from "./AddPayments/index";
import GetPayments from "./GetPayments/index";
import OrdersPayments from "./GetOrders/Index"
const useStyles = makeStyles({
  root: {
    marginTop: "10%",
    marginLeft: "3%",
  },
});

const Index = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Typography
          variant="h3"
          color="primary"
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          Add Payments
        </Typography>
        <AddPayments />
      </div>
      <Divider style={{marginTop:"40px"}} />
      <div style={{ marginTop: "50px" }}>
        <Typography
          variant="h3"
          color="primary"
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          Get My Payments
        </Typography>
        <GetPayments/>
      </div>
      <Divider style={{marginTop:"40px"}} />
      <div style={{ marginTop: "50px" }}>
        <Typography
          variant="h3"
          color="primary"
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          Get orders Payments
        </Typography>
        <OrdersPayments />
      </div>
    </div>
  );
};
export default Index;
