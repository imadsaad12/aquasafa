import { useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  Toolbar,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Typography,
  AppBar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import HomeIcon from "@material-ui/icons/Home";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import TableViewIcon from '@material-ui/icons/TableChart';
import DescriptionIcon from '@material-ui/icons/Description';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import BatteryFullIcon from '@material-ui/icons/BatteryFull';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Cookies from "universal-cookie"
type Props = {
  children: React.ReactNode;
};
const useStyles = makeStyles({
  drawer: {
    width: 240,
    backgroundColor: "lightgray",
    height: "100%",
  },
  list: {
    width: "100%",
    marginTop: "50%",
  },
  appBar: {
    width: `calc(100% - ${240}px)`,
    background:"#4960ce",
  },
  listItem:{
    color:"#939395",
    "&:hover":{
      background:"#4960ce",
      color:"white"
    }
  }
});

const Index = ({ children }: Props) => {
  const classes = useStyles();
  //const Location = useLocation();
  const cookie = new Cookies()
  const navigate = useNavigate();

  const list = [
    {
      text: "Home",
      icon: <HomeIcon style={{ fontSize: 30, color: "#939395" }} />,
      path: "/home",
    },
    {
      text: "Add customer",
      icon: <PersonAddIcon style={{ fontSize: 30, color: "#939395" }} />,
      path: "/customers",
    },
    {
      text: "Main Table",
      icon: <TableViewIcon style={{ fontSize: 30, color: "#939395" }} />,
      path: "/maintable",
    },
    {
      text: "Create Bill",
      icon: <DescriptionIcon style={{ fontSize: 30, color: "#939395" }} />,
      path: "/bills",
    },
    {
      text: "Paymnets",
      icon: <MonetizationOnIcon style={{ fontSize: 30, color: "#939395" }} />,
      path: "/payments",
    },
    {
      text: "My Bottles",
      icon: <BatteryFullIcon style={{ fontSize: 30, color: "#939395" }} />,
      path: "/mybottles",
    },
  ];
  return (
    <div>
      <AppBar className={classes.appBar} elevation={4}>
        <Toolbar>
          <Typography variant="h3" color="primary" style={{marginLeft:"40%",fontFamily:" Redressed",color:"white"}}>
            Aqua Safa
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        classes={{ paper: classes.drawer }}
        anchor="left"
        variant="permanent"
      >
        <List className={classes.list}>
          {cookie.get("token") && list.map((i, index) => {
            return (
              <ListItem
                button
                onClick={() => navigate({ pathname: i.path })}
                key={index}
                className={classes.listItem}
              >
                <ListItemIcon children={i.icon} />
                <ListItemText>
                  <Typography variant="body1" >
                    {i.text}
                  </Typography>
                </ListItemText>
              </ListItem>
            );
          })}
          {cookie.get("token") && <ListItem
                button
                onClick={() => {navigate({ pathname: '/' });cookie.remove("token")}}
                key={"10pxa"}
                className={classes.listItem}
              >
                <ListItemIcon children={<ExitToAppIcon style={{ fontSize: 30, color: "#939395" }} />} />
                <ListItemText>
                  <Typography variant="body1" >
                    Log out
                  </Typography>
                </ListItemText>
              </ListItem> }
          
        </List>
      </Drawer>
      <div style={{ marginLeft: 240 }}>{children}</div>
    </div>
  );
};
export default Index;
