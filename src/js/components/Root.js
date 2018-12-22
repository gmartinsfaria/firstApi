//navegação react reacttraining.com/react-router/web/guides/quick-start

//navegação com master detail


import React from "react";
import Home from "./Home";
import About from "./About";
import Callback from "./Callback";
import User from "./User";
import App from "./App";
import MasterDetail from "./MasterDetail";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {withRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import store from "../store/index";


const Root = () => (

        <Router >
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">

                    <ul className="navbar-nav">

                        <li className="nav-item active">
                            <Link className="nav-link navbar-brand" to="/" >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about/">Artigos</Link>
                        </li>

                    </ul>


                    <ul className="navbar-nav ml-auto">
                        <User/>
                    </ul>


                </nav>

                <Route path="/about" component={Home} />
                <Route path="/" exact component={About} />

                <Route path="/masterDetail/:id" component={MasterDetail} />
                <Route path="/callback" component={Callback}/>
            </div>
        </Router>

);

export default Root;