import {
    GET_POKEMON_LIST,
    SET_POKEMON_LIST,
    GET_POKEMON,
    SET_POKEMON,
} from './actionTypes';

export function getPokemonList(limit, offset) {
    return {
        type: GET_POKEMON_LIST,
        payload: {
            limit,
            offset,
        },
    };
}

export function setPokemonList(data) {
    return {
        type: SET_POKEMON_LIST,
        payload: data,
    };
}

export function getPokemon(id) {
    return {
        type: GET_POKEMON,
        payload: {
            id,
        },
    };
}

export function setPokemon(data) {
    return {
        type: SET_POKEMON,
        payload: data,
    };
}
