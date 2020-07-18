import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home"
import SignUp from "../components/SignUp";
import Users from "../components/Users";

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/users" exact component={Users} />
        </Switch>
    </Router>
);
