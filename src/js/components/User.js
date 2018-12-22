import React, { Component } from "react";
import { connect } from "react-redux";
import {AUTH_ENDPOINT} from "../constants/services";

const mapStateToProps = state => {
    return{
        token: state.auth,
        user: state.user,
    };
};

class ConnectedUser extends Component{

    constructor(){
        super();
    }

    render() {

        if (this.props.user.length > 0){
            return(

                console.log(this.props.user[0].data.name)
                //<li  className="nav-item nav-link active">
                //    {this.props.user[0].data.name}
                //</li>
            );
        } else {
            return(

                <a  className="nav-link" href={ AUTH_ENDPOINT }>Login</a>
            //console.log(this.state.token)

            )
        }

    }

}

const User = connect(mapStateToProps)(ConnectedUser);

export default User;