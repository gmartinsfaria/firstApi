import {ADD_ARTICLE, DELETE_ARTICLE, ARTICLES_FETCH_SUCCEEDED, MASTER_ARTICLE} from "../constants/action-types";


const initialState = {
  articles: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ARTICLE:
            //state.articles.push(action.payload);
            //return state;
            //O PUSH ALTERA O ESTADO INICIAL DO STATE, O QUE NÃO PODE ACONTECER. EM VEZ DE PUSH É ENTÃO PREFERÍVEL UTILIZAR O CONCAT

            //return { ...state, articles: state.articles.concat(action.payload) };

            //
            console.log('success_add: ', action.payload);

            return { ...state, articles: [...state.articles, action.payload]};


        case DELETE_ARTICLE:
            console.log('success_delete: ', action.payload);
            return { ...state, articles: [...state.articles.filter((x) => x != action.payload)]};

        /*case MASTER_ARTICLE:
            console.log('success_delete: ', action.payload);
            return { ...state, articles: [...state.articles.filter((x) => x == action.payload)]};*/

        case ARTICLES_FETCH_SUCCEEDED:
            console.log('success_fetch: ', action.payload);
            // adiciona os artigos obtidos através da API
            // funcionamento idêntico ao ADD_ARTICLE, mas com a diferença de se aplicar o Spread ao payload
            // pois o que é retornado da API é uma lista de artigos e não apenas um
            return { ...state, articles: [...state.articles, ...action.payload] };
        default:
            return state;
    }
};

export default rootReducer;