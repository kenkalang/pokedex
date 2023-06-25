import { wretchInstance } from '../wretchInstance';

export const getPokemonListApi = (payload) => {
    return wretchInstance()
        .url(
            import.meta.env.VITE_API_URL +
                '/pokemon/' +
                '?limit=' +
                payload.limit +
                '&offset=' +
                payload.offset,
        )
        .headers({
            'Content-Type': 'application/json',
        })
        .get()
        .json((response) => {
            return response;
        });
};

export const getPokemonApi = (id) => {
    return wretchInstance()
        .url(import.meta.env.VITE_API_URL + '/pokemon/' + id)
        .get()
        .json((response) => {
            return response;
        });
};
