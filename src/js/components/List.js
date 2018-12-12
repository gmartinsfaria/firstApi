import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteArticle, fetchArticles } from "../actions/index";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import User from "./User";
import Root from "./Root";
import MasterDetail from "./MasterDetail";
import {ENDPOINT} from "../constants/services";

let contador = 0;

const mapDispatchToProps = dispatch => {
    // define as actions a executar quando existirem alterações locais que requerem atualização de state
    return {
        deleteArticle: article => dispatch(deleteArticle(article)),
        fetchArticles: () => dispatch(fetchArticles()),
    };
};

const mapStateToProps = state => {
    // define as props do componente consoante o state do redux
    return { articles: state.articles };
};


class ConnectedList extends Component{

    constructor(){
        super();
        // definir o contexto da função "clickAction" para que possa aceder à propriedade "this"
        // https://medium.freecodecamp.org/this-is-why-we-need-to-bind-event-handlers-in-class-components-in-react-f7ea1a6f93eb
        this.clickAction = this.clickAction.bind(this);
    }

    clickAction(article) {
        // executar a função de apagar o artigo
        this.props.deleteArticle(article);
        console.log(article.id);

        fetch(`${ENDPOINT}/${article.id}`, {

            method: 'DELETE'


        }) .then(res => res.json())


    }


    clickMaster(article) {
        this.props.deleteArticle(article);
    }



    componentDidMount()//--------------------------------------------------------------------------------------------
    {
        // chamada inicial para ir buscar os artigos
        if (this.props.articles.articles == "" && contador == 0){
            this.props.fetchArticles({type: 'FETCH_ARTICLES'});
            contador = 1;
        }
    }



    render()
    {
        const articles = this.props.articles.articles;

        return (



            <ul className="list-group list-group-flush">
                {articles.map((el, index) => (
                    // para cada item dentro da array articles, criar um título e um botão delete
                    <li className="list-group-item" >
                        {el.titulo} &nbsp;<p></p>
                        <button className="btn btn-danger btn-lg" key={index} onClick={() => this.clickAction(el) /*console.log(this.props.articles)*/}>Apagar</button>
                        &nbsp;&nbsp;
                            <Link key={el.id} to={{ pathname: `/masterDetail/${el.id}` }} >
                                <button className="btn btn-dark btn-lg" key={index}>Saber mais</button>
                            </Link>
                    </li>
                ))}
            </ul>

        );
    }
}

// executar a função connect do Redux para:
// 1) mapear o State do Redux à propriedades locais do componente (mapStateToProps)
// 2) mapear as ações a serem invocadas às ações locais nas props do componente (mapDispatchToProps)
const List = connect(mapStateToProps, mapDispatchToProps, Root)(ConnectedList);

export default List;
