import './index.css';
import React from 'react';
import { getPokemonList } from './action';
import { connect } from 'react-redux';
import { withRouter } from '../witRouter';
import { Pagination } from 'react-bootstrap';
import PokemonList from '../components/pokemonList';
import LoadingScreen from '../components/loadingScreen';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: null,
            offset: 0,
            currentPage: 1,
            maxPage: 1,
        };
    }

    componentDidMount() {
        this.props.getPokemonListFunction(10, this.state.offset);
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.pokemonList !== this.props.pokemonList &&
            this.props.pokemonList.results
        ) {
            this.setState({
                pokemon: this.props.pokemonList.results,
                maxPage:
                    this.props.pokemonList.count > 0
                        ? Math.ceil(this.props.pokemonList.count / 10)
                        : 1,
            });
        }
        if (prevState.currentPage !== this.state.currentPage) {
            this.setState({
                pokemon: null,
            });
            this.props.getPokemonListFunction(10, this.state.offset);
        }
    }

    categoryChange = (e) => {
        this.setState({ category: e.target.value });
        this.props.getpokemonsFunction(e.target.value);
    };

    filterOpenChange = () => {
        this.setState({ openNow: !this.state.openNow });
    };

    navigateToDetail = (id) => {
        this.props.navigate('/pokemon/' + id);
    };

    renderPaginationNumbers = () => {
        const { maxPage, currentPage } = this.state;
        let paginationNumbers = [];

        // Calculate the range of pagination numbers to display
        let startNumber = Math.max(currentPage - 1, 1);
        let endNumber = Math.min(startNumber + 2, maxPage);

        for (let i = startNumber; i <= endNumber; i++) {
            paginationNumbers.push(i);
        }

        return paginationNumbers.map((number) => {
            return (
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() =>
                        this.setState({
                            currentPage: number,
                            offset: (number - 1) * 10,
                        })
                    }
                >
                    {number}
                </Pagination.Item>
            );
        });
    };

    handlePokemonClick = (id) => {
        this.props.navigate('/pokemon/' + id);
    };

    render() {
        if (this.state.pokemon === null) {
            return <LoadingScreen />;
        }
        return (
            <div className="container-home">
                <div className="pokemon-container">
                    <PokemonList
                        pokemonList={this.state.pokemon}
                        handlePokemonClick={this.handlePokemonClick}
                    />
                </div>
                <Pagination>
                    <Pagination.First
                        onClick={() =>
                            this.setState({ currentPage: 1, offset: 0 })
                        }
                    />
                    <Pagination.Prev
                        onClick={() =>
                            this.setState({
                                currentPage:
                                    this.state.currentPage <= 1
                                        ? 1
                                        : this.state.currentPage - 1,
                                offset:
                                    this.state.currentPage <= 1
                                        ? 0
                                        : (this.state.currentPage - 2) * 10,
                            })
                        }
                    />
                    {this.renderPaginationNumbers()}
                    <Pagination.Next
                        onClick={() =>
                            this.setState({
                                currentPage:
                                    this.state.currentPage >= this.state.maxPage
                                        ? this.state.maxPage
                                        : this.state.currentPage + 1,
                                offset:
                                    this.state.currentPage >= this.state.maxPage
                                        ? (this.state.maxPage - 1) * 10
                                        : this.state.currentPage * 10,
                            })
                        }
                    />
                    <Pagination.Last
                        onClick={() =>
                            this.setState({
                                currentPage: this.state.maxPage,
                                offset: (this.state.maxPage - 1) * 10,
                            })
                        }
                    />
                </Pagination>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        pokemonList: state.pokemon.pokemonList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPokemonListFunction: (limit, offset) =>
            dispatch(getPokemonList(limit, offset)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
