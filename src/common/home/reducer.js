import { SET_POKEMON_LIST, SET_POKEMON } from './actionTypes';

const initialState = {
    pokemonList: [],
    pokemon: {},
};

const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POKEMON_LIST:
            return {
                ...state,
                pokemonList: action.payload,
            };
        case SET_POKEMON:
            return {
                ...state,
                pokemon: action.payload,
            };

        default:
            return state;
    }
};

export default pokemonReducer;
