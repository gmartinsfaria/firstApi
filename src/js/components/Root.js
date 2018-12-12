//navegação react reacttraining.com/react-router/web/guides/quick-start

//navegação com master detail


import React from "react";
import Home from "./Home";
import About from "./About";
import User from "./User";
import MasterDetail from "./MasterDetail";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {withRouter} from "react-router-dom";
import { Provider } from 'react-redux';


const Root = () => (

        <Router >
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">

                    <ul className="navbar-nav">

                        <li className="nav-item active">
                            <Link class="nav-link navbar-brand" to="/" >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link class="nav-link" to="/about/">Artigos</Link>
                        </li>
                        <li className="nav-item">
                            <Link class="nav-link" to="/user/">Sign in</Link>
                        </li>
                    </ul>

                </nav>

                <Route path="/about"component={Home} />
                <Route path="/" exact component={About} />
                <Route path="/user/" component={User} />
                <Route path="/masterDetail/:id" component={MasterDetail} />
            </div>
        </Router>

);

export default Root;