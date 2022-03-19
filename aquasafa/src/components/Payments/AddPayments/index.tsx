import React, { useState, useEffect } from "react";
import { Button, makeStyles, TextField,CircularProgress } from "@material-ui/core";
import axios from "axios";
import { api } from "../../../costants";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginLeft: "15%",
  },
});

const Index = () => {
  const classes = useStyles();
  const [values,setValues]=useState({description:"",cost:""})
  const [loading,setloading]=useState(false)
    const handleChange=( e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
     const {value,name}=e.target
        setValues({...values,[name]:value})
        console.log(values)
    }
    const handleSubmit=()=>{
      setloading(true)
        axios.post(`${api}/payments`,values)
        .then(()=>{
           setTimeout(() => {
             setloading(false)
           }, 1000);
        })
        .catch(err=>{
            console.log(err)
        })
    }
  return (
    <div>
      {
        loading ? 
        <CircularProgress
          color="primary"
          style={{ marginTop: "1%", marginLeft: "45%" }}
          size={100}
        />
        : 
        <form className={classes.form}>
        <TextField variant="outlined" label="Description" color="primary" name="description" onChange={handleChange} />
        <TextField variant="outlined" label="Cost" color="primary" name="cost"  onChange={handleChange}/>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add
        </Button>
      </form>
      }
     
    </div>
  );
};
export default Index;
