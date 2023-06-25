import { GET_POKEMON_LIST, GET_POKEMON } from './actionTypes';
import { call, takeLatest, put } from '@redux-saga/core/effects';
import { getPokemonListApi, getPokemonApi } from './api';
import { setPokemonList, setPokemon } from './action';

export function* getPokemonList(action) {
    try {
        const response = yield call(getPokemonListApi, action.payload);
        yield put(setPokemonList(response));
    } catch (error) {
        console.log(error);
    }
}

export function* getPokemon(action) {
    try {
        const response = yield call(getPokemonApi, action.payload.id);
        yield put(setPokemon(response));
    } catch (error) {
        console.log(error);
    }
}

const pokemonSaga = [
    takeLatest(GET_POKEMON_LIST, getPokemonList),
    takeLatest(GET_POKEMON, getPokemon),
];

export default pokemonSaga;
