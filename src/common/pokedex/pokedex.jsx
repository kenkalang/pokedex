import React from 'react';
import { storage } from '../storage';
import './style.css';
import { withRouter } from '../witRouter';

class Pokedex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokedex: null,
        };
    }

    componentDidMount() {
        const storedPokedex = storage.getPokedex();
        this.setState({
            pokedex: storedPokedex,
        });

    }

    handleRemovePokemon = (pokemon) => {
        storage.removePokedex(pokemon);
        const updatedPokedex = storage.getPokedex();

        if (this.state.pokedex !== updatedPokedex) {
            const storedPokedex = storage.getPokedex();

            this.setState({
                pokedex: storedPokedex,
            });

        }
    };

    render() {
        if (this.state.pokedex === null) {
            return null;
        }
        return (
            <div className="container-detail">
                <h1>Pokédex</h1>
                <div className="pokedex-list">
                    {this.state.pokedex.map((pokemon) => {
                        return (
                            <div
                                className="pokedex-card"
                                key={pokemon.id}
                                onClick={() =>
                                    this.props.navigate(
                                        `/pokemon/${pokemon.id}`,
                                    )
                                }
                            >
                                <div className="pokemon-img">
                                    <img
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                                    />
                                </div>
                                <div className="pokemon-info pokedex-info">
                                    <h2>{pokemon.name}</h2>
                                    <div className="types">
                                        {pokemon.types.map((type) => {
                                            return (
                                                <div
                                                    className={`type ${type.type.name}`}
                                                    key={type.type.name}
                                                >
                                                    {type.type.name}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <button
                                        className="btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            this.handleRemovePokemon(pokemon);
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default withRouter(Pokedex);
