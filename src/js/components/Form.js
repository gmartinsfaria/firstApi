/*
    STATEFUL Component
    O "state" deste componente é gerido localmente e não pelo Redux
    Nem todos os componentes necessitam de utilizar o redux para gerir o seu "state"
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addArticle } from "../actions/index";
import {ENDPOINT} from "../constants/services";
import axios from 'axios';

const mapDispatchToProps = dispatch => {
    return {
        // define a action para adicionar um novo artigo
        addArticle: article => dispatch(addArticle(article))
    };
};

class ConnectedForm extends Component {
    constructor() {
        super();
        // definir um default state
        this.state = {
            title: "",
            data: "",
            descricao: "",
            user_id: "",
            categoria_id: "",
            artigo_imagem: ""
        };

        // definir o contexto das funções para que possam aceder à propriedade "this"
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.handleChange5 = this.handleChange5.bind(this);
        this.handleChange6 = this.handleChange6.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    // sempre que existir uma alteração no campo de texto, atualiza a state local do componente
    handleChange1(event) {
        this.setState({
            title: event.target.value,



        });
        console.log(event.target.value);
    }

    handleChange2(event) {
        this.setState({
            data: event.target.value
            /*descricao: event.target.value,
            user_id: event.target.value,
            categoria_id: event.target.value,*/


        });
        console.log(event.target.value);
    }

    handleChange3(event) {
        this.setState({

            descricao: event.target.value,
            /*user_id: event.target.value,
            categoria_id: event.target.value,*/


        });
        console.log(event.target.value);
    }

    handleChange4(event) {
        this.setState({

            user_id: event.target.value,
            /*categoria_id: event.target.value,*/


        });
        console.log(event.target.value);
    }

    handleChange5(event) {
        this.setState({
            categoria_id: event.target.value
        });
        console.log(event.target.value);
        console.log(this.state);

    }

    handleChange6(event) {
        this.setState({
            artigo_imagem: event.target.value
        });
        console.log(event.target.value);
        console.log(this.state);
    }

    // sempre que o formulário for submetido, executar a action de adicionar o article
    handleSubmit(event) {
        event.preventDefault();

        this.props.addArticle({

            "titulo": this.state.title,
            "data": this.state.data,
            "descricao": this.state.descricao,
            "user_id": this.state.user_id,
            "categoria_id": this.state.categoria_id,
            "artigo_imagem": this.state.artigo_imagem
        });


        axios.post(ENDPOINT,{

            "titulo": this.state.title,
            "data": this.state.data,
            "descricao": this.state.descricao,
            "user_id": this.state.user_id,
            "categoria_id": this.state.categoria_id,
            "artigo_imagem": this.state.artigo_imagem
        }).then(res => console.log(res));




        console.log(this.state);

        // evita que a página seja recarregada como consequência da submissão do formulário

        // obter o title presente no state local do componente

        /*
        const { title } = this.state;


        // criar um id único que identifique o novo article
        const id = uuidv1();
        const key = id;


        // executar a action para adicionar o article
        this.props.addArticle({ title, id, key});

        // tornar a colocar o state local com o title vazio, para que o campo de input fique vazio
        this.setState({ title: "" });

*/
    }

    render() {
        // obter o title presente no state local do componente
        const { title } = this.state.title;
        const { data } = this.state.data;
        const { descricao } = this.state.descricao;
        const { user_id } = this.state.user_id;
        const { categoria_id } = this.state.categoria_id;
        const { artigo_imagem } = this.state.artigo_imagem;

        console.log(this.state);

        return (
            // associar o evento "onSubmit" à função handleSubmit
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title} // associar o title ao value presente no campo de input
                        onChange={this.handleChange1} // associar o evento "onChange" à função "handleChange"
                    />
                    <label htmlFor="data">Data</label>
                    <input
                        type="text"
                        className="form-control"
                        id="data"
                        value={data} // associar o title ao value presente no campo de input
                        onChange={this.handleChange2} // associar o evento "onChange" à função "handleChange"
                    />
                    <label htmlFor="data">Descrição</label>
                    <textarea
                        rows={3}
                        type="text"
                        className="form-control"
                        id="descricao"
                        value={descricao} // associar o title ao value presente no campo de input
                        onChange={this.handleChange3} // associar o evento "onChange" à função "handleChange"
                    />
                    <label htmlFor="data">Autor</label>
                    <select
                        type="text"
                        className="form-control"
                        id="user_id"
                        value={user_id} // associar o title ao value presente no campo de input
                        onChange={this.handleChange4} // associar o evento "onChange" à função "handleChange"
                    >
                        <option></option>
                        <option value={1}>Carolina</option>
                        <option value={2}>Gabriel</option>
                        <option value={3}>Rúben</option>
                        <option value={4}>Graciana</option>
                    </select>
                    <label htmlFor="data">Categoria</label>
                    <select
                        type="text"
                        className="form-control"
                        id="categoria_id"
                        value={categoria_id} // associar o title ao value presente no campo de input
                        onChange={this.handleChange5} // associar o evento "onChange" à função "handleChange"
                    >
                        <option></option>
                        <option value={1}>Criminal</option>
                        <option value={1}>Científico</option>
                        <option value={1}>Desportivo</option>
                        <option value={1}>Artístico</option>
                    </select>
                    <label htmlFor="data">Imagem</label>
                    <input
                        type="file"
                        id="categoria_id"
                        value={artigo_imagem} // associar o title ao value presente no campo de input
                        onChange={this.handleChange6} // associar o evento "onChange" à função "handleChange"
                    />
                </div>
                <button type="submit" className="btn btn-success btn-lg" >
                    SAVE
                </button>
            </form>
        );
    }
}

// executar a função connect do Redux
// notar que neste caso não é passada como parâmetro a função "mapStateToProps"
// porque este componente não necessita de aceder ao state do Redux
const Form = connect(null, mapDispatchToProps)(ConnectedForm);

export default Form;
