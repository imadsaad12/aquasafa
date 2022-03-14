import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../costants";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  textfield: {
    marginBottom: 20,
  },
  form: {
    flexDirection: "column",
    marginLeft: "5%",
    marginTop: "8%",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  btn: {
    marginLeft: "40%",
    width: "20%",
  },
});

type Customer = {
  fullname: string | undefined;
  turn:number | undefined;
  phone: number | undefined;
  tag: string | undefined;
  address: string | undefined;
};

const Index = () => {
  const classes = useStyles();
  const [err, seterr] = useState(false);
  const navigate = useNavigate();
  const [values, setvalues] = useState<Customer>({
    fullname: undefined,
    phone: undefined,
    tag: undefined,
    address: undefined,
    turn:undefined
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setvalues({ ...values, [name]: value });
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post(`${api}/customers`, values)
      .then((res) => {
        navigate({ pathname: "/" });
        seterr(false);
      })
      .catch((err) => {
        seterr(true);
      });
  };
  return (
    <div className={classes.root}>
      <form className={classes.form}>
        <Typography
          variant="h4"
          color="primary"
          className={classes.title}
        >
          Customer Info
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          className={classes.textfield}
          color="primary"
          label="Full Name"
          name="fullname"
          onChange={handleChange}
          error={err}
        />
        <TextField
          fullWidth
          variant="outlined"
          className={classes.textfield}
          color="primary"
          label="Address"
          name="address"
          onChange={handleChange}
          error={err}
        />
        <TextField
          fullWidth
          variant="outlined"
          className={classes.textfield}
          color="primary"
          label="phone"
          name="phone"
          inputMode="decimal"
          type="number"
          onChange={handleChange}
          error={err}
        />
        <TextField
          fullWidth
          variant="outlined"
          className={classes.textfield}
          color="primary"
          label="Tag"
          name="tag"
          onChange={handleChange}
          error={err}
        />
        <TextField
          fullWidth
          variant="outlined"
          className={classes.textfield}
          color="primary"
          label="Turn"
          name="turn"
          type="number"
          onChange={handleChange}
          error={err}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Add
        </Button>
      </form>
    </div>
  );
};
export default Index;
