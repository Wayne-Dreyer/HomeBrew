import React, { useState, useEffect } from "react";
import NavBar from "./navbar";
//import "./Mash.css";
//import Axios from "axios";
//import { w3cwebsocket as W3CWebSocket } from "websocket";
//import WebSocketInstance from './Services/WebSocket'
//import { delay, when } from "q";
import IOSslider from "./IOSslider";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Paper, Grid, TextareaAutosize } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

//const client = new W3CWebSocket("ws://10.1.1.16:8000/ws/pid/"); //working

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing.unit,
    alignContent: "center",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  heading: {
    textAlign: "center",
  },
  IOSslider: {
    padding: theme.spacing.unit,
    width: "auto",
  },
  Temp: {
    fontSize: "4rem",
  },
  start: {
    float: "right",
  },
  remTime: {
    textAlign: "center",
  },
}));

export default function Mash() {
  var conn;
  const classes = useStyles();
  const theme = useTheme();

  const [timeM, setTimeM] = useState("60"); //values to be changed to show countdown when backend connected
  const [timeS, setTimeS] = useState("00");
  const [currentTemp, setCurrentTemp] = useState("25C");
  const [goalTemp, setGoalTemp] = useState(67);

  useEffect(() => {
    //this will run once and only once at mount (ComponentDidMount)
    conn = new WebSocket("ws://10.1.1.7:8000/ws/pid/");
    conn.onopen = () => conn.send('{"mode": 1, "setTemp":' + goalTemp + "}");
    conn.onmessage = function (e) {
      messageReceived(e);
    };
    return () => {
      //this will run on component unmount (componentWillUnmount)
    };
  }, []);

  function getTemp() {}

  const onTemperatureChange = (temperature) => {
    if (!conn) {
      conn = new WebSocket("ws://10.1.1.7:8000/ws/pid/");
      conn.onopen = () =>
        conn.send('{"mode": 1, "setTemp":' + temperature + "}");
    } else if (conn.readyState === WebSocket.OPEN) {
      conn.send('{"mode": 1, "setTemp":' + temperature + "}");
    }
  };

  const onTimerChange = (time) => {
    if (!conn) {
      conn = new WebSocket("ws://10.1.1.7:8000/ws/pid/");
      conn.onopen = () => conn.send('{"mode": 1, "setTimer":' + time + "}");
    } else if (conn.readyState === WebSocket.OPEN) {
      conn.send('{"mode": 2, "setTimer":' + time + "}");
    }
  };

  function messageReceived(e) {
    console.log(e.data);
    var obj = JSON.parse(e.data);
    console.log(obj.Temp);
    setCurrentTemp(obj.Temp + "C");
    if (obj.Time % 60 === 0) setTimeS("00");
    else if (obj.Time % 60 < 10) setTimeS("0" + (obj.Time % 60));
    else setTimeS(obj.Time % 60);
    setTimeM(Math.floor(obj.Time / 60));
    console.log(goalTemp);
  }

  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <h1 className={classes.heading}>Mash Settings</h1>
        <Grid container spacing={1}>
          <Grid item container spacing={1} xs={8} style={{ minWidth: "40vh" }}>
            <Grid item xs={12} flexWrap="wrap">
              <Paper className={classes.paper}>
                <IOSslider
                  className={classes.IOSslider}
                  onChange={onTemperatureChange}
                  label="Temperature"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} flexWrap="wrap">
              <Paper className={classes.paper}>
                <IOSslider onChange={onTimerChange} label="Mash Time" />
              </Paper>
            </Grid>
          </Grid>
          <Grid
            item
            container
            spacing={1}
            xs={4}
            style={{ minWidth: "40vh" }}
            alignItems="center"
          >
            <Grid item xs={12} flexWrap="wrap">
              <Paper className={classes.paper}>
                <Typography gutterBottom>Current</Typography>
                <h2 className={classes.Temp}>{currentTemp}</h2>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <br />
        <Grid container spacing={4} justify="space-between">
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.stop}
            >
              STOP
            </Button>
          </Grid>
          <Grid item xs={3}>
            <h2 className={classes.remTime}>
              {timeM}:{timeS}
            </h2>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.start}
            >
              START
            </Button>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

/*class Mash extends Component {
  state = {
    timeM: 60, //values to be changed to show countdown when backend connected
    timeS: '00' ,
    temp: '00'
  };

  

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
            <h1>Mash Settings</h1>
            <IOSslider />
        </main>
        
      </React.Fragment>
    );
  }
  componentWillMount() {
    var conn = new WebSocket("ws://10.1.1.16:8000/ws/pid/")
    conn.onopen = () => conn.send('{"mode": 1, "setTemp": 44}')
    conn.onmessage = function(e){this.messageReceived(e)}.bind(this)
  }
  componentDidMount() {
    this.getTemp();
    setInterval(this.getTemp.bind(this), 2000);  
  }

  getTemp(){
    /*Axios.get('http://10.1.1.16:8000/pid/getCurrentTemp/')
      .then(response => this.setState({temp:response.data})) */
/*}

  messageReceived(e){
    console.log(e.data);
    var obj = JSON.parse(e.data);
    console.log(obj.Temp);
    this.setState({temp:obj.Temp});  
    if(obj.Time%60 === 0 )
      this.setState({timeS:'00'})
      else if(obj.Time%60 < 10)
        this.setState({timeS:'0'+ obj.Time%60})
      else
      this.setState({timeS:obj.Time%60})
    this.setState({timeM:Math.floor(obj.Time/60)})
  }
}

export default Mash; */
