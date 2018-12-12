import React from "react";
import {withRouter} from 'react-router-dom';

import { ENDPOINT, ENDPOINT_USER, ENDPOINT_CATEGORIA } from '../constants/services';

class MasterDetail extends React.Component {

    //podes fazrr isto no construtor(como o professor mostrou) ou assim
    state = {};

    //vamos criar uma função que vai correr sempre após o componente ser "construido" onde vamos fazer o pedido à api com o respetivo id

    componentDidMount() {
        // ver mais sobre o lifecycle do react aqui para perceberes isto melhor: https://reactjs.org/docs/react-component.html
        // agora vamos utilizar a função do javascript que permite fazer pedidos a apis


        //assim parece confuso mas o que está a acontecer aqui é que o javascript não espera que uma função termine para começar outras
        //exemplo real: quando vais a uma pizzaria e pedes uma pizza ficas lá a espera da pizza para começar a comer,
        //  no javascript quando pedes dados a uma api por norma podes ir fazer outras coisas antes de poderes começar a consumir estes dados,
        // dai que nasceu o conceito das Promises //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
        // basicamente vamos fazer um pedido e quando estiver pronto (then) continuamos a execução do nosso código

        //primeiro parametro desta função é o endpoint que pode estar definido nas constants como o prof criou, vou importar em cima
        fetch(`${ENDPOINT}/${this.props.match.params.id}`)//falta aqui acrescentar ao endpoint o ID do artigo que pretendemos ir "buscar" os dados, vou utilizar a syntax do es6 para misturar javascript com strings



        // ver mais sobre es6 e neste caso em especifico : http://es6-features.org/#StringInterpolation

        //fizemos o pedido
            .then(res => res.json()) //função do javascript para converter a resposta num objeto json
            .then((article) => {
                //aqui ja temos acesso à resposta
                const user_id = article.user_id;
                console.log('artigo é: ', article);
                console.log(user_id); // temos que guardar o artigo em algum lado para mostrar no render



                fetch(`${ENDPOINT_USER}/${user_id}`)
                    .then (res=>res.json())
                    .then((user)=>{

                        const categoria_id = article.categoria_id;
                        console.log(categoria_id);

                        fetch(`${ENDPOINT_CATEGORIA}/${categoria_id}`)
                            .then (res => res.json())
                            .then((cat)=> {


                                this.setState({
                                    article, user, cat
                                })

                        })


                    });

                console.log(this.state);
                //isto com a syntax do es6 é a mesma coisa que ter article: article
                //o state não pode ser alterado diretamente
               // const { userId } = this.state.article;
               // fetch(`${ENDPOINT}/${this.state.article.user_id}`)


            }) //esperamos que o pedido terminasse (vou utilizar a syntax de funções de es6)


    }


    render() {
        //se ainda não existir artigo mostra o loading
        if(!this.state.article){
            return <div>Carregando artigo </div>
        }

        console.log(this.state);
        // mais uma funcionalidade altamente do es6 é que podes desconstruir objetos:

        // http://es6-features.org/#ObjectAndArrayMatchingDefaultValues
        const { titulo, descricao, data, artigo_imagem } = this.state.article;
        const{name}= this.state.user;
        const{categoria}= this.state.cat;
        const url = `http://localhost/tdi/usersApi/storage/app/public/${artigo_imagem}`;
        const size = "width:500px;height:600px";
        console.log(url);
        return (


        <div className="row mt-5">
            <div className="col-md-8 offset-md-1">
            <div className="card">
                <div className="card-header">
                    {titulo} &nbsp;&nbsp; &nbsp;&nbsp;  {data}
                </div>
                <img className="card-img-top" src={url} height="150" width="100" alt="Card image cap"></img>
                    <div className="card-body">
                        <p className="card-text">{descricao}</p>

                    </div>
                <div className="card-footer text-muted">
                    Autor: {name}
                </div>
            </div>
        </div>
    </div>


    );
    }
}

export default withRouter(MasterDetail);