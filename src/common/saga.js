import { all } from 'redux-saga/effects';
import pokemonSaga from './home/saga';

export default function* rootSaga() {
    yield all([...pokemonSaga]);
}
