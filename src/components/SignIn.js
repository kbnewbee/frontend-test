import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Topbar from "./Topbar";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Alert from "@material-ui/lab/Alert";
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

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      username: undefined,
      password: undefined,
      showAlert: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("login")) {
      this.nextPath("/tinyurl");
    }
  }

  alertHandler = () => {
    this.setState({ showAlert: true });
    setTimeout(() => {
      if (this.state.showAlert !== false) {
        this.setState({ showAlert: false });
      }
    }, 5000);
  };

  nextPath = (path) => {
    this.props.history.push(path);
  };

  handleUpload = (event) => {
    event.preventDefault();
    var obj = {
      method: "POST",
      Crendentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: event.target.username.value,
        password: event.target.password.value,
      }),
    };

    fetch(config.TINYURL + "token", obj)
      .then((response) => {
        //console.log(response)
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("login", JSON.stringify(data));
        this.nextPath("/tinyurl");
      })
      .catch((error) => {
        this.alertHandler();
      });
    // localStorage.setItem('login',JSON.stringify({user_id:'2222',token:"abcd",isAdmin:true}));
    // this.nextPath("/tinyurl");
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <CssBaseline />
        <Topbar currentPath={this.props.location.pathname} />
        {this.state.showAlert && (
          <Alert severity="error" style={{ backgroundColor: "white" }}>
            Invalid Crendentials
          </Alert>
        )}
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleUpload}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href="#/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </div>
    );
  }
}

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

export default withRouter(withStyles(useStyles)(SignIn));
