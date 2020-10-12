import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  Paper,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LineRechartComponent from "./LineRechart";
import clsx from "clsx";
import PieRechartComponent from "./PieRechart";
import Topbar from "./Topbar";
import { config } from "../config";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      token: undefined,
      pieData: undefined,
      lineData: undefined,
    };
  }

  componentDidMount() {
    let login = JSON.parse(localStorage.getItem("login"));
    this.setState(
      {
        token: login.jwt,
      },
      () => {
        this.getChartData();
      }
    );
  }

  getChartData() {
    var obj = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.token}`,
      },
      Credentials: "include",
    };

    fetch(config.TINYURL + "metricsPie", obj)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          pieData: data,
        });
      });

    fetch(config.TINYURL + "metricsLine", obj)
      .then((response) => response.json())
      .then((data) => {
        data.map((ele) => {
          return {
            date: ele.date.substring(0, 10),
            success: ele.success,
            fail: ele.fail,
          };
        });
        this.setState({
          lineData: data,
        });
      });
  }

  render() {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
      <div style={{ backgroundColor: "rgb(59,62,67)" }}>
        <CssBaseline />
        <Topbar currentPath={this.props.location.pathname} />
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={12}>
                <Paper className={fixedHeightPaper}>
                  <LineRechartComponent data={this.state.lineData} />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                  {/* <Deposits /> */}
                  <PieRechartComponent data={this.state.pieData} />
                </Paper>
              </Grid>
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    );
  }
}

const drawerWidth = 240;

const useStyles = (theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: {},
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    //padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    backgroundColor: "rgb(66,66,66)",
    //marginLeft: "5%",
    paddingTop: "5%",
    paddingLeft: "15%",
    paddingBottom: "5%",
  },
  fixedHeight: {
    height: "100%",
  },
});

export default withRouter(withStyles(useStyles)(Dashboard));
