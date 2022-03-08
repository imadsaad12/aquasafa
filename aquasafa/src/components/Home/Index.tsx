import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "row",
    marginTop: "10%",
    marginLeft: "5%",
  },
  list: {

  },
  subcontainers: {
    display: "flex",
    flexDirection: "column",
  },
});
type Customer = {
  fullname: string | undefined;
  phone: number | undefined;
  tag: string | undefined;
  address: string | undefined;
  _id: any;
};
type FormValues = {
  customername: string | undefined;
  numberOfBigSize: number;
  costOfBigSize: number;
  numberOfMeduimSize: number;
  costOfMeduimSize: number;
  numberOfMyBottles: number;
  costOfMyBottles: number;
  total: number;
};
const INITIAL_STATE = {
  customername: "",
  numberOfBigSize: 0,
  costOfBigSize: 0,
  numberOfMeduimSize: 0,
  costOfMeduimSize: 0,
  numberOfMyBottles: 0,
  costOfMyBottles: 0,
  total: 0,
};
const Index = () => {
  const classes = useStyles();
  const [values, setvalues] = useState<Customer[] | []>([]);
  const [filtered, setFiltered] = useState<Customer[] | []>([]);
  const [show, setshow] = useState({ loading: false, list: false });
  const [formvalues, setformvalues] = useState<FormValues>(INITIAL_STATE);
  let total:number=0;
  const calculateTotal = () => {
    const cost =
      formvalues.numberOfBigSize * formvalues.costOfBigSize +
      formvalues.numberOfMeduimSize * formvalues.costOfMeduimSize +
      formvalues.numberOfMyBottles * formvalues.costOfMyBottles;
      total=cost;
    return cost.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  const handleSubmit = (paid:boolean) => {
    setshow({ ...show, loading: true });
    const payload={...formvalues,total:total,paid:paid ? true : false}
    axios
      .post("http://localhost:4000/orders", payload)
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      setshow({ ...show, loading: false });
      setformvalues({
        ...formvalues,
        customername: "",
        numberOfBigSize: 0,
        numberOfMeduimSize: 0,
        numberOfMyBottles: 0,
        total: 0,
      });
    }, 1000);
  };
  const handleSearch = (input: string) => {
    const filter = values.filter((i) => i.fullname?.startsWith(input));
    if (input === "" || filter.length ===0) {
      setFiltered(values);
    } else {
      setFiltered(filter);
    }
  };
  useEffect(() => {
    const getCustomers = () => {
      axios
        .get("http://localhost:4000/customers")
        .then((res) => {
          setvalues(res.data);
          setFiltered(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCustomers();
  }, []);
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setformvalues({ ...formvalues, [name]: value });
  };

  return (
    <div style={{ width: "90%", marginLeft: "5%" }}>
      {show.loading ? (
        <CircularProgress
          color="primary"
          style={{ marginTop: "15%", marginLeft: "35%" }}
          size={100}
        />
      ) : (
        <>
          <form className={classes.form}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                variant="outlined"
                color="primary"
                label="Customer name"
                onFocus={() => setshow({ ...show, list: true })}
                value={formvalues.customername}
                onChange={(e) => {
                  handleChange(e);
                  handleSearch(e.target.value);
                }}
                name="customername"
                inputProps={{ "data-testid": "f1" }}
              />
              {show.list ? (
                <List style={{ backgroundColor: "#f0f2f5", width: "100%",height:"100px",overflowY:"scroll" }} data-testid={`List`} >
                  {filtered.map((i, index) => {
                    return (
                      <ListItem
                        button
                        className={classes.list}
                        key={index}
                        onClick={() => {
                          setformvalues({
                            ...formvalues,
                            customername: i.fullname,
                          });
                          setshow({ ...show, list: false });
                        }}
                        data-testid={`L`}
                      >
                        <ListItemText  primary={i.fullname}  />
                      </ListItem>
                    );
                  })}
                </List>
              ) : null}
            </div>
            <div className={classes.subcontainers}>
              <TextField
                variant="outlined"
                color="primary"
                style={{ marginLeft: "15%", marginBottom: "15%" }}
                label="Cost of big size"
                type={"number"}
                value={formvalues.costOfBigSize}
                name="costOfBigSize"
                onChange={(e) => handleChange(e)}
                inputProps={{ "data-testid": "f2" }}
              />
              <TextField
                variant="outlined"
                color="primary"
                style={{ marginLeft: "15%" }}
                label="Number of bottles"
                type={"number"}
                name="numberOfBigSize"
                value={formvalues.numberOfBigSize}
                onChange={(e) => handleChange(e)}
                inputProps={{ "data-testid": "f3" }}
              />
            </div>
            <div className={classes.subcontainers}>
              <TextField
                variant="outlined"
                color="primary"
                style={{ marginLeft: "15%", marginBottom: "15%" }}
                label="Cost of Meduim size"
                type={"number"}
                name="costOfMeduimSize"
                value={formvalues.costOfMeduimSize}
                onChange={(e) => handleChange(e)}
                inputProps={{ "data-testid": "f4" }}
              />
              <TextField
                variant="outlined"
                color="primary"
                style={{ marginLeft: "15%" }}
                label="Number of bottles"
                type={"number"}
                name="numberOfMeduimSize"
                value={formvalues.numberOfMeduimSize}
                onChange={(e) => handleChange(e)}
                inputProps={{ "data-testid": "f5" }}
              />
            </div>
            <div className={classes.subcontainers}>
              <TextField
                variant="outlined"
                color="primary"
                style={{ marginLeft: "15%", marginBottom: "15%" }}
                label="Cost of my bottles"
                type={"number"}
                name="costOfMyBottles"
                value={formvalues.costOfMyBottles}
                onChange={(e) => handleChange(e)}
                inputProps={{ "data-testid": "f6" }}
              />
              <TextField
                variant="outlined"
                color="primary"
                style={{ marginLeft: "15%" }}
                label="Number of my bottles"
                type={"number"}
                name="numberOfMyBottles"
                value={formvalues.numberOfMyBottles}
                onChange={(e) => handleChange(e)}
                inputProps={{ "data-testid": "f7" }}
              />
            </div>
          </form>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "20%",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4" color="textSecondary" data-testid="total">
              Total amount : {calculateTotal()} L.L
            </Typography>
            <div style={{display:"flex",flexDirection:"row",width:"60%",justifyContent:"flex-end"}}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "20%", height: 50 }}
              onClick={()=>handleSubmit(true)}
              data-textid="btn-p"
            >
              paid order
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "20%", height: 50 ,marginLeft:"2%"}}
              onClick={()=>handleSubmit(false)}
              data-testid="btn-unp"
            >
              non-paid order
            </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Index;
