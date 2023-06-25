import React from 'react';
import { getPokemon } from '../action';
import { connect } from 'react-redux';
import { withRouter } from '../../witRouter';
import './index.css';
import LoadingScreen from '../../components/loadingScreen';
import CatchModal from '../../components/catchModal';
import { storage } from '../../storage';

class PokemonDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: null,
            catchModal: false,
            owned: false,
        };
    }

    componentDidMount() {
        this.props.getPokemonFunction(this.props.params.id);
        if (storage.checkOwnedPokemon(parseInt(this.props.params.id))) {
            this.setState({ owned: true });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.pokemon !== this.props.pokemon) {
            this.setState({ pokemon: this.props.pokemon });
        }
    }

    render() {
        if (this.state.pokemon === null) {
            return <LoadingScreen />;
        }
        const { pokemon } = this.state;
        return (
            <div className="container-detail">
                <h1>{pokemon.name}</h1>
                <div className="pokemon-detail">
                    <img
                        src={
                            pokemon.sprites.other['official-artwork']
                                .front_default
                        }
                        alt={pokemon.name}
                    />
                    <div className="pokemon-detail-desc">
                        <div className="container-detail-desc">
                            <div className="header-desc">
                                <h3>Info</h3>
                            </div>
                            <div className="container-info">
                                <div className="info-items">
                                    <label htmlFor="Height">Height</label>
                                    <p>{pokemon.height}</p>
                                </div>
                                <div className="info-items">
                                    <label htmlFor="Weight">Weight</label>
                                    <p>{pokemon.weight}</p>
                                </div>
                                <div className="info-items">
                                    <label htmlFor="Abilities">Abilities</label>
                                    {pokemon.abilities.map((ability, index) => (
                                        <p key={index}>
                                            {ability.ability.name}
                                        </p>
                                    ))}
                                </div>
                                <div className="info-items">
                                    <label htmlFor="Types">Types</label>
                                    {pokemon.types.map((type, index) => (
                                        <p key={index}>{type.type.name}</p>
                                    ))}
                                </div>
                                <div className="info-items">
                                    <label htmlFor="Stats">Stats</label>
                                    {pokemon.stats.map((stat, index) => (
                                        <p key={index}>
                                            {stat.stat.name}: {stat.base_stat}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="moves-card">
                    <h3>Moves:</h3>
                    <ul>
                        {pokemon.moves.map((move, index) => (
                            <li key={index}>{move.move.name}</li>
                        ))}
                    </ul>
                </div>
                {this.state.owned ? (
                    <button className="btn owned" disabled>
                        Owned
                    </button>
                ) : (
                    <button
                        className="btn"
                        onClick={() => this.setState({ catchModal: true })}
                    >
                        Catch Pokemon
                    </button>
                )}

                <CatchModal
                    pokemon={this.state.pokemon}
                    show={this.state.catchModal}
                    handleCatch={() => this.setState({ owned: true })}
                    handleClose={() => this.setState({ catchModal: false })}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        pokemon: state.pokemon.pokemon,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPokemonFunction: (id) => dispatch(getPokemon(id)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PokemonDetail),
);
