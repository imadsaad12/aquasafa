import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { api } from "../../costants";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [values, setvalues] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setvalues({ ...values, [name]: value });
    console.log(values);
  };

  const handleSubmit = () => {
    axios
      .post(`${api}/`, values)
      .then((res) => {
          const cookie=new Cookies()
        cookie.set("token", res.data);
        navigate({pathname:"/home"})
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        marginTop: "15%",
        display: "flex",
        flexDirection: "column",
        width: "50%",
        marginLeft: "25%",
      }}
    >
      <TextField
        variant="outlined"
        color="primary"
        label="username"
        style={{ marginBottom: "20px", borderRadius: "10px" }}
        onChange={handleChange}
        name="username"
      />
      <TextField
        variant="outlined"
        color="primary"
        label="password"
        style={{ marginBottom: "20px", borderRadius: "10px" }}
        onChange={handleChange}
        name="password"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Sign in
      </Button>
    </div>
  );
};
export default Index;
