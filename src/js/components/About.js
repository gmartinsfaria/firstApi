import React from "react";
import List from "./List";
import Form from "./Form";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


var divStyle = {
    height: 500
};

var titleStyle = {
    marginTop: 80
};

var buttonStyle = {
    marginTop: 50
};

const About = () => {


    return(
        <div className="" >


            <div className="jumbotron  text-center bg-secondary text-white align-middle" style={divStyle}>

                <div className="align-middle" style={titleStyle}>
                    <h1>UA News</h1>
                    <p>Criado por e para os alunos da UA</p>


                    <Link className="nav-link" to="/about/">
                        <button type="button" className="btn btn-light" style={buttonStyle}>Ver artigos</button>
                    </Link>

                </div>


            </div>


        </div>
    );
};

export default About;