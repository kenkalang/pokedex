const _storage = window.localStorage;

export const storage = {
    getPokedex: () => {
        const storedPokedex = _storage.getItem('pokemon');
        const parsedPokedex = storedPokedex ? JSON.parse(storedPokedex) : [];
        return parsedPokedex;
        
    },
    setPokedex: (pokedex) => {
        const caughtPokemon = JSON.parse(_storage.getItem('pokemon')) || [];
        caughtPokemon.push(pokedex);
        _storage.setItem('pokemon', JSON.stringify(caughtPokemon));
    },
    removePokedex: (pokedex) => {
        const caughtPokemon = JSON.parse(_storage.getItem('pokemon')) || [];
        const newCaughtPokemon = caughtPokemon.filter(
            (item) => item.id !== pokedex.id,
        );
        _storage.setItem('pokemon', JSON.stringify(newCaughtPokemon));
    },

    checkOwnedPokemon: (id) => {
        const caughtPokemon = JSON.parse(_storage.getItem('pokemon')) || [];
        if (caughtPokemon.some((item) => item.id === id)) {
            return true;
        } else {
            return false;
        }
    },
};
