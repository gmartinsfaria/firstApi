import {call, put, takeLatest} from "redux-saga/effects";
import {FETCH_TOKEN, TOKEN_FETCH_SUCCEEDED, TOKEN_FETCH_ERROR} from "../constants/action-types";
import {TOKEN_ENDPOINT, CLIENT_ID, REDIRECT_URI, SECRET} from "../constants/services";

function fetchAll(code) {

    const data = new URLSearchParams();
    let url_params = [
        ['client_id', CLIENT_ID],
        ['redirect_uri', REDIRECT_URI],
        ['grant_type', 'authorization_code'],
        ['client_secret', SECRET],
        ['code', code.payload]
    ];

    for (const pair of url_params) {
        data.append(pair[0], pair[1]);
    }

    return fetch(TOKEN_ENDPOINT, {method: 'post', body: data}).then(response => response.json(),);
}

function* fetchToken(code) {

    try {
        const token = yield call(fetchAll, code);
        yield put({type: TOKEN_FETCH_SUCCEEDED, payload: token});
    } catch (e) {
        yield put({type: TOKEN_FETCH_ERROR, message: e.message});
    }
}

function* tokenSaga() {

    yield takeLatest(FETCH_TOKEN, fetchToken);

}

export default tokenSaga;