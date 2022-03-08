import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  makeStyles,
  Button,
  Select,
  MenuList,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  searchinputdate: {
    marginTop: "8%",
    marginLeft: "30%",
  },
  searchinput: {
    marginTop: "8%",
    marginLeft: "40%",
  },
  
});
type Props = {
  handleSearch: (input: string) => void;
  handleDateSearch: (date: {from:string,to:string,turn:number}) => void;
};
const Index = ({ handleSearch,handleDateSearch }: Props) => {
  const classes = useStyles();
  const [searchbydate, setsearchbydate] = useState(false);
  const [date,setDate]=useState({from:"",to:"",turn:0})
  const handleChange=(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
    const name=e.target.name
    const value=e.target.value
    setDate({...date,[name]:value})
   
  }
  return (
    <div className={classes.root}>
    
      {searchbydate ? (
        <div className={classes.searchinputdate}>
          <TextField
            variant="standard"
            color="primary"
            placeholder="From"
            name="from"
            onChange={handleChange}
            onKeyPress={(e)=>{
                if( e.key==="Enter" )
                    handleDateSearch(date) 
            }}
          />
          <TextField
            variant="standard"
            color="primary"
            name="to"
            placeholder="To"
            onKeyPress={(e)=>{
                if( e.key==="Enter" ){
                    handleDateSearch(date) 
                }
            }}
            onChange={handleChange}
          />
          <TextField
            variant="standard"
            color="primary"
            name="turn"
            placeholder="turn"
            onKeyPress={(e)=>{
                if( e.key==="Enter" ){
                    handleDateSearch(date) 
                }
            }}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary"  onClick={()=>setsearchbydate(false)} >Other</Button>
        </div>
      ) : (
        <div className={classes.searchinput}>
        <TextField
          inputProps={{ "data-testid": "search-field" }}
          variant="standard"
          color="primary"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
        />
      <Button variant="contained"  color="primary" onClick={()=>setsearchbydate(true)} >Search by Date</Button>
          </div>
      )}
    </div>
  );
};
export default Index;
