import React from "react";
import Kanban from "./kanban/Kanban";
import ErrorPage from "./ErrorPage";

//router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  HashRouter,
} from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 50,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginTop: -10,
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <HashRouter>
      <div>
        <div className={classes.root}>
          <AppBar position="static" style={{ height: "120%" }}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Kanban Task Manager
              </Typography>
              <Button color="inherit">
                <a
                  href="https://www.taskiton.wmdd.ca/#/signup"
                  target="_blank"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "bold",
                    marginTop: "-10",
                  }}
                >
                  Signup
                </a>
              </Button>
            </Toolbar>
          </AppBar>
        </div>
        <Chip
          label="Signup to add your name in the list"
          style={{
            position: "absolute",
            marginLeft: "12px",
            fontWeight: "bold",
            textAlign: "center",
            margin: "auto",
            width: "100%",
          }}
          color="secondary"
        />
      </div>
      {/* <Kanban /> */}
      <Route exact path="/kanban" component={Kanban} />
      <Route exact path="/" component={Kanban} />
    </HashRouter>
  );
}

//npm install react-beautiful-dnd
//npm i styled-components
