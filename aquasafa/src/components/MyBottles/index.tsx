import {
  Button,
  makeStyles,
  Typography,
  TextField,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../costants";

const useStyles = makeStyles({
  root: {
    display: "flex",
    marginTop:"10%"
  },
});

type Customer = {
  fullname: string | undefined;
  turn: number | undefined;
  phone: number | undefined;
  tag: string | undefined;
  address: string | undefined;
  day: string | undefined;
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
  const classes = useStyles();
  const navigate=useNavigate()
  const [values,setValues]=useState<{fullname:string,numberofbottles:number,_id:any}[] |[] >([])
  useEffect(() => {
    const getCustomers=()=>{
        axios.get(`${api}/mybottles`)
        .then(res=>{
            setValues(res.data)
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    getCustomers()
  },[]);

  const handleRetrived=(id:any)=>{
      axios.delete(`${api}/mybottles/${id}`)
      .then(res=>{
        navigate({ pathname:`/`  })
      })
      .catch(err=>{
          console.log(err)
      })
  }
  return (
    <div className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{textAlign:"center",fontWeight:"bold"}}>Name</TableCell>
            <TableCell style={{textAlign:"center",fontWeight:"bold"}}>Number of Bottles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map((i, index) => {
            return (
              <TableRow key={index} data-testid="table-rows">
                <TableCell  style={{textAlign:"center"}}>
                    {i.fullname}
                </TableCell>
                <TableCell  style={{textAlign:"center"}}> {i.numberofbottles} </TableCell>
                <TableCell  style={{textAlign:"center"}}>
                    <Button variant="contained" color="primary" onClick={()=>handleRetrived(i._id)} >Retrived</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default Index;
