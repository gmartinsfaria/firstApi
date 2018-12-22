import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchToken, fetchUserSuccess} from "../actions/auth"
import store from "../store";
import {USER_ENDPOINT} from "../constants/services";

const mapDispatchroProps = dispatch => {
    return {
        fetchToken: code => dispatch(fetchToken(code)),
        fetchUser: user => dispatch(fetchUserSuccess(user)),
    };
};

const mapStatetoProps = state => {
    return {
        token: state.auth,
        user: state.user,
    };
};

class ConnectedCallback extends Component{
    constructor(match){
        super(match);
        this.checkToken = this.checkToken.bind(this);
    }

    componentDidMount() {
        if (!this.props.token.length > 0){
            let code = this.props.location.search.substr(6);
            this.props.fetchToken(code);
        }

        store.subscribe(this.checkToken);
    }

    checkToken(){
        console.log(store.getState());
        if(store.getState().auth[0].access_token){
            if (store.getState().user.length < 1){
                fetch(USER_ENDPOINT, {
                    headers: new Headers({'Authorization': 'Bearer ' + store.getState().auth[0].access_token})
                }).then(response => response.json(), ).then((responseData) => {
                    console.log(responseData);
                    this.props.fetchUser(responseData);
                })
            }
        }
    }

    render() {
        console.log(this.props.user.length);
        if (this.props.user.length > 0){
            return(
                <div className="offset-md-1">
                    <h1>User logged in</h1>
                    <h2><ion-icon name="contact"></ion-icon>    {this.props.user[0].data.name}</h2>
                    <p className="text-muted"><ion-icon name="mail"></ion-icon>    {this.props.user[0].data.email}</p>
                    <p className="text-muted"><ion-icon name="calendar"></ion-icon>    {this.props.user[0].data.created_at.substr(0, 10)}</p>
                </div>
            );
        } else{
            return(
                <div>
                    <p>Not logged in</p>
                </div>
            )
        }
    }

}

const Callback = connect(mapStatetoProps, mapDispatchroProps)(ConnectedCallback);

export default Callback;