import React from 'react';
import LoadingScreen from './loadingScreen';
import { withRouter } from '../witRouter';

class PokemonList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: null,
        };
    }

    componentDidMount() {
        this.setState({
            pokemon: this.props.pokemonList,
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.pokemonList !== this.props.pokemonList) {
            this.setState({
                pokemon: this.props.pokemonList,
            });
        }
    }

    render() {
        return (
            <div className="pokemon">
                {this.state.pokemon &&
                    this.state.pokemon.map((pokemon, index) => {
                        const pokemonId = pokemon.url.split('/')[6];
                        return (
                            <div
                                key={index}
                                className="pokemon-card"
                                onClick={() =>
                                    this.props.handlePokemonClick(pokemonId)
                                }
                            >
                                <div className="pokemon-img">
                                    <img
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                                        alt={pokemon.name}
                                    />
                                </div>
                                <div className="pokemon-info">
                                    <h3>{pokemon.name}</h3>
                                </div>
                            </div>
                        );
                    })}
            </div>
        );
    }
}

export default withRouter(PokemonList);
